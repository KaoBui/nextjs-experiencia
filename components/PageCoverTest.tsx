"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import PageCover from "@/components/svg/PageCover";

export default function PageCoverTest() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const svgRef = useRef<SVGSVGElement | null>(null);
  const pathRef = useRef<SVGPathElement | null>(null);

  useGSAP(
    () => {
      if (!pathRef.current) {
        return;
      }

      const viewportDiagonal = Math.hypot(
        window.innerWidth,
        window.innerHeight,
      );
      const midStrokeWidth = viewportDiagonal * 0.18;
      const endStrokeWidth = viewportDiagonal * 0.12;

      console.log("PageCover stroke widths", {
        viewportWidth: window.innerWidth,
        viewportHeight: window.innerHeight,
        viewportDiagonal,
        midStrokeWidth,
        endStrokeWidth,
      });

      gsap.set(pathRef.current, {
        drawSVG: "0% 0%",
        strokeWidth: 40,
      });

      const timeline = gsap.timeline();

      timeline.to(pathRef.current, {
        drawSVG: "0% 100%",
        strokeWidth: midStrokeWidth,
        duration: 1,
        ease: "power3.inOut",
      });

      timeline.to(pathRef.current, {
        drawSVG: "100% 100%",
        strokeWidth: 100,
        duration: 1,
        ease: "power3.inOut",
      });
    },
    { scope: containerRef },
  );

  return (
    <div
      ref={containerRef}
      className="pointer-events-none fixed inset-0 z-[120] overflow-hidden"
      aria-hidden="true"
    >
      <PageCover
        svgRef={svgRef}
        pathRef={pathRef}
        className="absolute top-1/2 left-1/2 h-[130vh] w-[120vw] -translate-x-1/2 -translate-y-1/2"
      />
    </div>
  );
}
