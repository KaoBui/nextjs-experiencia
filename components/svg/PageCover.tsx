import type { Ref } from "react";

export const PAGE_COVER_PATH_ID = "page-cover-path";

type PageCoverProps = {
  className?: string;
  svgRef?: Ref<SVGSVGElement>;
  pathRef?: Ref<SVGPathElement>;
};

export default function PageCover({
  className,
  svgRef,
  pathRef,
}: PageCoverProps) {
  return (
    <svg
      ref={svgRef}
      className={className}
      viewBox="0 0 1936 1078"
      preserveAspectRatio="none"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        id={PAGE_COVER_PATH_ID}
        ref={pathRef}
        d="M70.6621 270.225C741.421 128.573 1743.15 36.496 1694.38 152.93C1645.6 269.364 381.646 397.966 126.162 585.225C-129.322 772.485 1564.66 351.225 1814.66 488.725C2064.66 626.225 -78.1283 872.535 138.662 950.725C355.452 1028.92 1502.16 919.225 1827.16 805.225"
        stroke="url(#page-cover-gradient)"
        strokeWidth="200"
      />
      <defs>
        <linearGradient
          id="page-cover-gradient"
          x1="381.168"
          y1="2.0956"
          x2="1814.42"
          y2="579.674"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#4008C3" />
          <stop offset="0.355769" stopColor="#7B63FA" />
          <stop offset="0.764423" stopColor="#AC6CFF" />
          <stop offset="1" stopColor="#E9E0FE" />
        </linearGradient>
      </defs>
    </svg>
  );
}
