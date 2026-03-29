"use client";

import { useContext } from "react";
import { PageTransitionContext } from "@/components/page-transition/context";

export function usePageTransition() {
  const context = useContext(PageTransitionContext);

  if (!context) {
    throw new Error("usePageTransition must be used within PageTransition");
  }

  return context;
}
