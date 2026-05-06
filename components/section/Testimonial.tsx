"use client";
import Image from "next/image";
import { useRef, useState } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import Heading from "../components/Heading";
import TestimonialCard from "../components/TestimonialCard";

const clientLogos = [
  { src: "/azuvera.png", alt: "Logo Azuvera" },
  { src: "/la-boucherie.png", alt: "Logo La Boucherie" },
  { src: "/mabeo.png", alt: "Logo Mabeo" },
  { src: "/martin-belaysoud.png", alt: "Logo Martin Belaysoud" },
  { src: "/meal-canteen.png", alt: "Logo Meal Canteen" },
  { src: "/originals.png", alt: "Logo Originals" },
  { src: "/reivilo.png", alt: "Logo Reivilo" },
  { src: "/seb.png", alt: "Logo Seb" },
];

const testimonials = [
  {
    name: "Sophie Martin",
    title: "Dirigeante de cabinet de conseil",
    score: 5,
    image: "/client-photo.jpg",
    feedback:
      "Nous avions un bon chiffre d'affaires, mais une forte instabilité client. Nous pensions que c'était « normal » dans notre secteur. Experiencia nous a permis d'identifier les points de friction invisibles dans notre parcours client. En 3 mois, notre taux de rétention a augmenté de 18 %.",
  },
  {
    name: "Sophie Martin",
    title: "Dirigeante de cabinet de conseil",
    score: 4,
    image: "/client-photo.jpg",
    feedback:
      "Nous avions un bon chiffre d'affaires, mais une forte instabilité client. Nous pensions que c'était « normal » dans notre secteur. Experiencia nous a permis d'identifier les points de friction invisibles dans notre parcours client. En 3 mois, notre taux de rétention a augmenté de 18 %.",
  },
];

export default function Testimonials() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const carouselRef = useRef<HTMLDivElement | null>(null);
  const cardWrapperRef = useRef<HTMLDivElement | null>(null);
  const [current, setCurrent] = useState(0);
  const isAnimating = useRef(false);

  useGSAP(
    () => {
      if (!sectionRef.current || !carouselRef.current) return;

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
        .from(carouselRef.current, {
          yPercent: 100,
          opacity: 0,
          filter: "blur(12px)",
          ease: "power2.inOut",
        });
    },
    { scope: sectionRef },
  );

  function navigate(nextIndex: number) {
    if (isAnimating.current || !cardWrapperRef.current) return;
    const direction = nextIndex > current ? 1 : -1;
    isAnimating.current = true;

    gsap.to(cardWrapperRef.current, {
      x: direction * -60,
      opacity: 0,
      duration: 0.25,
      ease: "power2.in",
      onComplete: () => {
        setCurrent(nextIndex);
        gsap.fromTo(
          cardWrapperRef.current,
          { x: direction * 60, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 0.3,
            ease: "power2.out",
            onComplete: () => {
              isAnimating.current = false;
            },
          },
        );
      },
    });
  }

  const prev = () =>
    navigate((current - 1 + testimonials.length) % testimonials.length);
  const next = () => navigate((current + 1) % testimonials.length);

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
          <div
            ref={carouselRef}
            className="z-1 flex flex-col items-center gap-4"
          >
            <div ref={cardWrapperRef}>
              <TestimonialCard
                name={testimonials[current].name}
                title={testimonials[current].title}
                score={testimonials[current].score}
                image={testimonials[current].image}
                feedback={testimonials[current].feedback}
              />
            </div>
            {testimonials.length > 1 && (
              <div className="flex items-center gap-3">
                <button
                  onClick={prev}
                  aria-label="Précédent"
                  className="text-primary/40 hover:text-primary transition-colors duration-200"
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    className="h-5 w-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 19l-7-7 7-7"
                    />
                  </svg>
                </button>
                {testimonials.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => navigate(i)}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      i === current ? "bg-primary w-6" : "bg-primary/30 w-2"
                    }`}
                    aria-label={`Témoignage ${i + 1}`}
                  />
                ))}
                <button
                  onClick={next}
                  aria-label="Suivant"
                  className="text-primary/40 hover:text-primary transition-colors duration-200"
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    className="h-5 w-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </button>
              </div>
            )}
          </div>
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
