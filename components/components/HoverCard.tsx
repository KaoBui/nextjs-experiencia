"use client";

import { useRef, useState, type CSSProperties } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

type HoverCardProps = {
  heading: string;
  description: string;
  color: string;
  className?: string;
};

export default function HoverCard({
  heading,
  description,
  color,
  className = "",
}: HoverCardProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const verticalLineRef = useRef<SVGPathElement>(null);
  const [isOpen, setIsOpen] = useState(false);

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top bottom",
        end: "bottom bottom",
        scrub: true,
      },
    });
    tl.from(containerRef.current, {
      opacity: 0,
      filter: "blur(12px)",
      yPercent: 20,
    });
  });

  const colorStyle = {
    "--hover-card-color": color,
  } as CSSProperties;

  const handleImageContainerClick = () => {
    if (!overlayRef.current || !verticalLineRef.current) return;

    const nextIsOpen = !isOpen;

    gsap.to(overlayRef.current, {
      clipPath: nextIsOpen
        ? "circle(120% at 85% 14%)"
        : "circle(0% at 85% 14%)",
      duration: 0.4,
      ease: "power3.inOut",
    });

    gsap.to(verticalLineRef.current, {
      scaleY: nextIsOpen ? 0 : 1,
      transformOrigin: "center center",
      duration: 0.25,
      ease: "power2.inOut",
    });

    setIsOpen(nextIsOpen);
  };

  return (
    <div
      ref={containerRef}
      className={`group p-space-base relative flex flex-col items-end gap-[15vh] overflow-hidden rounded-3xl border-2 border-white bg-white/75 shadow-sm backdrop-blur-md ${className}`.trim()}
      style={colorStyle}
    >
      <button
        type="button"
        aria-pressed={isOpen}
        aria-label={isOpen ? "Close card details" : "Open card details"}
        className="z-1 flex cursor-pointer items-center justify-center rounded-full p-2 text-sm"
        style={{
          backgroundColor: isOpen ? "#fff" : "var(--hover-card-color)",
          color: isOpen ? "var(--hover-card-color)" : "#fff",
          gap: isOpen ? 1 : 0,
        }}
        onClick={handleImageContainerClick}
      >
        <span
          className={`overflow-hidden whitespace-nowrap transition-all duration-300 ease-out ${
            isOpen
              ? "max-w-24 translate-x-0 pl-2 opacity-100"
              : "max-w-0 -translate-x-2 opacity-0 group-hover:max-w-24 group-hover:translate-x-0 group-hover:opacity-100"
          }`}
        >
          {isOpen ? "Voir moins" : "Voir plus"}
        </span>
        <svg
          width="20"
          height="20"
          viewBox="0 0 32 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            ref={verticalLineRef}
            d="M16 7.25V24.75"
            stroke={isOpen ? color : "#fff"}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M7.25 16H24.75"
            stroke={isOpen ? color : "#fff"}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
      <div
        ref={overlayRef}
        className="bg-indigo p-space-base absolute inset-0 flex flex-col justify-end"
        style={{ clipPath: "circle(0% at 85% 14%)" }}
      >
        <p className="text-sm text-white">{description}</p>
      </div>
      <div className="w-full">
        <p className="text-primary text-base">{heading}</p>
      </div>
    </div>
  );
}
