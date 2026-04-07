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
import HoverCard from "@/components/components/HoverCard";
import PieChart from "@/components/components/PieChart";

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
            trigger: containerRef.current,
            start: "top top",
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
          className="px-site-margin grid h-[75vh] gap-8 rounded-[2rem] border border-white/70 p-8 backdrop-blur-md lg:grid-cols-[1.25fr_0.75fr]"
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
            <h1 className="max-w-[28ch] text-4xl leading-[1.02] md:text-6xl">
              Augmentez la fréquence d'achat de vos clients en moins de 3 mois
            </h1>
            <p className="text-secondary max-w-[48ch] text-md leading-7 py-2">
              Faites revenir vos clients plus souvent : transformez vos
              acheteurs ponctuels en clients réguliers
            </p>
            <Button href="/contact" color={service.color}>
              Prendre rendez-vous
            </Button>
          </div>

          <div className="mx-space-2x relative flex items-center justify-end">
            <PieChart className="absolute top-1/3 left-1/2 aspect-square w-[60%] -translate-x-1/2 rotate-8 shadow-lg/5" />
            <Graph className="charts absolute bottom-0 left-1/5 aspect-square w-1/3 -rotate-10 shadow-lg/5" />
            <div className="gap-space-base absolute bottom-0 flex flex-col items-end">
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-white/50 backdrop-blur-md">
                <Image
                  src={service.icon}
                  alt=""
                  width={96}
                  height={96}
                  className="h-auto w-12"
                />
              </div>{" "}
              <StatLabel label="Achats réguliers" />
              <StatLabel label="Réachat" stat="+42%" />
              <StatLabel label="Plus besoin d'acquisition massive" />
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
          <div className="flex items-end justify-between gap-2">
            <div>
              <SectionLabel color={service.color}>symptomes</SectionLabel>
              <h2 className="max-w-[32ch] text-4xl">
                <Heading splitType="lines">
                  3 signes qui montrent que vous devriez travailler le réachat
                </Heading>
              </h2>
            </div>
            <p className="max-w-[48ch]">
              <Heading>
                Vous ne saurez jamais si vos clients réalisent 100 % de leurs
                achats chez vous, et honnêtement, ce n’est pas le plus
                important. Pour autant, vous vous demandez sûrement si vos
                clients actuels pourraient acheter davantage et donc vous
                générer plus de chiffre d’affaires.
              </Heading>
            </p>
          </div>
          <div className="gap-space-2x mt-space-4x flex justify-start">
            {service.symptoms.map((item) => (
              <HoverCard
                key={item.title}
                heading={item.title}
                description={item.description}
                color={service.color}
                className="w-1/4"
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
