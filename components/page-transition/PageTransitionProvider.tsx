"use client";

import {
  startTransition,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { usePathname, useRouter } from "next/navigation";
import gsap from "gsap";
import { DrawSVGPlugin } from "gsap/DrawSVGPlugin";
import { useLenis } from "@/app/providers/lenis-provider";
import { PageTransitionContext } from "@/components/page-transition/context";

gsap.registerPlugin(DrawSVGPlugin);

const START_STROKE_WIDTH = 140;

function getStrokeWidths() {
  const viewportDiagonal = Math.hypot(window.innerWidth, window.innerHeight);

  return {
    mid: viewportDiagonal * 0.18,
    end: viewportDiagonal * 0.4,
  };
}

export default function PageTransitionProvider({
  children,
}: {
  children: ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const lenis = useLenis();
  const overlayRef = useRef<HTMLDivElement | null>(null);
  const pathRef = useRef<SVGPathElement | null>(null);
  const previousPathnameRef = useRef(pathname);
  const pendingHrefRef = useRef<string | null>(null);
  const waitingForRouteChangeRef = useRef(false);
  const routeChangedUnderCoverRef = useRef(false);
  const coverPhaseCompleteRef = useRef(false);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const registerOverlay = useCallback((node: HTMLDivElement | null) => {
    overlayRef.current = node;

    if (node) {
      gsap.set(node, {
        autoAlpha: 0,
      });
    }
  }, []);

  const registerPath = useCallback((node: SVGPathElement | null) => {
    pathRef.current = node;
  }, []);

  const finishTransition = useCallback(() => {
    if (pathRef.current) {
      gsap.set(pathRef.current, {
        drawSVG: "0% 0%",
        strokeWidth: START_STROKE_WIDTH,
        autoAlpha: 0,
      });
    }

    if (overlayRef.current) {
      gsap.set(overlayRef.current, {
        autoAlpha: 0,
      });
    }

    setIsTransitioning(false);
    lenis?.start();
  }, [lenis]);

  const navigate = useCallback(
    (href: string) => {
      if (
        isTransitioning ||
        href === pathname ||
        !overlayRef.current ||
        !pathRef.current
      ) {
        return;
      }

      const { mid, end } = getStrokeWidths();

      pendingHrefRef.current = href;
      waitingForRouteChangeRef.current = true;
      routeChangedUnderCoverRef.current = false;
      coverPhaseCompleteRef.current = false;
      setIsTransitioning(true);
      lenis?.stop();

      gsap.set(overlayRef.current, {
        autoAlpha: 1,
        clearProps: "display",
      });
      gsap.set(pathRef.current, {
        drawSVG: "0% 0%",
        strokeWidth: START_STROKE_WIDTH,
        autoAlpha: 1,
      });

      gsap
        .timeline({
          defaults: {
            ease: "power3.inOut",
          },
        })
        .to(pathRef.current, {
          drawSVG: "0% 100%",
          strokeWidth: mid,
          duration: 0.95,
        })
        .to(pathRef.current, {
          drawSVG: "100% 100%",
          strokeWidth: end,
          duration: 0.75,
          onStart: () => {
            const nextHref = pendingHrefRef.current;

            if (!nextHref) {
              return;
            }

            pendingHrefRef.current = null;
            window.scrollTo({ top: 0, left: 0, behavior: "auto" });
            router.push(nextHref);
          },
          onComplete: () => {
            coverPhaseCompleteRef.current = true;

            if (!routeChangedUnderCoverRef.current || !pathRef.current) {
              return;
            }

            gsap.to(overlayRef.current, {
              autoAlpha: 0,
              duration: 0.9,
              ease: "power3.inOut",
              onComplete: finishTransition,
            });
          },
        });
    },
    [finishTransition, isTransitioning, lenis, pathname, router],
  );

  useEffect(() => {
    if (previousPathnameRef.current === pathname) {
      return;
    }

    previousPathnameRef.current = pathname;

    if (
      !waitingForRouteChangeRef.current ||
      !overlayRef.current ||
      !pathRef.current
    ) {
      pendingHrefRef.current = null;
      waitingForRouteChangeRef.current = false;
      startTransition(() => {
        setIsTransitioning(false);
      });
      lenis?.start();
      return;
    }

    waitingForRouteChangeRef.current = false;
    routeChangedUnderCoverRef.current = true;

    if (!coverPhaseCompleteRef.current) {
      return;
    }

    gsap.set(overlayRef.current, {
      autoAlpha: 1,
    });

    gsap.to(overlayRef.current, {
      autoAlpha: 0,
      duration: 0.9,
      ease: "power3.inOut",
      onComplete: finishTransition,
    });
  }, [finishTransition, lenis, pathname]);

  const contextValue = useMemo(
    () => ({
      isTransitioning,
      navigate,
      registerOverlay,
      registerPath,
    }),
    [isTransitioning, navigate, registerOverlay, registerPath],
  );

  return (
    <PageTransitionContext.Provider value={contextValue}>
      {children}
    </PageTransitionContext.Provider>
  );
}
