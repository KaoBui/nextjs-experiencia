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

export default function Hero() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const heroRef = useRef<HTMLDivElement | null>(null);
  const aboutRef = useRef<HTMLDivElement | null>(null);
  const rightColRef = useRef<HTMLDivElement | null>(null);
  const leftColRef = useRef<HTMLDivElement | null>(null);
  const portraitRef = useRef<HTMLDivElement | null>(null);

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
        className="px-section-padding relative isolate h-screen py-4"
      >
        <div className="bg-indigo/5 gap-space-base p-site-margin relative flex grid h-full grid-cols-12 rounded-4xl border-1 border-white backdrop-blur-md">
          <div
            ref={leftColRef}
            className="gap-space-2x col-start-1 col-end-8 flex h-full flex-col justify-end"
          >
            <div>
              <div className="gap-space-sm flex w-fit items-center rounded-full bg-white/50 p-2 px-3">
                <div className="bg-indigo h-1 w-1 rounded-full"></div>
                <p className="text-xs uppercase">
                  disponibilité - <strong>mai 2026</strong>
                </p>
              </div>
              <h1 className="text-6xl leading-[1.1]">
                Augmentez votre chiffre d&apos;affaires
                <span className="text-indigo">
                  <em> sans vous épuiser </em>
                </span>
                à courir après des clients
              </h1>
            </div>
            <p className="max-w-[56ch] text-base">
              Grâce à des stratégies de fidélisation structurées et mesurables,
              nous aidons les TPE et PME à maximiser la valeur de chaque client
              et à sécuriser leur croissance.
            </p>
            <div className="flex gap-4">
              <TransitionLink
                href="#calculateur"
                className="text-indigo border-indigo hover:bg-indigo/5 flex items-center rounded-full border px-5 py-3 text-base transition"
              >
                Calculer mon CA perdu
              </TransitionLink>
              <Button href="/contact">Prendre rendez-vous</Button>
            </div>
          </div>
          <div
            ref={rightColRef}
            className="px-space-3x absolute relative inset-0 col-start-9 col-end-13 flex items-end justify-center"
          >
            <StatLabel
              className="charts absolute bottom-1/4 left-0 rotate-2"
              label="Croissance"
              stat="+52%"
            />
            <StatLabel
              className="charts absolute top-1/3 left-1/2 rotate-5"
              label="Croissance"
              stat="+42%"
            />
            <Graph className="charts absolute bottom-1/2 -left-6 h-30 w-30 -rotate-4" />
            <NumberBlock className="charts absolute bottom-4 -left-4 -rotate-4 gap-4" />
            <div
              ref={portraitRef}
              className="-z-1 aspect-4/5 h-auto w-full max-w-3xl overflow-hidden rounded-3xl border-1 border-white bg-violet-50 p-2"
            >
              <Image
                src="/portrait.jpg"
                width={1000}
                height={1000}
                alt=""
                className="h-full w-full rounded-2xl object-cover"
                loading="eager"
              />
            </div>
          </div>
        </div>
      </div>
      <div ref={aboutRef} className="mx-section-padding h-screen">
        <div className="mx-site-margin gap-space-base grid h-full grid-cols-12">
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
