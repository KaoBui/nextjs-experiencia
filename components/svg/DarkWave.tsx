import type { Ref } from "react";

type DarkWaveProps = {
  className?: string;
  pathClassName?: string;
  pathRef?: Ref<SVGPathElement>;
};

export default function DarkWave({
  className,
  pathClassName = "dark-wave__path",
  pathRef,
}: DarkWaveProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 1545 873"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <g clipPath="url(#dark-wave-clip)">
        <path
          ref={pathRef}
          className={pathClassName}
          d="M1553 763C1553 763 1475.05 444.04 1085.83 602.124C696.604 760.207 847.498 248.531 1148.79 312.211C1450.07 375.891 1417.6 -105.621 844 -114"
          fill="none"
          stroke="#966CF9"
          strokeWidth="120"
          strokeLinecap="round"
        />
      </g>
      <defs>
        <clipPath id="dark-wave-clip">
          <rect width="1545" height="873" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
}
