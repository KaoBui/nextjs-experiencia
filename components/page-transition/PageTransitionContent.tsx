"use client";

import type { ReactNode } from "react";
import PageCover from "@/components/svg/PageCover";
import { usePageTransition } from "@/components/page-transition/usePageTransition";

export default function PageTransitionContent({
  children,
}: {
  children: ReactNode;
}) {
  const { registerOverlay, registerPath } = usePageTransition();

  return (
    <>
      {children}
      <div
        ref={registerOverlay}
        className="pointer-events-none invisible fixed inset-0 z-[200] overflow-hidden opacity-0"
        aria-hidden="true"
      >
        <PageCover
          pathRef={registerPath}
          className="absolute top-1/2 left-1/2 h-[120vh] w-[120vw] -translate-x-1/2 -translate-y-1/2"
        />
      </div>
    </>
  );
}
