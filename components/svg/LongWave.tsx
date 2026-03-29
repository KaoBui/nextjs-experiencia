import type { Ref } from "react";

type LongWaveProps = {
  className?: string;
  pathRef?: Ref<SVGPathElement>;
};

export default function LongWave({ className, pathRef }: LongWaveProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 1536 1392"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        ref={pathRef}
        d="M1638 326.036C1149.5 141.536 863.744 -211.606 1230.9 421.238C1549 969.536 1367.49 1161.04 958.5 867.536C598.5 609.193 604.453 669.536 796.5 1105.04C895.5 1329.54 559.519 1335.89 324.5 1075.54C74 798.036 324.5 1587.04 -51.5 1243.54"
        stroke="url(#long-wave-gradient)"
        strokeOpacity="0.4"
        strokeWidth="120"
        strokeLinecap="round"
      />
      <defs>
        <linearGradient
          id="long-wave-gradient"
          x1="1534.5"
          y1="130.538"
          x2="-8.99998"
          y2="1197.04"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#4008C3" />
          <stop offset="0.267159" stopColor="#7B63FA" />
          <stop offset="0.674476" stopColor="#AC6CFF" />
          <stop offset="1" stopColor="#E9E0FE" />
        </linearGradient>
      </defs>
    </svg>
  );
}
