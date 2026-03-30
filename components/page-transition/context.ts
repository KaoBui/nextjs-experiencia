"use client";

import { createContext } from "react";

export type TransitionContextValue = {
  isTransitioning: boolean;
  navigate: (href: string) => void;
  registerOverlay: (node: HTMLDivElement | null) => void;
  registerPath: (node: SVGPathElement | null) => void;
};

export const PageTransitionContext =
  createContext<TransitionContextValue | null>(null);
