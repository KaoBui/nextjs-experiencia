"use client";
type GraphProps = {
  className?: string;
};
export default function Graph({ className = "" }: GraphProps) {
  return (
    <div
      className={`bg-white/50 hidden md:flex items-end gap-2 rounded-4xl border-2 border-white p-2 backdrop-blur-md ${className}`.trim()}
    >
      <div className="bg-mauve h-1/3 flex-1 rounded-3xl shadow-md"></div>
      <div className="bg-lila h-2/3 flex-1 rounded-3xl shadow-md"></div>
      <div className="bg-indigo h-full flex-1 rounded-3xl shadow-md"></div>
    </div>
  );
}
