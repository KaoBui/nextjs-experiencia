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
          <p className="text-md pb-2">Vous sentez que ça coince?</p>
          <h2>
            <Heading className="text-tertiary text-4xl" splitType="lines">
              Je vous montre
              <span className="text-primary">
                <em> où, pourquoi et comment y remédier</em>
              </span>
            </Heading>
          </h2>
          <p className="pt-space-base text-base">
            <Heading className="" splitType="lines">
              Aucune entreprise n'est identique et par conséquent aucune
              stratégie de fidélisation ne devrait l'être.
            </Heading>
            <Heading className="" splitType="lines">
              Ce que je vous propose c'est une solution sur mesure, adaptée à
              vos problématiques pour stopper l'hémorragie et accélérer votre
              croissance.
            </Heading>
          </p>
        </div>
        <div className="col-start-5 col-end-9">
          <ServiceCard
            imgSrc="/reactiver-icon.svg"
            offerName="Réactiver"
            description="Vous galérez à créer du réachat"
            href=""
            cardColor="var(--color-indigo)"
          />
        </div>
        <div className="col-start-9 col-end-13">
          <ServiceCard
            imgSrc="/captiver-icon.svg"
            offerName="Captiver"
            description="Vous perdez des clients"
            href=""
            cardColor="var(--color-lila)"
          />
        </div>
        <div className="col-start-1 col-end-5">
          <ServiceCard
            imgSrc="/fideliser-icon.svg"
            offerName="Fidéliser"
            description="Vous avez une carte de fidélité mais pas de stratégie structurée"
            href=""
            cardColor="var(--color-mauve)"
          />
        </div>
        <div className="col-start-5 col-end-9">
          <ServiceCard
            imgSrc="/piloter-icon.svg"
            offerName="Piloter"
            description="Vous voulez bâtir ou affiner votre plan de fidélisation vous-même"
            href=""
            cardColor="var(--color-jaune)"
          />
        </div>
      </div>
    </section>
  );
}
