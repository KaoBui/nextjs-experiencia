type StatLabelProps = {
  label: string;
  stat: string;
  className?: string;
};

export default function StatLabel({
  label,
  stat,
  className = "",
}: StatLabelProps) {
  return (
    <div
      className={`flex items-center gap-2 py-2 px-4 text-sm rounded-xl border-2 border-white bg-white/80 backdrop-blur-sm ${className}`.trim()}
    >
      <div className="w-2 h-2 rounded-full bg-green-800"></div>
      <p>{label}</p>
      <p className="text-green-800 font-medium ">{stat}</p>
    </div>
  );
}
