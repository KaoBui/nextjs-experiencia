import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import FormCore from "@/components/components/FormCore";
import TransitionLink from "@/components/TransitionLink";
import {
  servicePages,
  serviceSlugs,
  type ServiceSlug,
} from "@/lib/service-pages";
import Arrow from "@/components/svg/Arrow";

type ServicePageProps = {
  params: Promise<{ slug: string }>;
};

function getService(slug: string) {
  if (!serviceSlugs.includes(slug as ServiceSlug)) {
    notFound();
  }

  return servicePages[slug as ServiceSlug];
}

export function generateStaticParams() {
  return serviceSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: ServicePageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = getService(slug);

  return {
    title: `${service.name} | Experiencia Consulting`,
    description: service.problem,
  };
}

function SectionLabel({
  children,
  color,
  light = false,
}: {
  children: React.ReactNode;
  color: string;
  light?: boolean;
}) {
  return (
    <p
      className={`text-sm font-semibold tracking-[0.18em] uppercase ${light ? "text-white/75" : ""}`}
      style={light ? undefined : { color }}
    >
      {children}
    </p>
  );
}

export default async function ServicePage({ params }: ServicePageProps) {
  const { slug } = await params;
  const service = getService(slug);

  return (
    <>
      <section className="px-section-padding overflow-hidden py-[18vh]">
        <header
          className="mx-site-margin grid gap-8 rounded-[2rem] border border-white/70 bg-white/70 p-8 shadow-[0_20px_80px_rgba(34,8,66,0.08)] backdrop-blur-md lg:grid-cols-[1.35fr_0.75fr]"
          style={{
            backgroundImage: `linear-gradient(135deg, color-mix(in srgb, ${service.color} 10%, white) 0%, rgba(255,255,255,0.82) 55%)`,
          }}
        >
          <div className="flex flex-col gap-6">
            <SectionLabel color={service.color}>{service.eyebrow}</SectionLabel>
            <h1 className="max-w-[11ch] text-5xl leading-[1.02] md:text-6xl">
              {service.name}
            </h1>
            <p className="text-secondary max-w-[56ch] text-lg leading-8">
              {service.problem}
            </p>
            <p className="text-secondary max-w-[62ch] text-base leading-7">
              {service.intro}
            </p>
            <div className="flex flex-wrap gap-4">
              <TransitionLink
                href="/contact"
                className="rounded-full px-5 py-3 text-sm font-semibold text-white transition hover:opacity-90"
                style={{ backgroundColor: service.color }}
              >
                Demarrer un echange
              </TransitionLink>
              <TransitionLink
                href="/#services"
                className="rounded-full border px-5 py-3 text-sm transition"
                style={{ borderColor: service.color, color: service.color }}
              >
                Retour aux offres
              </TransitionLink>
            </div>
          </div>

          <div className="flex items-center justify-center">
            <div
              className="flex h-44 w-44 items-center justify-center rounded-full bg-white"
              style={{
                boxShadow: `0 20px 60px color-mix(in srgb, ${service.color} 15%, rgba(34,8,66,0.08))`,
              }}
            >
              <Image
                src={service.icon}
                alt=""
                width={96}
                height={96}
                className="h-auto w-24"
              />
            </div>
          </div>
        </header>
      </section>
      <section
        id="signaux"
        className="px-section-padding overflow-hidden py-[18vh]"
      >
        <div className="mx-site-margin rounded-[2rem] p-8">
          <div className="flex max-w-[48ch] flex-col gap-2">
            <SectionLabel color={service.color}>symptomes</SectionLabel>
            <h2 className="text-4xl">
              3 signes qui montrent que vous devriez travailler le réachat
            </h2>
          </div>
          <div className="gap-space-4x mt-space-2x flex">
            {service.symptoms.map((item, index) => (
              <article key={item.title} className="rounded-[1.5rem]">
                <h2 className="text-md font-body">{item.title}</h2>
                <p className="text-secondary mt-3 text-sm leading-7">
                  {item.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section
        id="pourquoi"
        className="px-section-padding overflow-hidden py-[18vh]"
      >
        <div className="mx-site-margin flex flex-col items-center rounded-[2rem] p-8">
          <SectionLabel color={service.color}>objectifs</SectionLabel>
          <h2 className="pb-space-2x text-4xl">
            Pourquoi vous faire accompagner
          </h2>
          <div className="gap-space-base mt-6 grid grid-cols-10">
            {service.reasons.map((item, index) => (
              <article
                key={item.title}
                className="col-span-4 rounded-[1.5rem] border border-white/70 p-6"
                style={{
                  gridColumnStart: 2 + index * 2,
                  backgroundColor: `color-mix(in srgb, ${service.color} 2%, transparent)`,
                }}
              >
                <p
                  className="font-head pb-space-2x text-5xl"
                  style={{ color: service.color }}
                >{`0${index + 1}`}</p>
                <h2 className="text-md font-body">{item.title}</h2>
                <p className="text-secondary mt-3 text-sm leading-7">
                  {item.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section id="pourqui" className="mx-site-margin rounded-[2rem] p-8">
        <SectionLabel color={service.color}>Pour qui</SectionLabel>
        <h2 className="pb-space-2x text-4xl">
          Mon offre REACTIVER est faite pour vous
        </h2>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {service.whoFor.map((item) => (
            <div
              key={item}
              className="flex items-center justify-start gap-2 rounded-[1.5rem] border border-black/6 bg-white p-6 text-sm leading-7"
            >
              <div
                className="aspect-square h-12 w-12 rounded-full p-3"
                style={{ backgroundColor: service.color }}
              >
                <Arrow stroke="white" />
              </div>

              {item}
            </div>
          ))}
        </div>
      </section>
      <section className="px-section-padding bg-indigo-dark overflow-hidden py-[18vh]">
        <div className="mx-site-margin rounded-[2rem] border-1 border-white/25 bg-white/10 p-8 backdrop-blur-lg md:p-10">
          <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
            <div className="flex flex-col gap-6">
              <div>
                <SectionLabel color="" light={true}>
                  Comment ca se passe
                </SectionLabel>
                <h2 className="mt-4 max-w-[40ch] text-4xl leading-tight text-white">
                  Un cadre simple pour avancer sans alourdir vos equipes.
                </h2>
              </div>
              <div className="">
                {service.steps.map((step, index) => (
                  <div
                    key={step.title}
                    className="grid gap-3 rounded-[1.5rem] p-5 md:grid-cols-[56px_1fr]"
                  >
                    <p
                      className="font-head text-lg"
                      style={{ color: service.color }}
                    >
                      {`0${index + 1}`}
                    </p>
                    <div>
                      <h3 className="text-md font-body">{step.title}</h3>
                      <p className="text-secondary mt-2 text-sm leading-7">
                        {step.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-[1.75rem] border border-white/70 bg-white p-6 shadow-[0_20px_60px_rgba(34,8,66,0.08)]">
              <div className="pb-space-base">
                <h3 className="text-xl">{service.formTitle}</h3>
                <p className="text-xs">{service.formNote}</p>
              </div>
              <FormCore />
            </div>
          </div>
        </div>
      </section>
      <section className="mx-site-margin rounded-[2rem] border border-black/6 bg-white/80 p-8">
        <SectionLabel color={service.color}>Ce que vous obtenez</SectionLabel>
        <p className="text-secondary mt-4 max-w-[60ch] text-base leading-7">
          {service.outcomeIntro}
        </p>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {service.outcomes.map((item) => (
            <div
              key={item}
              className="rounded-[1.5rem] border border-black/6 bg-white p-6 text-sm leading-7"
            >
              {item}
            </div>
          ))}
        </div>
      </section>

      <section className="rounded-[2rem] border border-black/6 bg-white/80 p-8">
        <SectionLabel color={service.color}>FAQ</SectionLabel>
        <div className="mt-6 space-y-4">
          {service.faq.map((item) => (
            <article
              key={item.question}
              className="rounded-[1.5rem] border border-black/6 bg-white p-6"
            >
              <h2 className="text-2xl leading-tight">{item.question}</h2>
              <p className="text-secondary mt-3 max-w-[70ch] text-sm leading-7">
                {item.answer}
              </p>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
