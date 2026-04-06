import type { Metadata } from "next";
import { notFound } from "next/navigation";
import FormCore from "@/components/components/FormCore";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  servicePages,
  serviceSlugs,
  type ServiceSlug,
} from "@/lib/service-pages";
import { contactFaqs } from "@/lib/faqs";
import ServiceHeader from "./ServiceHeader";
import ServiceWhy from "./ServiceWhy";
import ServiceWhoFor from "./ServiceWhoFor";
import Heading from "@/components/components/Heading";
import Image from "next/image";
import Reasons from "@/components/section/Reasons";
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
      <ServiceHeader service={service} />
      <ServiceWhy service={service} />
      <ServiceWhoFor service={service} />
      <section
        id="form"
        className="px-section-padding bg-indigo-dark overflow-hidden py-[8vh]"
      >
        <div className="mx-site-margin rounded-[2rem] p-8 backdrop-blur-lg md:p-10">
          <div className="pb-space-2x flex flex-col items-center">
            <SectionLabel color="" light={true}>
              Comment ca se passe
            </SectionLabel>
            <h2 className="mt-4 max-w-[40ch] text-center text-4xl leading-tight text-white">
              <Heading>
                Dites-moi ce qui vous freine, <br /> je vous aide à le débloquer
              </Heading>
            </h2>
          </div>
          <div className="gap-space-4x grid lg:grid-cols-[0.9fr_1.1fr]">
            <div className="flex flex-col gap-0 justify-center">
              {service.steps.map((step, index) => (
                <div
                  key={step.title}
                  className="gap-space-base grid rounded-[1.5rem] p-5 md:grid-cols-[56px_1fr]"
                >
                  <div className="flex items-center">
                    <p className="font-head text-lg text-white">{`0${index + 1}.`}</p>
                  </div>
                  <div>
                    <h3 className="text-md font-body text-white">
                      {step.title}
                    </h3>
                    <p className="mt-2 text-sm leading-7 text-neutral-300">
                      {step.description}
                    </p>
                  </div>
                </div>
              ))}
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
      <Reasons />
      <section className="mx-site-margin py-[6vh]">
        <div className="gap-space-base mt-6 flex flex-col items-center">
          <SectionLabel color={service.color}>FAQ</SectionLabel>
          <div className="pb-space-2x max-w-[48ch]">
            <h2 className="text-center text-3xl leading-tight md:text-4xl">
              <Heading splitType="lines">
                {" "}
                Les questions les plus frequentes avant de prendre contact
              </Heading>
            </h2>
          </div>
          <div className="w-full max-w-2xl">
            <Accordion
              type="single"
              collapsible
              className="gap-space-base w-full"
            >
              {contactFaqs.map((item, index) => (
                <AccordionItem key={item.question} value={`item-${index}`}>
                  <AccordionTrigger className="text-primary font-body text-base hover:no-underline">
                    {item.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-secondary leading-body">
                    <p className="text-base">{item.answer}</p>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>
    </>
  );
}
