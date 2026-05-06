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
import BasicButton from "@/components/components/BasicButton";
import Reasons from "@/components/section/Reasons";
import TopWave from "@/components/svg/TopWave";
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
      <section
        id="form"
        className="px-section-padding bg-indigo-dark relative border-b border-white py-[15vh]"
      >
        <TopWave className="absolute -top-1 left-0 z-1 w-[110vw] rotate-180" />
        <TopWave className="absolute -bottom-1 left-0 z-1 w-[110vw] rotate-0" />
        <div className="mx-site-margin flex min-h-screen flex-col items-center justify-center rounded-[2rem] p-8 backdrop-blur-lg md:p-10">
          <div className="pb-space-2x flex flex-col items-center">
            <SectionLabel color="" light={true}>
              Comment ca se passe
            </SectionLabel>
            <h2 className="mt-4 max-w-[36ch] text-center text-4xl leading-tight text-white">
              <Heading>
                si je vous aide à augmenter la fréquence d'achat de vos clients
              </Heading>
            </h2>
          </div>
          <div className="gap-space-2x px-space-4x flex w-full justify-center">
            <div className="relative max-w-xl flex-1">
              <Image
                src="/comment-ca-se-passe.png"
                fill
                className="rounded-xl object-cover"
                alt="Comment ca se passe"
              />
            </div>
            <div className="flex max-w-xl flex-1 flex-col gap-0">
              {service.steps.map((step, index) => (
                <div
                  key={step.title}
                  className="p-space-base flex flex-col gap-2"
                >
                  <p className="font-head text-4xl text-white/25">{`0${index + 1}`}</p>
                  <div className="flex flex-col">
                    <h3 className="text-md font-body text-white">
                      {step.title}
                    </h3>
                    <p className="text-sm leading-7 text-neutral-300">
                      {step.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <BasicButton className="mt-space-2x" href="/contact">
            Augmenter mon CA grâce au réachat
          </BasicButton>
        </div>
      </section>
      <Reasons />
      <ServiceWhoFor service={service} />

      <section className="mx-site-margin py-[6vh]">
        <div className="gap-space-base grid grid-cols-12">
          <div
            id="col-left"
            className="px-space-base col-start-2 col-end-7 w-full space-y-4"
          >
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-4">
                <div className="h-20 w-20 overflow-hidden rounded-full">
                  <Image src="/portrait.jpg" width={100} height={100} alt="" />
                </div>
                <div>
                  <p className="font-head text-xl">Eva Riccobene</p>
                  <p className="text-tertiary text-sm">
                    Experte en Fidelisation client
                  </p>
                </div>
              </div>
              <div className="gap-space-base flex">
                <div className="flex items-end gap-2">
                  <Image
                    src="mail-icon.svg"
                    width={50}
                    height={50}
                    alt=""
                    className="h-5 w-5"
                  />
                  <p className="text-primary text-base font-bold">
                    eva.experiencia@gmail.com
                  </p>
                </div>
                <div className="flex items-end gap-2">
                  <Image
                    src="phone-icon.svg"
                    width={50}
                    height={50}
                    alt=""
                    className="h-5 w-5"
                  />
                  <p className="text-primary text-base font-bold">
                    06 06 66 60 52
                  </p>
                </div>
              </div>
              <p className="text-secondary text-sm">
                Disponible en distanciel ou presentiel sur demande
              </p>
            </div>
            <h2 className="mt-space-2x text-4xl leading-tight">
              Des questions?
            </h2>
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
          <div className="col-start-7 col-end-12">
            <div className="p-space-base py-space-2x rounded-[1.75rem] border border-white/70 bg-white shadow-[0_20px_60px_rgba(34,8,66,0.05)]">
              <p className="text-indigo mb-space-base text-xl font-bold">
                Parlez-moi de votre projet
              </p>
              <FormCore />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
