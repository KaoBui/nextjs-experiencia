import Link from "next/link";
import FormCore from "@/components/components/FormCore";
import TransitionLink from "@/components/TransitionLink";

export default function ContactPage() {
  return (
    <section className="mx-site-margin px-section-padding gap-space-base flex pt-[18vh] pb-10">
      <div className="flex max-w-[70ch] flex-1 flex-col gap-6">
        <p className="text-indigo text-sm tracking-[0.2em] uppercase">
          Contact
        </p>
        <h1 className="max-w-[14ch] text-5xl leading-[1.02] md:text-6xl">
          Parlons de vos objectifs et de ce qui bloque aujourd&apos;hui
        </h1>
        <p className="text-secondary leading-body max-w-[60ch] text-base">
          Utilisez le formulaire ci-dessous pour me decrire votre contexte. Je
          reviendrai vers vous avec une reponse claire et la meilleure suite a
          donner.
        </p>
        <div className="flex flex-wrap gap-4 text-sm">
          <Link
            href="mailto:contact@experiencia-consulting.fr"
            className="rounded-full border border-black/10 bg-white/70 px-4 py-2 backdrop-blur-sm"
          >
            contact@experiencia-consulting.fr
          </Link>
          <TransitionLink
            href="/a-propos"
            className="text-indigo border-indigo hover:bg-indigo/5 rounded-full border px-4 py-2 transition"
          >
            En savoir plus
          </TransitionLink>
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
    </section>
  );
}
