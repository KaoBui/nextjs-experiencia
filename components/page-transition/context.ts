"use client";

import { createContext } from "react";
import type { ReactNode } from "react";

export type TransitionLayer = {
  key: string;
  children: ReactNode;
};

export type TransitionContextValue = {
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

export const PageTransitionContext =
  createContext<TransitionContextValue | null>(null);
