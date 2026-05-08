"use client";

import { type ComponentPropsWithoutRef, useState } from "react";
import TransitionLink from "@/components/TransitionLink";
import { cn } from "@/lib/utils";

type BasicButtonProps = ComponentPropsWithoutRef<typeof TransitionLink> & {
  color?: string;
  variant?: "fill" | "outline";
  shadow?: boolean;
};

export default function BasicButton({
  children,
  className,
  color = "#500BF4",
  variant = "fill",
  shadow = false,
  ...props
}: BasicButtonProps) {
  const [hovered, setHovered] = useState(false);

  const style =
    variant === "fill"
      ? {
          backgroundColor: color,
          color: "white",
          filter: hovered ? "brightness(0.88)" : "none",
          boxShadow: shadow ? (hovered ? "none" : `0 4px 16px color-mix(in srgb, ${color} 35%, transparent)`) : undefined,
        }
      : {
          border: `1px solid ${color}`,
          color: color,
          backgroundColor: hovered ? `${color}14` : "transparent",
          boxShadow: shadow ? (hovered ? "none" : `0 4px 16px color-mix(in srgb, ${color} 35%, transparent)`) : undefined,
        };

  return (
    <TransitionLink
      className={cn(
        "flex items-center rounded-full px-5 py-3 text-sm transition-all md:text-base",
        className,
      )}
      style={style}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      {...props}
    >
      {children}
    </TransitionLink>
  );
}
