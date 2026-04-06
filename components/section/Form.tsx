"use client";
import Heading from "../components/Heading";
import FormCore from "../components/FormCore";
export default function Form() {
  return (
    <section id="form" className="relative overflow-hidden px-4 py-[15vh]">
      <div className="mx-site-margin gap-space-base flex h-full grid-cols-12 flex-col md:grid">
        <div className="gap-space-base pb-space-base col-start-2 col-end-7 flex flex-col">
          <div className="flex flex-col gap-4">
            <h2>
              <Heading className="text-4xl" splitType="words">
                Dites-moi ce qui vous freine, je vous aide à le débloquer
              </Heading>
            </h2>
            <p>
              <Heading className="textbase" splitType="lines">
                Chez Experiencia Consulting les clients sont au coeur de chaque
                décision. Alors on commence toujours par vous écouter. Vraiment.
              </Heading>
            </p>
          </div>
        </div>
        <div className="gap-space-2x col-start-2 col-end-6 flex flex-col justify-center">
          <div className="flex items-center gap-4">
            <h3 className="w-16 text-2xl">1.</h3>
            <div className="flex flex-col gap-2">
              <p className="text-base">Réservez votre visio découverte</p>
              <p className="text-tertiary text-sm">
                Parce qu'un bon accompagnement part de votre réalité, cette
                visio c'est une heure pour vous écouter, comprendre où vous en
                êtes, et répondre à vos questions.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <h3 className="w-16 text-2xl">2.</h3>
            <div className="flex flex-col gap-2">
              <p className="text-base">Réservez votre visio découverte</p>
              <p className="text-tertiary text-sm">
                Parce qu'un bon accompagnement part de votre réalité, cette
                visio c'est une heure pour vous écouter, comprendre où vous en
                êtes, et répondre à vos questions.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <h3 className="w-16 text-2xl">3.</h3>
            <div className="flex flex-col gap-2">
              <p className="text-base">Réservez votre visio découverte</p>
              <p className="text-tertiary text-sm">
                Parce qu'un bon accompagnement part de votre réalité, cette
                visio c'est une heure pour vous écouter, comprendre où vous en
                êtes, et répondre à vos questions.
              </p>
            </div>
          </div>
        </div>
        <div className="col-start-7 col-end-12">
          <div className="p-space-2x rounded-3xl bg-white">
            <div className="pb-space-base">
              <h3 className="text-xl">
                Ne laissez plus votre CA s’envoler avec vos clients
              </h3>
              <p className="text-xs">
                Les champs marqués d’un * sont obligatoires.
              </p>
            </div>
            <FormCore />
          </div>
        </div>
      </div>
    </section>
  );
}
