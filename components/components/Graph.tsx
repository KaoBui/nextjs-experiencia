"use client";
type GraphProps = {
  className?: string;
};
export default function Graph({ className = "" }: GraphProps) {
  return (
    <div
      className={`rounded-xl border-2 border-white bg-white/80 backdrop-blur-sm flex items-end gap-2 p-2 ${className}`.trim()}
    >
      <div className="flex-1 bg-mauve rounded-md h-1/3"></div>
      <div className="flex-1 bg-lila rounded-md h-2/3"></div>
      <div className="flex-1 bg-indigo rounded-md h-full"></div>
    </div>
  );
}
