type StatLabelProps =
  | {
      label: string;
      stat?: string;
      className?: string;
    }
  | {
      label?: string;
      stat: string;
      className?: string;
    };

export default function StatLabel({
  label = "",
  stat = "",
  className = "",
}: StatLabelProps) {
  if (!label && !stat) {
    return null;
  }

  return (
    <div
      className={`flex items-center gap-2 rounded-xl border-2 border-white bg-white/80 px-4 py-2 text-sm backdrop-blur-sm ${className}`.trim()}
    >
      <div className="h-2 w-2 rounded-full bg-green-800"></div>
      {label ? <p>{label}</p> : null}
      {stat ? <p className="font-medium text-green-800">{stat}</p> : null}
    </div>
  );
}
