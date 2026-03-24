"use client";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { DrawSVGPlugin } from "gsap/DrawSVGPlugin";
import Image from "next/image";
import HeaderWave from "@/components/svg/HeaderWave";

gsap.registerPlugin(useGSAP, DrawSVGPlugin);

export default function Hero() {
  const heroRef = useRef<HTMLElement | null>(null);

  useGSAP(
    () => {
      gsap.fromTo(
        "path",
        { drawSVG: "0% 0%" },
        {
          drawSVG: "0% 100%",
          duration: 1.6,
          ease: "power3.inOut",
        },
      );
    },
    { scope: heroRef },
  );

  return (
    <>
      <section ref={heroRef} className="relative isolate h-screen py-4">
        <HeaderWave className="pointer-events-none absolute top-0 right-0 -z-10 h-auto w-[42rem]" />
        <div className="relative z-10 mx-4 bg-indigo/5 backdrop-blur-md border-white border-1 h-full rounded-4xl flex grid grid-cols-12 gap-space-base p-site-margin">
          <div className="col-start-1 col-end-7 flex flex-col h-full justify-end gap-space-2x ">
            <div className="w-fit p-2 px-4 rounded-full bg-white flex items-center gap-space-sm">
              <div className="w-1 h-1 bg-indigo rounded-full"></div>
              <p className="uppercase text-xs">
                disponibilité - <strong>mai 2026</strong>
              </p>
            </div>
            <h1 className="text-4xl">
              Augmentez votre chiffre d'affaires
              <span className="text-indigo">
                <em> sans vous épuiser</em>
              </span>{" "}
              à courir après plus de clients
            </h1>
            <p className="text-sm">
              Grâce à des stratégies de fidélisation structurées et mesurables,
              nous aidons les TPE et PME à maximiser la valeur de chaque client
              et à sécuriser leur croissance.
            </p>
            <div className="flex gap-4">
              <div className="p-2 px-4 rounded-full border-indigo border">
                <p className="text-indigo text-base">Calculer mon CA perdu</p>
              </div>
              <div className="p-2 px-4 rounded-full bg-indigo border-indigo border">
                <p className="text-white text-base">Prendre rendez-vous</p>
              </div>
            </div>
          </div>
          <div className="col-start-9 col-end-13 flex items-end p-6">
            <div className="aspect-square w-full h-auto overflow-hidden rounded-3xl border-1 border-white p-2 bg-indigo-100">
              <Image
                src="/portrait.jpg"
                width={1000}
                height={1000}
                alt=""
                className="object-cover w-full h-full rounded-2xl"
              />
            </div>
          </div>
        </div>
      </section>
      <section className="h-screen mx-4">
        <div className="mx-site-margin h-full grid grid-cols-12 gap-space-base">
          <div className="col-start-1 col-end-7 flex flex-col justify-center items-start gap-space-base">
            <h2 className="text-3xl">Bonjour,</h2>
            <p>
              Bonjour, je suis Eva, fondatrice d’Experiencia Consulting. J’aide
              les TPE et PME à être plus rentables en améliorant leur expérience
              client et leur stratégie de fidélisation .
            </p>
            <div className="p-2 px-4 rounded-full border-indigo border">
              <p className="text-indigo text-base">En savoir plus</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
