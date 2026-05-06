"use client";

import { type ComponentPropsWithoutRef, useState } from "react";
import TransitionLink from "@/components/TransitionLink";
import { cn } from "@/lib/utils";

type BasicButtonProps = ComponentPropsWithoutRef<typeof TransitionLink> & {
  color?: string;
  variant?: "fill" | "outline";
};

export default function BasicButton({
  children,
  className,
  color = "#500BF4",
  variant = "fill",
  ...props
}: BasicButtonProps) {
  const [hovered, setHovered] = useState(false);

  const style =
    variant === "fill"
      ? {
          backgroundColor: color,
          color: "white",
          filter: hovered ? "brightness(0.88)" : "none",
        }
      : {
          border: `1px solid ${color}`,
          color: color,
          backgroundColor: hovered ? `${color}14` : "transparent",
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
