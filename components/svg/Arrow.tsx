"use client";

import { forwardRef, type ComponentPropsWithoutRef, type Ref } from "react";

type ArrowProps = ComponentPropsWithoutRef<"svg"> & {
  lineClassName?: string;
  headClassName?: string;
  lineRef?: Ref<SVGPathElement>;
  headRef?: Ref<SVGPathElement>;
  stroke?: string;
  strokeWidth?: number;
};

const Arrow = forwardRef<SVGSVGElement, ArrowProps>(
  (
    {
      lineClassName,
      headClassName,
      lineRef,
      headRef,
      stroke = "currentColor",
      strokeWidth = 3,
      ...props
    },
    ref,
  ) => {
    return (
      <svg
        ref={ref}
        viewBox="0 0 30 30"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        {...props}
      >
        <path
          ref={lineRef}
          className={lineClassName}
          d="M2.06371 15H27.936"
          stroke={stroke}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          ref={headRef}
          className={headClassName}
          d="M20.9704 21.9657L27.936 15.0001L20.9704 8.03442"
          stroke={stroke}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  },
);

Arrow.displayName = "Arrow";

export default Arrow;
