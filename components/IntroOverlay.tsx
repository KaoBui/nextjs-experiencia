"use client";

import { useRef } from "react";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { DrawSVGPlugin } from "gsap/DrawSVGPlugin";
import PageCover from "@/components/svg/PageCover";

gsap.registerPlugin(useGSAP, DrawSVGPlugin);

const START_STROKE_WIDTH = 140;

function getStrokeWidths() {
  const viewportDiagonal = Math.hypot(window.innerWidth, window.innerHeight);

  return {
    mid: viewportDiagonal * 0.18,
    end: viewportDiagonal * 0.04,
  };
}

export default function IntroOverlay() {
  const overlayRef = useRef<HTMLDivElement | null>(null);
  const logoRef = useRef<HTMLDivElement | null>(null);
  const pathRef = useRef<SVGPathElement | null>(null);

  useGSAP(() => {
    if (!overlayRef.current || !logoRef.current || !pathRef.current) {
      return;
    }

    const { mid, end } = getStrokeWidths();

    gsap.set(pathRef.current, {
      drawSVG: "0% 0%",
      strokeWidth: START_STROKE_WIDTH,
      autoAlpha: 1,
    });

    gsap.set(logoRef.current, {
      autoAlpha: 1,
      scale: 1,
      filter: "blur(0px)",
    });

    const timeline = gsap.timeline({
      defaults: {
        ease: "power3.inOut",
      },
      onComplete: () => {
        gsap.set(pathRef.current, {
          drawSVG: "0% 0%",
          strokeWidth: START_STROKE_WIDTH,
          autoAlpha: 0,
        });
        gsap.set(overlayRef.current, {
          autoAlpha: 0,
          display: "none",
        });
      },
    });

    timeline
      .to(
        logoRef.current,
        {
          autoAlpha: 0,
          scale: 0.94,
          filter: "blur(10px)",
          duration: 0.45,
        },
        0.3,
      )
      .to(
        pathRef.current,
        {
          drawSVG: "0% 100%",
          strokeWidth: mid,
          duration: 0.95,
        },
        "<0.2",
      )
      .to(pathRef.current, {
        drawSVG: "100% 100%",
        strokeWidth: end,
        duration: 0.75,
      })
      .to(
        overlayRef.current,
        {
          autoAlpha: 0,
          duration: 0.3,
        },
        ">-0.25",
      );
  }, []);

  return (
    <div
      ref={overlayRef}
      className="bg-background fixed inset-0 z-[300]"
      aria-hidden="true"
    >
      <div
        ref={logoRef}
        className="absolute top-1/2 left-1/2 flex -translate-x-1/2 -translate-y-1/2 justify-center"
      >
        <Image
          src="/logo.png"
          alt="Experiencia Consulting Logo"
          width={220}
          height={220}
          priority
          className="h-auto w-[10rem] md:w-[12rem]"
        />
      </div>

      <PageCover
        pathRef={pathRef}
        className="absolute top-1/2 left-1/2 h-[120vh] w-[120vw] -translate-x-1/2 -translate-y-1/2"
      />
    </div>
  );
}
