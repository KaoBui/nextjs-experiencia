"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { DrawSVGPlugin } from "gsap/DrawSVGPlugin";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ServiceWave from "../svg/ServiceWave";
import ServiceCard from "../components/ServiceCard";
import Heading from "../components/Heading";

gsap.registerPlugin(useGSAP, DrawSVGPlugin, ScrollTrigger);

export default function Services() {
  const servicesRef = useRef<HTMLElement | null>(null);

  useGSAP(
    () => {
      if (!servicesRef.current) {
        return;
      }

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: servicesRef.current,
          start: "top top",
          end: "bottom 30%",
          scrub: 1,
        },
      });

      tl.fromTo(
        ".service-wave__path",
        { drawSVG: "0% 0%" },
        {
          drawSVG: "0% 100%",
          duration: 1,
          ease: "none",
        },
      ).to(".service-wave__path", {
        drawSVG: "100% 100%",
        duration: 1,
        ease: "none",
      });
    },
    { scope: servicesRef },
  );

  return (
    <section
      ref={servicesRef}
      id="services"
      className="px-section-padding relative mb-[10vh] py-[15vh]"
    >
      <ServiceWave className="pointer-events-none absolute top-0 right-0 -z-10 h-full w-auto" />
      <div className="mx-site-margin gap-space-2x grid grid-cols-12">
        <div className="pb-space-2x col-start-1 col-end-7 flex flex-col items-start">
          <p className="text-md pb-2">Vous sentez que ca coince?</p>
          <h2>
            <Heading className="text-tertiary text-4xl" splitType="lines">
              Je vous montre
              <span className="text-primary">
                <em> ou, pourquoi et comment y remedier</em>
              </span>
            </Heading>
          </h2>
          <p className="pt-space-base text-base">
            <Heading className="" splitType="lines">
              Aucune entreprise n&apos;est identique et par consequent aucune
              strategie de fidelisation ne devrait l&apos;etre.
            </Heading>
            <Heading className="" splitType="lines">
              Ce que je vous propose c&apos;est une solution sur mesure, adaptee
              a vos problematiques pour stopper l&apos;hemorragie et accelerer
              votre croissance.
            </Heading>
          </p>
        </div>
        <div className="col-start-5 col-end-9">
          <ServiceCard
            imgSrc="/reactiver-icon.svg"
            offerName="Reactiver"
            description="Vous galerez a creer du reachat"
            href="/reactiver"
            cardColor="var(--color-indigo)"
          />
        </div>
        <div className="col-start-9 col-end-13">
          <ServiceCard
            imgSrc="/captiver-icon.svg"
            offerName="Captiver"
            description="Vous perdez des clients"
            href="/captiver"
            cardColor="var(--color-lila)"
          />
        </div>
        <div className="col-start-1 col-end-5">
          <ServiceCard
            imgSrc="/fideliser-icon.svg"
            offerName="Fideliser"
            description="Vous avez une carte de fidelite mais pas de strategie structuree"
            href="/fideliser"
            cardColor="var(--color-mauve)"
          />
        </div>
        <div className="col-start-5 col-end-9">
          <ServiceCard
            imgSrc="/piloter-icon.svg"
            offerName="Piloter"
            description="Vous voulez batir ou affiner votre plan de fidelisation vous-meme"
            href="/piloter"
            cardColor="var(--color-jaune)"
          />
        </div>
      </div>
    </section>
  );
}
