import Image from "next/image";
import Link from "next/link";
import type { CSSProperties } from "react";

type ServiceCardProps = {
  imgSrc: string;
  offerName: string;
  description: string;
  href: string;
  cardColor: string;
};

export default function ServiceCard({
  imgSrc,
  offerName,
  description,
  href,
  cardColor,
}: ServiceCardProps) {
  const accentStyle = {
    "--service-card-color": cardColor,
  } as CSSProperties;

  return (
    <div
      className="flex min-h-[360px] flex-col items-start justify-between rounded-3xl border-2 border-white bg-white/60 p-6 backdrop-blur-xl"
      style={accentStyle}
    >
      <div className="flex w-full justify-end">
        <div className="flex h-20 w-20 rounded-full bg-white p-5 shadow-2xl/10">
          <Image src={imgSrc} width={100} height={100} alt="" />
        </div>
      </div>
      <div className="flex flex-col items-start">
        <h3 className="text-3xl" style={{ color: "var(--service-card-color)" }}>
          {offerName}
        </h3>
        <p className="text-base text-secondary">{description}</p>
        <Link
          href={href}
          className="mt-space-base rounded-xl px-6 py-3 text-sm font-semibold"
          style={{
            color: "var(--service-card-color)",
            backgroundColor:
              "color-mix(in srgb, var(--service-card-color) 10%, transparent)",
          }}
        >
          Voir l'offre <span className="uppercase">{offerName}</span>
        </Link>
      </div>
    </div>
  );
}
