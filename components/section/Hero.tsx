"use client";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { DrawSVGPlugin } from "gsap/DrawSVGPlugin";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import HeaderWave from "@/components/svg/HeaderWave";
import StatLabel from "../components/StatLabel";
import Heading from "../components/Heading";
import Graph from "../components/Graph";
import NumberBlock from "../components/NumberBlock";
import Button from "../components/Button";
import TransitionLink from "@/components/TransitionLink";

gsap.registerPlugin(useGSAP, DrawSVGPlugin, ScrollTrigger);

type HeroProps = {
  title?: string | null;
  subtitle?: string | null;
  availability?: string | null;
  heroImageUrl?: string | null;
  heroImageAlt?: string | null;
  heroImageWidth?: number;
  heroImageHeight?: number;
};

const fallbackTitle =
  "Augmentez votre chiffre d'affaires sans vous épuiser à courir après des clients";
const fallbackSubtitle =
  "Grâce à des stratégies de fidélisation structurées et mesurables, nous aidons les TPE et PME à maximiser la valeur de chaque client et à sécuriser leur croissance.";

export default function Hero({
  title,
  subtitle,
  availability,
  heroImageUrl,
  heroImageAlt,
  heroImageWidth = 1000,
  heroImageHeight = 1250,
}: HeroProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const heroRef = useRef<HTMLDivElement | null>(null);
  const aboutRef = useRef<HTMLDivElement | null>(null);
  const rightColRef = useRef<HTMLDivElement | null>(null);
  const leftColRef = useRef<HTMLDivElement | null>(null);
  const portraitRef = useRef<HTMLDivElement | null>(null);
  const heroTitle = title ?? fallbackTitle;
  const heroSubtitle = subtitle ?? fallbackSubtitle;
  const availabilityText = availability ?? "Mai 2026";

  useGSAP(
    () => {
      const charts = gsap.utils.toArray<HTMLElement>(".charts");
      const heroPaths = gsap.utils.toArray<SVGPathElement>(".header-wave-path");

      gsap.fromTo(
        heroPaths,
        { drawSVG: "0% 0%" },
        {
          drawSVG: "0% 100%",
          duration: 1.6,
          ease: "power3.inOut",
        },
      );

      gsap.fromTo(
        heroPaths,
        { drawSVG: "0% 100%" },
        {
          drawSVG: "100% 100%",
          duration: 0.8,
          ease: "power1.inOut",
          scrollTrigger: {
            trigger: aboutRef.current,
            start: "bottom bottom",
            end: "bottom top",
            scrub: true,
            toggleActions: "play none none reverse",
          },
        },
      );

      if (!heroRef.current || !aboutRef.current || !portraitRef.current) {
        return;
      }

      gsap.to(charts, {
        scale: 0,
        duration: 0.5,
        ease: "back.in(1.4)",
        transformOrigin: "center center",
        scrollTrigger: {
          trigger: heroRef.current,
          start: "bottom 85%",
          toggleActions: "play none none reverse",
        },
      });

      const mm = gsap.matchMedia();

      mm.add("(min-width: 768px)", () => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: heroRef.current,
            start: "top top",
            end: "bottom top",
            scrub: true,
            pin: heroRef.current,
            pinSpacing: false,
          },
        });

        tl.to(leftColRef.current, {
          opacity: 0,
          filter: "blur(16px)",
        }).to(
          portraitRef.current,
          {
            yPercent: -15,
            ease: "none",
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
    { scope: containerRef },
  );

  return (
    <section ref={containerRef}>
      <HeaderWave
        className="pointer-events-none fixed top-0 right-0 h-auto w-1/2"
        pathClassName="header-wave-path"
      />
      <div
        ref={heroRef}
        className="px-section-padding relative isolate py-4 md:h-screen"
      >
        <div className="bg-indigo/5 gap-space-base p-site-margin relative flex h-full grid-cols-12 flex-col rounded-4xl border-1 border-white backdrop-blur-md md:grid">
          <div
            ref={leftColRef}
            className="gap-space-2x col-start-1 col-end-8 flex h-[90svh] flex-col justify-end md:h-full md:pt-0"
          >
            <div>
              <div className="gap-space-sm mb-2 flex w-fit items-center rounded-full bg-white/50 p-2 px-3">
                <div className="bg-indigo h-1 w-1 rounded-full"></div>
                <p className="text-xs uppercase">
                  disponibilité - <strong>{availabilityText}</strong>
                </p>
              </div>
              <h1 className="text-6xl leading-[1.1]">{heroTitle}</h1>
            </div>
            <p className="max-w-[56ch] text-base">{heroSubtitle}</p>
            <div className="flex flex-col items-start gap-4 md:flex-row">
              <TransitionLink
                href="#calculateur"
                className="text-indigo border-indigo hover:bg-indigo/5 flex items-center rounded-full border px-5 py-3 text-sm transition md:text-base"
              >
                Calculer mon CA perdu
              </TransitionLink>
              <Button href="/contact">Prendre rendez-vous</Button>
            </div>
          </div>
          <div
            ref={rightColRef}
            className="md:px-space-3x pt-space-3x relative col-start-9 col-end-13 flex items-end justify-center"
          >
            <StatLabel
              className="charts absolute bottom-1/4 left-0 hidden rotate-2 md:flex"
              label="Croissance"
              stat="+52%"
            />
            <StatLabel
              className="charts absolute top-1/3 left-1/2 hidden rotate-5 md:flex"
              label="Croissance"
              stat="+42%"
            />
            <Graph className="charts absolute top-0 left-0 hidden h-30 w-30 rotate-0 md:top-1/3 md:-left-6 md:flex md:-rotate-4 2xl:top-1/2" />
            <NumberBlock className="charts absolute bottom-0 left-0 hidden rotate-0 gap-4 md:bottom-4 md:-left-4 md:flex md:-rotate-4" />
            <div
              ref={portraitRef}
              className="-z-1 aspect-4/5 h-auto w-1/2 max-w-3xl overflow-hidden rounded-3xl border-1 border-white bg-violet-50 p-2 md:w-full"
            >
              <Image
                src={heroImageUrl ?? "/portrait.jpg"}
                width={heroImageWidth}
                height={heroImageHeight}
                alt={heroImageAlt ?? ""}
                className="h-full w-full rounded-2xl object-cover"
                loading="eager"
              />
            </div>
          </div>
        </div>
      </div>
      <div ref={aboutRef} className="mx-section-padding h-[50svh] md:h-screen">
        <div className="mx-site-margin gap-space-base flex h-full grid-cols-12 md:grid">
          <div className="gap-space-2x col-start-1 col-end-7 flex flex-col items-start justify-center">
            <h2 className="">
              <Heading className="text-primary text-4xl" splitType="lines">
                À propos de <em>moi</em>
              </Heading>
            </h2>
            <p className="leading-body text-md flex flex-col gap-2">
              <Heading splitType="lines">
                Bonjour, je suis Eva, fondatrice d&apos;Experiencia Consulting.
              </Heading>
              <Heading splitType="lines">
                J&apos;aide les TPE et PME à être plus rentables en améliorant
                leur expérience client et leur stratégie de fidélisation .
              </Heading>
            </p>

            <TransitionLink
              href="/a-propos"
              className="text-indigo border-indigo hover:bg-indigo/5 z-2 flex items-center rounded-full border px-5 py-3 text-base transition"
            >
              En savoir plus
            </TransitionLink>
          </div>
        </div>
      </div>
    </section>
  );
}
