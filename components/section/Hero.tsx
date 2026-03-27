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

      gsap.fromTo(
        "path",
        { drawSVG: "0% 0%" },
        {
          drawSVG: "0% 100%",
          duration: 1.6,
          ease: "power3.inOut",
        },
      );

      gsap.fromTo(
        "path",
        { drawSVG: "0% 100%" },
        {
          drawSVG: "100% 100%",
          duration: 1.2,
          ease: "power3.inOut",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "50% top",
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
          pin: rightColRef.current,
          pinSpacing: false,
        },
      });
      tl.to(leftColRef.current, {
        opacity: 0,
        filter: "blur(16px)",
      }).to(
        portraitRef.current,
        {
          scale: 1.2,
          transformOrigin: "right bottom",
        },
        0,
      );
    },
    { scope: containerRef },
  );

  return (
    <section ref={containerRef}>
      <HeaderWave className="pointer-events-none fixed top-0 right-0 h-auto w-[42rem]" />
      <div ref={heroRef} className="relative isolate h-screen py-4">
        <div
          ref={leftColRef}
          className="bg-indigo/5 gap-space-base p-site-margin relative z-1 mx-4 flex grid h-full grid-cols-12 rounded-4xl border-1 border-white backdrop-blur-md"
        >
          <div className="gap-space-base col-start-1 col-end-8 flex h-full flex-col justify-end">
            <div className="gap-space-sm flex w-fit items-center rounded-full bg-white p-2 px-4">
              <div className="bg-indigo h-1 w-1 rounded-full"></div>
              <p className="text-xs uppercase">
                disponibilité - <strong>mai 2026</strong>
              </p>
            </div>
            <h1 className="text-5xl leading-[1.1]">
              Augmentez votre chiffre d'affaires
              <span className="text-indigo">
                <em> sans vous épuiser </em>
              </span>
              à courir après plus de clients
            </h1>
            <p className="text-sm">
              Grâce à des stratégies de fidélisation structurées et mesurables,
              nous aidons les TPE et PME à maximiser la valeur de chaque client
              et à sécuriser leur croissance.
            </p>
            <div className="pt-space-base flex gap-4">
              <div className="border-indigo rounded-full border p-2 px-4">
                <p className="text-indigo text-base">Calculer mon CA perdu</p>
              </div>
              <div className="bg-indigo border-indigo rounded-full border p-2 px-4">
                <p className="text-base text-white">Prendre rendez-vous</p>
              </div>
            </div>
          </div>
        </div>
        <div className="gap-space-base p-site-margin absolute inset-0 z-2 m-4 grid grid-cols-12">
          <div
            ref={rightColRef}
            className="relative col-start-10 col-end-13 flex items-end"
          >
            <StatLabel
              className="charts absolute bottom-1/4 -left-1/4 rotate-5"
              label="Croissance"
              stat="+42%"
            />
            <StatLabel
              className="charts absolute top-1/3 left-1/2 rotate-5"
              label="Croissance"
              stat="+42%"
            />
            <Graph className="charts absolute top-1/4 -left-12 h-30 w-30 -rotate-4" />
            <NumberBlock className="charts absolute bottom-4 -left-12 w-1/2 -rotate-4 gap-4" />
            <div
              ref={portraitRef}
              className="-z-1 aspect-4/5 h-auto w-full overflow-hidden rounded-3xl border-1 border-white bg-violet-50 p-2"
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
      <div ref={aboutRef} className="mx-4 h-screen">
        <div className="mx-site-margin gap-space-base grid h-full grid-cols-12">
          <div className="gap-space-base col-start-1 col-end-7 flex flex-col items-start justify-center">
            <h2 className="">
              <Heading className="text-secondary text-4xl" splitType="words">
                À propos de{" "}
                <span className="text-primary">
                  <em>moi</em>
                </span>
              </Heading>
            </h2>

            <p className="leading-body text-base">
              <Heading splitType="lines">
                Bonjour, je suis Eva, fondatrice d&apos;Experiencia Consulting.
              </Heading>
              <Heading splitType="lines">
                J&apos;aide les TPE et PME à être plus rentables en améliorant
                leur expérience client et leur stratégie de fidélisation .
              </Heading>
            </p>
            <div className="border-indigo rounded-full border p-2 px-4">
              <p className="text-indigo text-base">En savoir plus</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
