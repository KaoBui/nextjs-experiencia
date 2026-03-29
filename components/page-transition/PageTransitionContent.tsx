"use client";

import { useLayoutEffect, type ReactNode } from "react";
import { usePageTransition } from "@/components/page-transition/usePageTransition";

export default function PageTransitionContent({
  children,
}: {
  children: ReactNode;
}) {
  const {
    activeLayer,
    displayedChildren,
    exitingLayer,
    isTransitioning,
    registerContainer,
    registerEntering,
    registerExiting,
    syncLayer,
  } = usePageTransition();

  useLayoutEffect(() => {
    syncLayer(children);
  }, [children, syncLayer]);

  return (
    <div
      ref={registerContainer}
      className="relative"
      data-transitioning={isTransitioning}
    >
      {exitingLayer ? (
        <div
          ref={registerExiting}
          className="pointer-events-none absolute inset-0 z-10"
          aria-hidden="true"
        >
          {exitingLayer.children}
        </div>
      ) : null}

      <div
        key={activeLayer.key}
        ref={registerEntering}
        className={isTransitioning ? "pointer-events-none" : undefined}
      >
        {displayedChildren ?? children}
      </div>
    </div>
  );
}
