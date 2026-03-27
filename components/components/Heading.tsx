"use client";

import { forwardRef, useRef, type ReactNode } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(useGSAP, ScrollTrigger, SplitText);

type HeadingProps = {
  children: ReactNode;
  className?: string;
  splitType?: string;
  onSplit?: (split: SplitText) => void;
};

const Heading = forwardRef<HTMLSpanElement, HeadingProps>(
  ({ children, className, splitType = "chars,words,lines", onSplit }, ref) => {
    const headingRef = useRef<HTMLSpanElement | null>(null);

    useGSAP(
      () => {
        if (!headingRef.current) return;

        const split = SplitText.create(headingRef.current, {
          type: splitType,
        });

        const splitTargets =
          split.lines.length > 0
            ? split.lines
            : split.words.length > 0
              ? split.words
              : split.chars;

        gsap.from(splitTargets, {
          yPercent: 100,
          filter: "blur(12px)",
          stagger: 0.06,
          opacity: 0,
          ease: "power1.out",
          scrollTrigger: {
            trigger: headingRef.current,
            start: "top bottom",
            end: "top 60%",
            toggleActions: "play none none reverse",
            scrub: true,
          },
        });

        onSplit?.(split);

        return () => {
          split.revert();
        };
      },
      { dependencies: [children, splitType, onSplit] },
    );

    return (
      <span
        ref={(node) => {
          headingRef.current = node;

          if (typeof ref === "function") {
            ref(node);
            return;
          }

          if (ref) {
            ref.current = node;
          }
        }}
        className={className}
      >
        {children}
      </span>
    );
  },
);

Heading.displayName = "Heading";

export default Heading;
