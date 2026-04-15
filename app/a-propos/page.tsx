import Image from "next/image";
import Heading from "@/components/components/Heading";
import TransitionLink from "@/components/TransitionLink";
import Button from "@/components/components/Button";

const strengths = [
  "Audit du parcours client et des points de friction",
  "Strategies de fidelisation activables rapidement",
  "Accompagnement sur mesure pour TPE et PME",
];

export default function AboutPage() {
  return (
    <section className="px-section-padding py-[18vh]">
      <div className="mx-site-margin gap-space-3x pt-space-2x grid items-start lg:grid-cols-12">
        <div className="gap-space-2x flex flex-col lg:col-span-7">
          <div className="flex flex-col gap-6">
            <div className="gap-space-sm flex w-fit items-center rounded-full bg-white p-2 px-3 shadow-md/5">
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
            <Button href="/contact">Prendre contact</Button>
            <TransitionLink
              href="/"
              className="text-indigo border-indigo hover:bg-indigo/5 flex items-center rounded-full border px-5 py-3 text-base transition"
            >
              Retour a l&apos;accueil
            </TransitionLink>
          </div>
        </div>

        <div className="relative h-full lg:col-span-5">
          <div className="absolute top-0 left-1/2 aspect-square w-1/2 max-w-[300px] -translate-x-1/4 overflow-hidden rounded-[2rem] border border-white bg-white/60 p-3 backdrop-blur-md">
            <Image
              src="/portrait.jpg"
              alt="Portrait de la fondatrice d'Experiencia Consulting"
              width={1000}
              height={1250}
              className="h-full w-full rounded-[1.5rem] object-cover"
              loading="eager"
            />
          </div>

          <div className="absolute relative top-1/2 left-1/2 aspect-square w-2/3 max-w-[360px] -translate-x-2/3 -translate-y-1/3 overflow-hidden rounded-[2rem] border border-white bg-violet-50 bg-white/60 p-3 backdrop-blur-md">
            <Image
              src="/a-propos.jpg"
              width={1200}
              height={1250}
              alt="a-propos"
              className="h-full w-full rounded-[1.5rem] object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
