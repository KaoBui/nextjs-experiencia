"use client";

type PieSegment = {
  value: number;
  color: string;
};

type PieProps = {
  className?: string;
  segments?: PieSegment[];
  donut?: boolean;
  innerScale?: number;
  gapDegrees?: number;
  rotate?: number;
};

const DEFAULT_SEGMENTS: PieSegment[] = [
  { value: 34, color: "var(--color-jaune)" },
  { value: 28, color: "var(--color-indigo)" },
  { value: 20, color: "var(--color-mauve)" },
  { value: 18, color: "var(--color-lila)" },
];

function buildConicGradient(segments: PieSegment[], gapDegrees: number) {
  const validSegments = segments.filter((segment) => segment.value > 0);

  if (validSegments.length === 0) {
    return "conic-gradient(var(--color-indigo) 0deg 360deg)";
  }

  const total = validSegments.reduce((sum, segment) => sum + segment.value, 0);
  let cursor = 0;

  const stops = validSegments.map((segment) => {
    const rawSpan = (segment.value / total) * 360;
    const gap = Math.min(gapDegrees, rawSpan);
    const start = cursor;
    const end = cursor + Math.max(rawSpan - gap, 0);
    const stop = `${segment.color} ${start}deg ${end}deg`;

    cursor += rawSpan;

    if (gap > 0 && cursor < 360) {
      return `${stop}, transparent ${end}deg ${cursor}deg`;
    }

    return stop;
  });

  return `conic-gradient(${stops.join(", ")})`;
}

export default function PieChart({
  className = "",
  segments = DEFAULT_SEGMENTS,
  donut = true,
  innerScale = 0.58,
  gapDegrees = 3,
  rotate = -24,
}: PieProps) {
  const chartBackground = buildConicGradient(segments, gapDegrees);

  return (
    <div
      className={`hidden items-center justify-center rounded-4xl border-2 border-white bg-white/50 p-[5%] backdrop-blur-md md:flex ${className}`.trim()}
    >
      <div
        className="relative aspect-square w-full rounded-full shadow-md"
        style={{
          background: chartBackground,
          transform: `rotate(${rotate}deg)`,
        }}
      >
        {donut ? (
          <div
            className="absolute rounded-full border border-white/70 bg-white/90 shadow-md backdrop-blur-lg"
            style={{
              inset: `${((1 - innerScale) / 2) * 100}%`,
            }}
          />
        ) : null}
      </div>
    </div>
  );
}
