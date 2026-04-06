"use client";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import { DrawSVGPlugin } from "gsap/DrawSVGPlugin";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import HoverCard from "../components/HoverCard";
import Heading from "../components/Heading";
import LongWave from "../svg/LongWave";
import Image from "next/image";

gsap.registerPlugin(useGSAP, DrawSVGPlugin, ScrollTrigger);

export default function Reasons() {
  const reasonsRef = useRef<HTMLElement | null>(null);
  const rightColRef = useRef<HTMLDivElement | null>(null);
  const leftColRef = useRef<HTMLDivElement | null>(null);
  const wavePathRef = useRef<SVGPathElement | null>(null);

  useGSAP(
    () => {
      if (!reasonsRef.current || !leftColRef.current || !rightColRef.current) {
        return;
      }

      const drawTl = gsap.timeline({
        scrollTrigger: {
          trigger: reasonsRef.current,
          start: "top 50%",
          end: "bottom top",
          scrub: 1,
        },
      });

      drawTl
        .fromTo(
          wavePathRef.current,
          {
            drawSVG: "0% 0%",
          },
          {
            drawSVG: "0% 100%",
            duration: 1,
            ease: "none",
          },
        )
        .to(wavePathRef.current, {
          drawSVG: "100% 100%",
          duration: 1,
          ease: "none",
        });

      const mm = gsap.matchMedia();

      mm.add("(min-width: 768px)", () => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: reasonsRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        });

        tl.to(
          leftColRef.current,
          {
            yPercent: 150,
            ease: "power1.inOut",
          },
          0,
        );

        return () => {
          tl.scrollTrigger?.kill();
          tl.kill();
        };
      });

      return () => {
        mm.revert();
      };
    },
    { scope: reasonsRef },
  );

  return (
    <section ref={reasonsRef} id="reasons" className="relative my-[6vh] px-4">
      <LongWave
        className="pointer-events-none absolute -top-[10%] right-0 -z-10 w-full opacity-50"
        pathRef={wavePathRef}
      />
      <div className="mx-site-margin py-space-base gap-space-base flex grid-cols-12 flex-col md:grid">
        <div className="col-start-2 col-end-6">
          <div ref={leftColRef} className="gap-space-base flex flex-col">
            <h2 className="text-4xl">
              <Heading splitType="words">
                Pourquoi faire confiance à Experiencia ?
              </Heading>
            </h2>
            <p>
              <Heading className="text-base" splitType="lines">
                Il paraît que j'ai un 6ème sens pour comprendre vos clients.
                Mais j'ai surtout une méthode, une vision et un plan.{" "}
              </Heading>
            </p>
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-4">
                <div className="h-20 w-20 overflow-hidden rounded-full">
                  <Image src="/portrait.jpg" width={100} height={100} alt="" />
                </div>
                <div>
                  <p className="font-head text-xl">Eva Riccobene</p>
                  <p className="text-tertiary text-sm">
                    Experte en Fidelisation client
                  </p>
                </div>
              </div>
              <div className="flex items-end gap-2">
                <Image
                  src="mail-icon.svg"
                  width={50}
                  height={50}
                  alt=""
                  className="h-5 w-5"
                />
                <p className="text-primary text-base">
                  eva.experiencia@gmail.com
                </p>
              </div>
              <div className="flex items-end gap-2">
                <Image
                  src="phone-icon.svg"
                  width={50}
                  height={50}
                  alt=""
                  className="h-5 w-5"
                />
                <p className="text-primary text-base">06 06 66 60 52</p>
              </div>
              <p className="text-secondary text-sm">
                Disponible en distanciel ou presentiel sur demande
              </p>
            </div>
          </div>
        </div>
        <div
          ref={rightColRef}
          className="gap-space-base pb-space-2x col-start-7 col-end-12 row-start-2 flex"
        >
          <div className="gap-space-base flex flex-1 flex-col">
            <HoverCard
              heading="Une expertise dédiée à la fidélisation depuis plus de 10 ans"
              description="La fidélisation n'est pas une compétence annexe, c’est le cœur de mon
          métier. Mon travail a été reconnu au niveau national pour la précision
          de mes analyses et la mesurabilité des résultats obtenus."
              color="var(--color-indigo)"
            />
            <HoverCard
              heading="Une approche 100% sur mesure"
              description="Description masquée pour l'instant."
              color="var(--color-indigo)"
            />
          </div>
          <div className="gap-space-base pt-space-2x flex flex-1 flex-col">
            <HoverCard
              heading="Une expertise dédiée à la fidélisation depuis plus de 10 ans"
              description="Description masquée pour l'instant."
              color="var(--color-indigo)"
            />
            <HoverCard
              heading="Une vision stratégique orientée solutions"
              description="Description masquée pour l'instant."
              color="var(--color-indigo)"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
