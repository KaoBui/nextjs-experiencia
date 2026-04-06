"use client";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { DrawSVGPlugin } from "gsap/DrawSVGPlugin";
import { MorphSVGPlugin } from "gsap/MorphSVGPlugin";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import DarkWave from "../svg/DarkWave";
import TopWave, { TOP_WAVE_FLAT_PATH_ID } from "../svg/TopWave";
import CalculatorCore from "../components/CalculatorCore";
import Heading from "../components/Heading";

gsap.registerPlugin(useGSAP, DrawSVGPlugin, MorphSVGPlugin, ScrollTrigger);

export default function Calculator() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const wavePathRef = useRef<SVGPathElement | null>(null);
  const topWaveSvgRef = useRef<SVGSVGElement | null>(null);
  const topWavePathRef = useRef<SVGPathElement | null>(null);

  useGSAP(
    () => {
      if (
        !sectionRef.current ||
        !wavePathRef.current ||
        !topWaveSvgRef.current ||
        !topWavePathRef.current
      ) {
        return;
      }

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 50%",
          end: "bottom 50%",
          scrub: 1,
        },
      });

      tl.fromTo(
        wavePathRef.current,
        { drawSVG: "100% 100%" },
        {
          drawSVG: "0% 100%",
          duration: 1,
          ease: "none",
        },
      ).to(wavePathRef.current, {
        drawSVG: "0% 0%",
        duration: 1,
        ease: "none",
      });

      // gsap.to(topWavePathRef.current, {
      //   morphSVG: {
      //     shape: `#${TOP_WAVE_FLAT_PATH_ID}`,
      //     shapeIndex: 0,
      //     map: "position",
      //   },
      //   ease: "none",
      //   scrollTrigger: {
      //     trigger: topWaveSvgRef.current,
      //     start: "bottom bottom",
      //     end: "top top",
      //     scrub: true,
      //   },
      // });
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      id="calculateur"
      className="relative overflow-hidden"
    >
      <TopWave
        className="absolute -top-1 z-1 w-[100vw] rotate-180"
        svgRef={topWaveSvgRef}
        pathRef={topWavePathRef}
      />
      <TopWave
        className="absolute -bottom-1 z-1 w-[100vw] rotate-0"
        svgRef={topWaveSvgRef}
        pathRef={topWavePathRef}
      />
      <DarkWave
        className="pointer-events-none absolute -right-[10%] h-full"
        pathRef={wavePathRef}
      />
      <div className="bg-indigo-dark py-space-2x px-section-padding flex h-[140vh] items-center justify-center">
        <div className="gap-space-2x p-space-base flex md:h-[80vh] max-w-full flex-1 flex-col rounded-4xl border-1 border-white/25 bg-white/10 backdrop-blur-lg md:max-w-4xl md:flex-row xl:max-w-5xl">
          <div className="gap-space-base flex flex-1 flex-col justify-center p-4">
            <h2 className="text-3xl text-white">
              <Heading splitType="words">
                {" "}
                Calculez le CA que vous perdez chaque mois{" "}
              </Heading>
            </h2>
            <p className="text-base text-neutral-200">
              <Heading splitType="lines">
                à cause des clients qui ne reviennent pas et faites une
                estimation rapide de
                <strong> ce que vous pourriez regagner</strong> si on travaille
                ensemble !
              </Heading>
            </p>
          </div>
          <div className="w-full rounded-2xl bg-white p-8 md:w-[55%]">
            <CalculatorCore />
          </div>
        </div>
      </div>
    </section>
  );
}
