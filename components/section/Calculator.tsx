"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { DrawSVGPlugin } from "gsap/DrawSVGPlugin";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import DarkWave from "../svg/DarkWave";
import CalculatorCore from "../components/CalculatorCore";

gsap.registerPlugin(useGSAP, DrawSVGPlugin, ScrollTrigger);

export default function Calculator() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const wavePathRef = useRef<SVGPathElement | null>(null);

  useGSAP(
    () => {
      if (!sectionRef.current || !wavePathRef.current) {
        return;
      }

      gsap.fromTo(
        wavePathRef.current,
        { drawSVG: "100% 100%" },
        {
          drawSVG: "0% 100%",
          duration: 2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 25%",
            toggleActions: "play none none reverse",
          },
        },
      );
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      id="calculateur"
      className="bg-indigo-dark relative h-screen overflow-hidden px-4"
    >
      <DarkWave
        className="pointer-events-none absolute -top-4 right-0 w-full"
        pathRef={wavePathRef}
      />
      <div className="mx-site-margin z-1 flex h-full items-center justify-center">
        <div className="gap-space-base flex max-w-4xl rounded-4xl border-1 border-white/50 bg-white/10 p-4 backdrop-blur-md xl:max-w-5xl">
          <div className="gap-space-base flex flex-1 flex-col justify-center p-4">
            <h2 className="text-3xl text-white">
              Calculez le CA que vous perdez chaque mois{" "}
            </h2>
            <p className="text-base text-neutral-200">
              à cause des clients qui ne reviennent pas et faites une estimation
              rapide de ce que vous pourriez regagner si on travaille ensemble !
              → Pas de redirection ni collecte de données, vous obtenez votre
              estimation en live !
            </p>
          </div>
          <div className="flex-1 rounded-2xl bg-white p-8">
            <CalculatorCore />
          </div>
        </div>
      </div>
    </section>
  );
}
