import type { Ref } from "react";

export const TOP_WAVE_PATH_ID = "top-wave-shape";
export const TOP_WAVE_FLAT_PATH_ID = "top-wave-flat-shape";

type TopWaveProps = {
  className?: string;
  svgRef?: Ref<SVGSVGElement>;
  pathRef?: Ref<SVGPathElement>;
};

export default function TopWave({ className, svgRef, pathRef }: TopWaveProps) {
  return (
    <svg
      ref={svgRef}
      className={className}
      viewBox="0 0 1536 104"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        id={TOP_WAVE_PATH_ID}
        ref={pathRef}
        d="M463.5 18.9008C240.5 -53.1214 -1 103.9 -1 103.9H1536V46.4002C1124 -20.0998 962 179.901 463.5 18.9008Z"
        fill="#220842"
      />
      <path
        id={TOP_WAVE_FLAT_PATH_ID}
        d="M0 0.000625706L2.28882e-05 57.5001H1537V0L0 0.000625706Z"
        fill="transparent"
        pointerEvents="none"
      />
    </svg>
  );
}
