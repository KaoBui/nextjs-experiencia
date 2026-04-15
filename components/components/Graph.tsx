"use client";
import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";

type GraphProps = {
  className?: string;
  delay?: number;
};

export default function Graph({ className = "", delay = 0 }: GraphProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const barRefs = useRef<Array<HTMLDivElement | null>>([]);

  useLayoutEffect(() => {
    if (!containerRef.current) return;

    const bars = barRefs.current.filter(
      (bar): bar is HTMLDivElement => bar !== null,
    );

    if (!bars.length) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        bars,
        { height: 0 },
        {
          height: (_, target) => target.dataset.height ?? 0,
          duration: 0.7,
          delay,
          stagger: 0.12,
          ease: "power3.out",
        },
      );
    }, containerRef);

    return () => ctx.revert();
  }, [delay]);

  return (
    <div
      ref={containerRef}
      className={`hidden items-end gap-2 rounded-4xl border-2 border-white bg-white/50 p-2 backdrop-blur-md md:flex ${className}`.trim()}
    >
      <div
        ref={(node) => {
          barRefs.current[0] = node;
        }}
        data-height="33.333333%"
        className="bg-mauve h-1/3 flex-1 rounded-3xl shadow-md"
      ></div>
      <div
        ref={(node) => {
          barRefs.current[1] = node;
        }}
        data-height="66.666667%"
        className="bg-lila h-2/3 flex-1 rounded-3xl shadow-md"
      ></div>
      <div
        ref={(node) => {
          barRefs.current[2] = node;
        }}
        data-height="100%"
        className="bg-indigo h-full flex-1 rounded-3xl shadow-md"
      ></div>
    </div>
  );
}
