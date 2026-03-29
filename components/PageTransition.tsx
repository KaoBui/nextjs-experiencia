"use client";

import {
  createContext,
  startTransition,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { usePathname, useRouter } from "next/navigation";
import gsap from "gsap";
import { useLenis } from "@/app/providers/lenis-provider";

type TransitionLayer = {
  key: string;
  children: ReactNode;
};

type TransitionContextValue = {
  activeLayer: TransitionLayer;
  displayedChildren: ReactNode;
  exitingLayer: TransitionLayer | null;
  isTransitioning: boolean;
  navigate: (href: string) => void;
  registerContainer: (node: HTMLDivElement | null) => void;
  registerEntering: (node: HTMLDivElement | null) => void;
  registerExiting: (node: HTMLDivElement | null) => void;
  syncLayer: (children: ReactNode) => void;
};

const PageTransitionContext = createContext<TransitionContextValue | null>(null);

export function usePageTransition() {
  const context = useContext(PageTransitionContext);

  if (!context) {
    throw new Error("usePageTransition must be used within PageTransition");
  }

  return context;
}

export function PageTransitionProvider({
  children,
}: {
  children: ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const lenis = useLenis();
  const containerRef = useRef<HTMLDivElement | null>(null);
  const enteringRef = useRef<HTMLDivElement | null>(null);
  const exitingRef = useRef<HTMLDivElement | null>(null);
  const previousLayerRef = useRef<TransitionLayer | null>(null);
  const navigationModeRef = useRef<"idle" | "controlled">("idle");
  const [activeLayer, setActiveLayer] = useState<TransitionLayer>({
    key: pathname,
    children: null,
  });
  const [displayedChildren, setDisplayedChildren] = useState<ReactNode>(null);
  const [exitingLayer, setExitingLayer] = useState<TransitionLayer | null>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [transitionStage, setTransitionStage] = useState<
    "idle" | "enter-only" | "overlap"
  >("idle");

  const finishTransition = useCallback(() => {
    setExitingLayer(null);
    setIsTransitioning(false);
    setTransitionStage("idle");
    lenis?.start();
  }, [lenis]);

  const navigate = useCallback(
    (href: string) => {
      if (isTransitioning || href === pathname || !enteringRef.current) {
        return;
      }

      navigationModeRef.current = "controlled";
      setIsTransitioning(true);
      lenis?.stop();

      gsap.killTweensOf(enteringRef.current);
      gsap.to(enteringRef.current, {
        opacity: 0,
        y: 32,
        filter: "blur(14px)",
        duration: 0.5,
        ease: "power3.inOut",
        onComplete: () => {
          window.scrollTo({ top: 0, left: 0, behavior: "auto" });
          router.push(href);
        },
      });
    },
    [isTransitioning, lenis, pathname, router],
  );

  const syncLayer = useCallback(
    (children: ReactNode) => {
      const nextLayer = {
        key: pathname,
        children,
      };

      if (!previousLayerRef.current) {
        previousLayerRef.current = nextLayer;
        startTransition(() => {
          setActiveLayer(nextLayer);
          setDisplayedChildren(children);
        });
        return;
      }

      if (previousLayerRef.current.key === pathname) {
        previousLayerRef.current = nextLayer;
        setDisplayedChildren(children);
        return;
      }

      if (navigationModeRef.current === "controlled") {
        navigationModeRef.current = "idle";
        previousLayerRef.current = nextLayer;
        startTransition(() => {
          setActiveLayer(nextLayer);
          setDisplayedChildren(nextLayer.children);
          setTransitionStage("enter-only");
        });
        return;
      }

      lenis?.stop();
      window.scrollTo({ top: 0, left: 0, behavior: "auto" });
      const previousLayer = previousLayerRef.current;
      previousLayerRef.current = nextLayer;
      startTransition(() => {
        setIsTransitioning(true);
        setExitingLayer(previousLayer);
        setActiveLayer(nextLayer);
        setDisplayedChildren(nextLayer.children);
        setTransitionStage("overlap");
      });
    },
    [lenis, pathname],
  );

  const registerContainer = useCallback((node: HTMLDivElement | null) => {
    containerRef.current = node;
  }, []);

  const registerEntering = useCallback((node: HTMLDivElement | null) => {
    enteringRef.current = node;
  }, []);

  const registerExiting = useCallback((node: HTMLDivElement | null) => {
    exitingRef.current = node;
  }, []);

  useEffect(() => {
    if (!enteringRef.current || !containerRef.current) {
      return;
    }

    if (transitionStage === "enter-only") {
      const enteringNode = enteringRef.current;
      const ctx = gsap.context(() => {
        gsap.set(enteringNode, {
          opacity: 0,
          y: 40,
          filter: "blur(14px)",
        });

        gsap.to(enteringNode, {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 0.65,
          ease: "power3.inOut",
          onComplete: finishTransition,
        });
      }, containerRef);

      return () => {
        ctx.revert();
      };
    }

    if (transitionStage !== "overlap" || !exitingLayer) {
      return;
    }

    const enteringNode = enteringRef.current;
    const exitingNode = exitingRef.current;
    const ctx = gsap.context(() => {
      gsap.set(enteringNode, {
        opacity: 0,
        y: 40,
        filter: "blur(14px)",
      });

      const timeline = gsap.timeline({
        defaults: {
          duration: 0.65,
          ease: "power3.inOut",
        },
        onComplete: finishTransition,
      });

      if (exitingNode) {
        timeline.to(
          exitingNode,
          {
            opacity: 0,
            y: 32,
            filter: "blur(14px)",
          },
          0,
        );
      }

      timeline.to(
        enteringNode,
        {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
        },
        0.08,
      );
    }, containerRef);

    return () => {
      ctx.revert();
    };
  }, [exitingLayer, finishTransition, transitionStage]);

  const contextValue = useMemo(
    () => ({
      activeLayer,
      displayedChildren,
      exitingLayer,
      isTransitioning,
      navigate,
      registerContainer,
      registerEntering,
      registerExiting,
      syncLayer,
    }),
    [
      activeLayer,
      displayedChildren,
      exitingLayer,
      isTransitioning,
      navigate,
      registerContainer,
      registerEntering,
      registerExiting,
      syncLayer,
    ],
  );

  return (
    <PageTransitionContext.Provider value={contextValue}>
      {children}
    </PageTransitionContext.Provider>
  );
}

export default function PageTransitionContent({
  children,
}: {
  children: ReactNode;
}) {
  const {
    activeLayer,
    displayedChildren,
    exitingLayer,
    isTransitioning,
    registerContainer,
    registerEntering,
    registerExiting,
    syncLayer,
  } = usePageTransition();

  useEffect(() => {
    syncLayer(children);
  }, [children, syncLayer]);

  return (
    <div
      ref={registerContainer}
      className="relative"
      data-transitioning={isTransitioning}
    >
      {exitingLayer ? (
        <div
          ref={registerExiting}
          className="pointer-events-none absolute inset-0 z-10"
          aria-hidden="true"
        >
          {exitingLayer.children}
        </div>
      ) : null}

      <div
        key={activeLayer.key}
        ref={registerEntering}
        className={isTransitioning ? "pointer-events-none" : undefined}
      >
        {displayedChildren ?? children}
      </div>
    </div>
  );
}
