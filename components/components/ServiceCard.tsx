"use client";
import Image from "next/image";
import type { CSSProperties } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
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
  const revealWrapRef = useRef<HTMLDivElement | null>(null);
  const descRef = useRef<HTMLDivElement | null>(null);
  const linkRef = useRef<HTMLDivElement | null>(null);

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

    const mm = gsap.matchMedia();

    mm.add("(min-width: 768px)", () => {
      gsap.set(revealWrapRef.current, { height: 0, overflow: "hidden" });

      const link = linkRef.current;
      if (!link) return;

      const enter = () => {
        gsap.to(revealWrapRef.current, { height: "auto", duration: 0.45, ease: "power2.out" });
        gsap.to(descRef.current, { y: -6, duration: 0.45, ease: "power2.out" });
      };
      const leave = () => {
        gsap.to(revealWrapRef.current, { height: 0, duration: 0.3, ease: "power2.in" });
        gsap.to(descRef.current, { y: 0, duration: 0.3, ease: "power2.in" });
      };

      link.addEventListener("mouseenter", enter);
      link.addEventListener("mouseleave", leave);

      return () => {
        link.removeEventListener("mouseenter", enter);
        link.removeEventListener("mouseleave", leave);
        gsap.set(revealWrapRef.current, { height: "auto", overflow: "visible" });
      };
    });

    mm.add("(max-width: 767px)", () => {
      gsap.set(revealWrapRef.current, { height: "auto", overflow: "visible" });
    });

    return () => mm.revert();
  });

  return (
    <div
      ref={containerRef}
      className="3xl:min-h-[50vh] relative flex min-h-[45vh] flex-col items-start justify-end rounded-3xl border-2 border-white bg-white/75 p-6 backdrop-blur-xl"
      style={accentStyle}
    >
      <div className="absolute top-6 right-6 flex h-16 w-16 rounded-full bg-white p-4 shadow-2xl/10">
        <Image src={imgSrc} width={100} height={100} alt="" />
      </div>
      <div className="gap-space-base flex flex-col items-start">
        <h3 className="text-3xl" style={{ color: "var(--service-card-color)" }}>
          {offerName}
        </h3>
        <div ref={descRef}>
          <p className="text-primary text-base font-semibold">{description}</p>
          <p className="text-tertiary text-base">
            Vos clients achètent moins qu'ils le pourrient
          </p>
        </div>
        <div ref={revealWrapRef}>
          <p className="text-secondary pb-2 text-sm">
            Je vous aide à transformer vos acheteurs ponctuels en clients
            réguliers grâce à l'analyse de vos données de vente.
          </p>
        </div>
        <div ref={linkRef}>
          <TransitionLink
            href={href}
            className="mt-space-base rounded-xl bg-[color-mix(in_srgb,var(--service-card-color)_8%,transparent)] px-6 py-3 text-sm font-semibold text-[var(--service-card-color)] transition-colors hover:bg-[var(--service-card-color)] hover:text-white"
          >
            Voir l&apos;offre <span className="uppercase">{offerName}</span>
          </TransitionLink>
        </div>
      </div>
    </div>
  );
}
