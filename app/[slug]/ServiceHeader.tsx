"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { DrawSVGPlugin } from "gsap/DrawSVGPlugin";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import TransitionLink from "@/components/TransitionLink";
import HeaderWave from "@/components/svg/HeaderWave";
import type { ServicePageData } from "@/lib/service-pages";
import Heading from "@/components/components/Heading";
import Graph from "@/components/components/Graph";
import StatLabel from "@/components/components/StatLabel";
import NumberBlock from "@/components/components/NumberBlock";
import Button from "@/components/components/Button";

gsap.registerPlugin(useGSAP, DrawSVGPlugin, ScrollTrigger);

function SectionLabel({
  children,
  color,
}: {
  children: React.ReactNode;
  color: string;
}) {
  return (
    <p
      className="text-sm font-semibold tracking-[0.18em] uppercase"
      style={{ color }}
    >
      {children}
    </p>
  );
}

type ServiceHeaderProps = {
  service: ServicePageData;
};

export default function ServiceHeader({ service }: ServiceHeaderProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const signauxRef = useRef<HTMLElement | null>(null);

  useGSAP(
    () => {
      gsap.fromTo(
        ".header-wave__path",
        { drawSVG: "0% 0%" },
        {
          drawSVG: "0% 100%",
          duration: 0.8,
          ease: "power4.out",
        },
      );

      if (!signauxRef.current) {
        return;
      }

      gsap.fromTo(
        ".header-wave__path",
        { drawSVG: "0% 100%" },
        {
          drawSVG: "100% 100%",
          ease: "none",
          scrollTrigger: {
            trigger: signauxRef.current,
            start: "top bottom",
            end: "50% 50%",
            scrub: true,
          },
        },
      );
    },
    { scope: containerRef },
  );

  return (
    <div ref={containerRef}>
      <section className="px-section-padding py-4">
        <HeaderWave
          className="pointer-events-none fixed top-0 right-0 h-auto w-1/2"
          pathClassName="header-wave__path"
        />

        <header
          className="grid h-[80vh] gap-8 rounded-[2rem] border border-white/70 p-8 backdrop-blur-md lg:grid-cols-[1.25fr_0.75fr]"
          style={{
            backgroundImage: `linear-gradient(135deg, color-mix(in srgb, ${service.color} 10%, white) 0%, rgba(255,255,255,0.60) 90%)`,
          }}
        >
          <div className="gap-space-base flex flex-col items-start justify-end">
            <div className="gap-space-sm flex w-fit items-center rounded-full bg-white/50 p-2 px-3">
              <div
                className="bg-indigo h-1 w-1 rounded-full"
                style={{ backgroundColor: service.color }}
              ></div>
              <p className="text-xs uppercase">
                OFFRE <strong>{service.name}</strong>{" "}
              </p>
            </div>
            <h1 className="text-4xl leading-[1.02] md:text-5xl">
              Augmentez la fréquence d'achat de vos clients en moins de 3 mois
            </h1>
            <p className="text-secondary max-w-[62ch] text-base leading-7">
              Faites revenir vos clients plus souvent : transformez vos
              acheteurs ponctuels en clients réguliers
            </p>
            <Button href="/contact" color={service.color}>
              Prendre rendez-vous
            </Button>
          </div>

          <div className="relative flex items-center justify-end">
            <Graph className="charts bottom-1/2 -left-6 h-50 w-50 shadow-lg/5" />
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-white">
              <Image
                src={service.icon}
                alt=""
                width={96}
                height={96}
                className="h-auto w-12"
              />
            </div>
          </div>
        </header>
      </section>

      <section
        ref={signauxRef}
        id="signaux"
        className="px-section-padding py-space-4x overflow-hidden"
      >
        <div className="mx-site-margin rounded-[2rem]">
          <div className="flex max-w-[48ch] flex-col gap-2">
            <SectionLabel color={service.color}>symptomes</SectionLabel>
            <h2 className="pb-space-base text-4xl">
              <Heading splitType="lines">
                3 signes qui montrent que vous devriez travailler le réachat
              </Heading>
            </h2>
            <p>
              <Heading>
                Vous ne saurez jamais si vos clients réalisent 100 % de leurs
                achats chez vous, et honnêtement, ce n’est pas le plus
                important. Pour autant, vous vous demandez sûrement si vos
                clients actuels pourraient acheter davantage et donc vous
                générer plus de chiffre d’affaires.
              </Heading>
            </p>
          </div>
          <div className="gap-space-2x mt-space-2x flex">
            {service.symptoms.map((item) => (
              <article
                key={item.title}
                className="p-space-base pt-space-2x rounded-[1.5rem] bg-white"
              >
                <h2 className="text-md font-body">{item.title}</h2>
                <p className="text-secondary mt-2 text-sm leading-7">
                  {item.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
