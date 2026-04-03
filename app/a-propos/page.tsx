import Image from "next/image";
import Heading from "@/components/components/Heading";
import TransitionLink from "@/components/TransitionLink";

const strengths = [
  "Audit du parcours client et des points de friction",
  "Strategies de fidelisation activables rapidement",
  "Accompagnement sur mesure pour TPE et PME",
];

export default function AboutPage() {
  return (
    <section className="px-section-padding py-[18vh]">
      <div className="mx-site-margin gap-space-3x grid items-start lg:grid-cols-12">
        <div className="gap-space-2x flex flex-col lg:col-span-7">
          <div className="flex flex-col gap-6">
            <div className="gap-space-sm flex w-fit items-center rounded-full bg-white/50 p-2 px-3">
              <div className="bg-indigo h-1 w-1 rounded-full"></div>
              <p className="text-xs uppercase">
                À <strong> propos</strong>
              </p>
            </div>

            <h1 className="max-w-[24ch] text-5xl leading-[1.02] md:text-6xl">
              <Heading splitType="words">
                Une approche humaine pour faire grandir votre activite
              </Heading>
            </h1>
            <div className="text-secondary leading-body max-w-[62ch] space-y-4 text-base">
              <p>
                Bonjour, je suis Eva, fondatrice d&apos;Experiencia Consulting.
                J&apos;aide les TPE et PME a gagner en rentabilite en renforcant
                l&apos;experience client et la fidelisation.
              </p>
              <p>
                Mon travail consiste a clarifier ce qui freine vos ventes,
                identifier les irritants du parcours client et mettre en place
                des actions concretes, mesurables et soutenables.
              </p>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {strengths.map((item, index) => (
              <div
                key={item}
                className="rounded-3xl border border-black/6 bg-white/70 p-5 backdrop-blur-sm"
              >
                <p className="text-indigo mb-3 text-sm">{`0${index + 1}`}</p>
                <p className="text-sm leading-6">{item}</p>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap gap-4">
            <TransitionLink
              href="/contact"
              className="bg-indigo border-indigo rounded-full border px-5 py-3 text-sm text-white transition hover:opacity-90"
            >
              Prendre contact
            </TransitionLink>
            <TransitionLink
              href="/"
              className="text-indigo border-indigo hover:bg-indigo/5 rounded-full border px-5 py-3 text-sm transition"
            >
              Retour a l&apos;accueil
            </TransitionLink>
          </div>
        </div>

        <div className="lg:col-span-5">
          <div className="ml-[20%] rounded-[2rem] border border-white bg-white/60 p-3 shadow-[0_20px_80px_rgba(34,8,66,0.08)] backdrop-blur-md">
            <div className="aspect-[4/5] overflow-hidden rounded-[1.5rem] bg-violet-50">
              <Image
                src="/portrait.jpg"
                alt="Portrait de la fondatrice d'Experiencia Consulting"
                width={1000}
                height={1250}
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
