"use client";
import Image from "next/image";
import type { CSSProperties } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import TransitionLink from "@/components/TransitionLink";

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

  const containerRef = useRef<HTMLDivElement | null>(null);
  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top bottom",
        end: "50% bottom",
        scrub: true,
      },
    });
    tl.from(containerRef.current, {
      opacity: 0,
      filter: "blur(12px)",
      yPercent: 10,
    });
  });

  return (
    <div
      ref={containerRef}
      className="flex min-h-[50vh] flex-col items-start justify-between rounded-3xl border-2 border-white bg-white/75 p-6 backdrop-blur-xl"
      style={accentStyle}
    >
      <div className="flex w-full justify-end">
        <div className="flex h-16 w-16 rounded-full bg-white p-4 shadow-2xl/10">
          <Image src={imgSrc} width={100} height={100} alt="" />
        </div>
      </div>
      <div className="flex flex-col items-start">
        <h3 className="text-3xl" style={{ color: "var(--service-card-color)" }}>
          {offerName}
        </h3>
        <p className="text-primary text-base font-semibold">{description}</p>
        <p className="text-secondary text-base">
          Vos clients achètent moins qu’ils le pourrient
        </p>
        <p className="text-secondary hidden py-4 text-sm">
          Je vous aide à transformer vos acheteurs ponctuels en clients
          réguliers grâce à l’analyse de vos données de vente.
        </p>
        <TransitionLink
          href={href}
          className="mt-space-base rounded-xl bg-[color-mix(in_srgb,var(--service-card-color)_8%,transparent)] px-6 py-3 text-sm font-semibold text-[var(--service-card-color)] transition-colors hover:bg-[var(--service-card-color)] hover:text-white"
        >
          Voir l&apos;offre <span className="uppercase">{offerName}</span>
        </TransitionLink>
      </div>
    </div>
  );
}
