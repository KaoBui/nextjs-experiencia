"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { ServicePageData } from "@/lib/service-pages";
import Heading from "@/components/components/Heading";

gsap.registerPlugin(useGSAP, ScrollTrigger);

function SectionLabel({
  children,
  color,
}: {
  children: React.ReactNode;
  color: string;
}) {
  return (
    <p
      className="text-sm font-semibold tracking-[0.18em] uppercase"
      style={{ color }}
    >
      {children}
    </p>
  );
}

type ServiceWhyProps = {
  service: ServicePageData;
};

type ReasonCardProps = {
  title: string;
  description: string;
  index: number;
  color: string;
  cardRef?: (element: HTMLArticleElement | null) => void;
};

function ReasonCard({
  title,
  description,
  index,
  color,
  cardRef,
}: ReasonCardProps) {
  return (
    <article
      ref={cardRef}
      className="p-space-base col-span-4 col-start-4 flex h-[50vh] min-h-[200px] flex-col justify-between rounded-[1.5rem] border border-white/70"
      style={{ backgroundColor: color }}
    >
      <p className="font-head text-5xl text-white/60">{`0${index + 1}`}</p>
      <div>
        <h2 className="font-body text-lg text-white">{title}</h2>
        <p className="mt-3 text-base leading-7 text-white/80">{description}</p>
      </div>
    </article>
  );
}

export default function ServiceWhy({ service }: ServiceWhyProps) {
  const sectionRef = useRef<HTMLElement | null>(null);
  const firstBlockRef = useRef<HTMLDivElement | null>(null);
  const titleRef = useRef<HTMLDivElement | null>(null);
  const firstCardRef = useRef<HTMLArticleElement | null>(null);
  const otherBlockRefs = useRef<(HTMLDivElement | null)[]>([]);
  const otherCardRefs = useRef<(HTMLArticleElement | null)[]>([]);

  useGSAP(
    () => {
      if (
        !sectionRef.current ||
        !firstBlockRef.current ||
        !firstCardRef.current
      ) {
        return;
      }

      const otherBlocks = otherBlockRefs.current.filter(
        Boolean,
      ) as HTMLDivElement[];
      const otherCards = otherCardRefs.current.filter(
        Boolean,
      ) as HTMLArticleElement[];
      const lastBlock = otherBlocks.at(-1) ?? firstBlockRef.current;

      if (titleRef.current) {
        sectionRef.current.style.setProperty(
          "--service-why-title-height",
          `${titleRef.current.offsetHeight}px`,
        );
      }

      gsap.fromTo(
        firstCardRef.current,
        { opacity: 0, filter: "blur(12px)", yPercent: 20 },
        {
          opacity: 1,
          filter: "blur(0px)",
          yPercent: 0,
          ease: "none",
          scrollTrigger: {
            trigger: firstCardRef.current,
            start: "top bottom",
            end: "50% bottom",
            scrub: true,
          },
        },
      );

      ScrollTrigger.create({
        trigger: firstBlockRef.current,
        start: "50% 50%",
        endTrigger: lastBlock,
        end: "50% 50%",
        pin: firstBlockRef.current,
        pinSpacing: false,
        anticipatePin: 1,
      });

      otherBlocks.forEach((block) => {
        ScrollTrigger.create({
          trigger: block,
          start: "50% 50%",
          endTrigger: lastBlock,
          end: "50% 50%",
          pin: block,
          pinSpacing: false,
          anticipatePin: 1,
        });
      });

      otherCards.forEach((card) => {
        gsap.fromTo(
          card,
          { opacity: 0, filter: "blur(12px)", yPercent: 20 },
          {
            opacity: 1,
            filter: "blur(0px)",
            yPercent: 0,
            ease: "none",
            scrollTrigger: {
              trigger: card,
              start: "top bottom",
              end: "50% bottom",
              scrub: true,
            },
          },
        );
      });
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      id="pourquoi"
      className="px-section-padding overflow-hidden py-[18vh]"
    >
      <div className="mx-site-margin flex flex-col items-center">
        <div
          ref={firstBlockRef}
          className="gap-space-base mt-6 grid w-full grid-cols-10"
        >
          <div
            ref={titleRef}
            className="col-span-10 flex flex-col items-center"
          >
            <SectionLabel color={service.color}>objectifs</SectionLabel>
            <h2 className="pb-space-2x text-4xl">
              <Heading splitType="words">
                Pourquoi vous faire accompagner
              </Heading>
            </h2>
          </div>
          <ReasonCard
            title={service.reasons[0].title}
            description={service.reasons[0].description}
            index={0}
            color={service.color}
            cardRef={(element) => {
              firstCardRef.current = element;
            }}
          />
        </div>

        {service.reasons.slice(1).map((item, index) => (
          <div
            key={item.title}
            ref={(element) => {
              otherBlockRefs.current[index] = element;
            }}
            className="gap-space-base mt-6 grid w-full grid-cols-10"
          >
            <div
              className="col-span-10"
              style={{ height: "var(--service-why-title-height, 0px)" }}
            />
            <ReasonCard
              title={item.title}
              description={item.description}
              index={index + 1}
              color={service.color}
              cardRef={(element) => {
                otherCardRefs.current[index] = element;
              }}
            />
          </div>
        ))}
      </div>
    </section>
  );
}
