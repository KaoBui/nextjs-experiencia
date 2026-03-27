"use client";

import {
  forwardRef,
  type ComponentPropsWithoutRef,
  type Ref,
  useId,
} from "react";

type ReasonsWaveProps = ComponentPropsWithoutRef<"svg"> & {
  pathRef?: Ref<SVGPathElement>;
};

const ReasonsWave = forwardRef<SVGSVGElement, ReasonsWaveProps>(
  ({ pathRef, ...props }, ref) => {
    const gradientId = useId();

    return (
      <svg
        ref={ref}
        viewBox="0 0 1536 1205"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        {...props}
      >
        <path
          ref={pathRef}
          d="M1593.5 119.616C895 175.617 392.5 531.116 1123.5 429.616C1854.5 328.117 1398 1042.62 -53 1084.62"
          stroke={`url(#${gradientId})`}
          strokeOpacity="0.3"
          strokeWidth="240"
        />
        <defs>
          <linearGradient
            id={gradientId}
            x1="1348.09"
            y1="189.668"
            x2="1348.09"
            y2="1113.13"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#4008C3" />
            <stop offset="0.331731" stopColor="#5927CF" />
            <stop offset="0.605769" stopColor="#8D67E7" />
            <stop offset="0.913462" stopColor="#B99DFB" />
          </linearGradient>
        </defs>
      </svg>
    );
  },
);

ReasonsWave.displayName = "ReasonsWave";

export default ReasonsWave;
