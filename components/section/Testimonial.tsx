"use client";
import Image from "next/image";
import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import Heading from "../components/Heading";
import TestimonialCard from "../components/TestimonialCard";

const clientLogos = [
  {
    src: "/azuvera.png",
    alt: "Logo Azuvera",
  },
  {
    src: "/la-boucherie.png",
    alt: "Logo La Boucherie",
  },
  {
    src: "/mabeo.png",
    alt: "Logo Mabeo",
  },
  {
    src: "/martin-belaysoud.png",
    alt: "Logo Martin Belaysoud",
  },
  {
    src: "/meal-canteen.png",
    alt: "Logo Meal Canteen",
  },
  {
    src: "/originals.png",
    alt: "Logo Originals",
  },
  {
    src: "/reivilo.png",
    alt: "Logo Reivilo",
  },
  {
    src: "/seb.png",
    alt: "Logo Seb",
  },
];

export default function Testimonials() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const cardRef = useRef<HTMLDivElement | null>(null);

  useGSAP(
    () => {
      if (!sectionRef.current || !cardRef.current) {
        return;
      }

      gsap
        .timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "50% 50%",
            end: "+=100%",
            pin: true,
            scrub: true,
          },
        })
        .from(cardRef.current, {
          yPercent: 100,
          opacity: 0,
          filter: "blur(12px)",
          ease: "power2.inOut",
        });
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden px-4 py-[15vh]"
    >
      <div className="mx-site-margin gap-space-2x flex flex-col items-center justify-center">
        <h1 className="max-w-[20ch] text-center text-4xl">
          <Heading splitType="words">
            Ils ont transformé leur performance
          </Heading>
        </h1>
        <div className="relative flex w-full justify-center">
          <TestimonialCard
            ref={cardRef}
            name="Sophie Martin"
            title="Dirigeante de cabinet de conseil"
            score={5}
            image="/client-photo.jpg"
            feedback="Nous avions un bon chiffre d’affaires, mais une forte instabilité client. Nous pensions que c’était « normal » dans notre secteur. Experiencia nous a permis d’identifier les points de friction invisibles dans notre parcours client. En 3 mois, notre taux de rétention a augmenté de 18 %."
          />
          <div className="gap-space-2x absolute top-1/2 flex -translate-y-1/2 items-center justify-between opacity-25">
            {clientLogos.map((logo) => (
              <div
                key={logo.src}
                className="flex h-16 w-32 items-center justify-center"
              >
                <Image
                  src={logo.src}
                  alt={logo.alt}
                  width={128}
                  height={64}
                  className="h-full w-full object-contain"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
