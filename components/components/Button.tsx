"use client";

import { type ComponentPropsWithoutRef, type MouseEvent, useRef } from "react";
import gsap from "gsap";
import TransitionLink from "@/components/TransitionLink";
import Arrow from "@/components/svg/Arrow";
import { cn } from "@/lib/utils";

type ButtonProps = ComponentPropsWithoutRef<typeof TransitionLink> & {
  color?: string;
  iconClassName?: string;
};

export default function Button({
  children,
  className,
  color = "linear-gradient(90deg, #500BF4 0%, #733BF7 100%)",
  iconClassName,
  onMouseEnter,
  onMouseLeave,
  ...props
}: ButtonProps) {
  const buttonRef = useRef<HTMLAnchorElement | null>(null);
  const textRef = useRef<HTMLSpanElement | null>(null);
  const iconRef = useRef<HTMLDivElement | null>(null);
  const solidColor = color.includes("gradient") ? "#733BF7" : color;
  const iconStroke = solidColor;
  const colorStyle = {
    background: color,
  };

  const animateSwap = (isHovering: boolean) => {
    if (!buttonRef.current || !textRef.current || !iconRef.current) return;

    const buttonBounds = buttonRef.current.getBoundingClientRect();
    const textBounds = textRef.current.getBoundingClientRect();
    const iconBounds = iconRef.current.getBoundingClientRect();
    const textLeft = textBounds.left - buttonBounds.left;
    const iconLeft = iconBounds.left - buttonBounds.left;
    const textTravel = iconBounds.width;
    const iconTravel = textLeft - iconLeft - 12;

    gsap.to(textRef.current, {
      x: isHovering ? textTravel : 0,
      duration: 0.35,
      ease: "power3.inOut",
    });

    gsap.to(iconRef.current, {
      x: isHovering ? iconTravel : 0,
      duration: 0.35,
      ease: "power3.inOut",
    });
  };

  const handleMouseEnter = (event: MouseEvent<HTMLAnchorElement>) => {
    animateSwap(true);
    onMouseEnter?.(event);
  };

  const handleMouseLeave = (event: MouseEvent<HTMLAnchorElement>) => {
    animateSwap(false);
    onMouseLeave?.(event);
  };

  return (
    <TransitionLink
      ref={buttonRef}
      className={cn(
        "relative flex items-center justify-between gap-3 overflow-hidden rounded-full p-2 px-6 pr-2 text-base text-white",
        className,
      )}
      style={colorStyle}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      {...props}
    >
      <span
        ref={textRef}
        className="relative z-0 block text-right will-change-transform"
      >
        {children}
      </span>
      <div
        ref={iconRef}
        className={cn(
          "relative z-10 aspect-square h-10 w-10 rounded-full bg-white p-3 will-change-transform",
          iconClassName,
        )}
      >
        <Arrow stroke={iconStroke} />
      </div>
    </TransitionLink>
  );
}
