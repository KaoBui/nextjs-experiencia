import { Images } from "lucide-react";
import Image from "next/image";
type NumberBlockProps = {
  className?: string;
};
export default function NumberBlock({ className = "" }: NumberBlockProps) {
  return (
    <div
      className={`flex flex-col items-start justify-between rounded-xl border-2 border-white bg-white/80 p-3 px-2 backdrop-blur-sm ${className}`.trim()}
    >
      <p className="text-tertiary text-xs font-medium uppercase">Activité</p>
      <div className="flex items-start gap-1">
        <p className="text-xl text-green-800 leading-none font-semibold">+20%</p>
        <Image
          src="trending-up.svg"
          width={50}
          height={50}
          alt=""
          className="h-auto w-4 opacity-50"
        />
      </div>
    </div>
  );
}
