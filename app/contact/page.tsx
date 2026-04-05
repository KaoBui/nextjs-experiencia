import FormCore from "@/components/components/FormCore";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { contactFaqs } from "@/lib/faqs";
import Image from "next/image";

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

export default function ContactPage() {
  return (
    <section className="mx-site-margin px-section-padding gap-space-base grid grid-cols-1 pt-[18vh] pb-10 md:grid-cols-2">
      <div className="gap-space-2x flex max-w-[70ch] flex-1 flex-col">
        <p className="text-indigo text-sm font-semibold tracking-[0.2em] uppercase">
          Contact
        </p>
        <h1 className="text-5xl leading-[1.02] md:text-6xl">
          Parlons de vos objectifs et de ce qui bloque aujourd&apos;hui
        </h1>
        <p className="text-secondary leading-body max-w-[60ch] text-base">
          Utilisez le formulaire ci-dessous pour me decrire votre contexte. Je
          reviendrai vers vous avec une reponse claire et la meilleure suite a
          donner.
        </p>
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
          <div className="flex items-end gap-2">
            <Image
              src="mail-icon.svg"
              width={50}
              height={50}
              alt=""
              className="h-5 w-5"
            />
            <p className="text-primary text-base">eva.experiencia@gmail.com</p>
          </div>
          <div className="flex items-end gap-2">
            <Image
              src="phone-icon.svg"
              width={50}
              height={50}
              alt=""
              className="h-5 w-5"
            />
            <p className="text-primary text-base">06 06 66 60 52</p>
          </div>
          <p className="text-secondary text-sm">
            Disponible en distanciel ou presentiel sur demande
          </p>
        </div>
      </div>
      <div className="mx-space-base flex-1 pt-[30vh]">
        <div className="p-space-2x rounded-3xl bg-white">
          <div className="pb-space-base">
            <h3 className="text-xl">
              Ne laissez plus votre CA s&apos;envoler avec vos clients
            </h3>
            <p className="text-xs">
              Les champs marques d&apos;un * sont obligatoires.
            </p>
          </div>
          <FormCore />
        </div>
      </div>
      <div className="pt-space-2x col-span-1 md:col-span-2">
        <div className="gap-space-base flex flex-wrap items-center justify-between opacity-50">
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
      <div className="pt-space-2x col-span-2 flex flex-col items-center gap-space-2x">
        <div className="max-w-[48ch]">
          <p className="text-indigo text-center text-sm font-semibold tracking-[0.2em] uppercase">
            FAQ
          </p>
          <h2 className="pt-3 text-center text-3xl leading-tight md:text-4xl">
            Vous avez des questions?
          </h2>
        </div>
        <div className="w-full max-w-2xl">
          <Accordion type="single" collapsible className="w-full gap-space-base">
            {contactFaqs.map((faq, index) => (
              <AccordionItem key={faq.question} value={`item-${index}`}>
                <AccordionTrigger className="text-primary font-body text-base hover:no-underline">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-secondary leading-body">
                  <p className="text-base">{faq.answer}</p>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}
