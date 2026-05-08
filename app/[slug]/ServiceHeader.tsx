"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
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
      <section className="px-section-padding relative overflow-hidden py-4">
        <HeaderWave
          className="pointer-events-none fixed top-0 right-0 h-auto w-1/2"
          pathClassName="header-wave__path"
        />

        <header
          className="px-site-margin bg-indigo/5 grid h-[95vh] gap-8 rounded-[2rem] border border-white/70 p-8 backdrop-blur-md lg:grid-cols-[1.25fr_0.75fr]"
          // style={{
          //   backgroundImage: `linear-gradient(135deg, color-mix(in srgb, ${service.color} 5%, white) 0%, rgba(255,255,255,0.50) 100%)`,
          // }}
        >
          <div className="gap-space-2x flex flex-col items-start justify-end">
            {/* <div className="gap-space-sm flex w-fit items-center rounded-full bg-white/50 p-2 px-3">
              <div
                className="bg-indigo h-1 w-1 rounded-full"
                style={{ backgroundColor: service.color }}
              ></div>
              <p className="text-xs uppercase">
                OFFRE <strong>{service.name}</strong>{" "}
              </p>
            </div> */}
            <div className="space-y-space-base">
              <SectionLabel color={service.color}>
                {" "}
                OFFRE {service.name}
              </SectionLabel>

              <h1 className="max-w-[28ch] text-4xl leading-[1.02] md:text-6xl">
                Augmentez la fréquence d'achat de vos clients en moins de 3 mois
              </h1>
            </div>
            <div className="space-y-space-base py-4">
              <p className="text-secondary max-w-[48ch] text-base leading-7">
                Faites revenir vos clients plus souvent : transformez vos
                acheteurs ponctuels en clients réguliers
              </p>
              <div className="gap-space-sm flex">
                <StatLabel label="Achats réguliers" className="text-base" />
                <StatLabel label="Réachat" stat="jusqu'à +30%" />
                <StatLabel label="Plus besoin d'acquisition massive" />
              </div>
            </div>
            <Button href="/contact" color={service.color}>
              Prendre rendez-vous
            </Button>
          </div>

          <div className="relative m-0 flex items-end justify-start md:justify-end">
            <PieChart className="absolute bottom-1/5 left-1/2 aspect-square w-[40%] -translate-x-1/2 rotate-8 shadow-lg/5" />
            <Graph
              delay={1}
              className="charts absolute bottom-0 left-0 aspect-square w-1/3 -rotate-10 shadow-lg/5"
            />

            <div className="relative -z-1 h-[65vh] overflow-hidden rounded-3xl border-1 border-white bg-violet-50 p-2 md:max-w-md">
              <Image
                src="/reactiver-header.jpg"
                width={800}
                height={800}
                className="h-full w-full rounded-2xl object-cover object-top"
                alt="Offre Reactiver"
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
          <div className="gap-space-2x flex flex-col items-center justify-between">
            <div className="gap-space-base flex flex-col items-center">
              <SectionLabel color={service.color}>symptomes</SectionLabel>
              <h2 className="max-w-[32ch] text-center text-4xl">
                <Heading splitType="lines">
                  3 signes qui montrent que vous devriez travailler le réachat
                </Heading>
              </h2>
            </div>
            <p className="max-w-[48ch] text-center">
              <Heading>
                Vous ne saurez jamais si vos clients réalisent 100 % de leurs
                achats chez vous, et honnêtement, ce n’est pas le plus
                important. Pour autant, vous vous demandez sûrement si vos
                clients actuels pourraient acheter davantage et donc vous
                générer plus de chiffre d’affaires.
              </Heading>
            </p>
          </div>
          <div className="gap-space-2x mt-space-4x flex flex-col justify-center md:flex-row">
            {service.symptoms.map((item) => (
              <HoverCard
                key={item.title}
                heading={item.title}
                description={item.description}
                color={service.color}
                className="w-full md:w-1/4"
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
