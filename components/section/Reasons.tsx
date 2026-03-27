"use client";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import HoverCard from "../components/HoverCard";
import ReasonsWave from "../svg/ReasonsWave";
import Heading from "../components/Heading";

export default function Reasons() {
  const reasonsRef = useRef<HTMLDivElement | null>(null);
  const rightColRef = useRef<HTMLDivElement | null>(null);
  const leftColRef = useRef<HTMLDivElement | null>(null);
  const wavePathRef = useRef<SVGPathElement | null>(null);

  useGSAP(
    () => {
      if (
        !reasonsRef.current ||
        !leftColRef.current ||
        !rightColRef.current ||
        !wavePathRef.current
      ) {
        return;
      }

      gsap.fromTo(
        wavePathRef.current,
        {
          drawSVG: "0% 0%",
        },
        {
          drawSVG: "0% 100%",
          duration: 2,
          ease: "power3.inOut",
          scrollTrigger: {
            trigger: reasonsRef.current,
            start: "top top",
          },
        },
      );
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: reasonsRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });
      tl.to(wavePathRef.current, {
        yPercent: 50,
      }).to(
        leftColRef.current,
        {
          yPercent: 200,
          ease: "power1.inOut",
        },
        0,
      );
      // ScrollTrigger.create({
      //   trigger: leftColRef.current,
      //   start: "50% 50%",
      //   pin: leftColRef.current,
      //   endTrigger: rightColRef.current,
      //   end: "bottom bottom",
      //   scrub: true,
      //   pinSpacing: false,
      // });
    },
    { scope: reasonsRef },
  );

  return (
    <section ref={reasonsRef} id="reasons" className="relative my-[15vh] px-4">
      <ReasonsWave
        pathRef={wavePathRef}
        className="pointer-events-none absolute -top-[10%] right-0 -z-10 hidden h-full w-full"
      />
      <div className="mx-site-margin space-gap-base grid grid-cols-12">
        <div className="col-start-1 col-end-5">
          <div ref={leftColRef} className="gap-space-base flex flex-col">
            <h2 className="text-3xl">
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
          </div>
        </div>
        <div
          ref={rightColRef}
          className="gap-space-base pb-space-2x col-start-7 col-end-13 row-start-2 flex"
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
