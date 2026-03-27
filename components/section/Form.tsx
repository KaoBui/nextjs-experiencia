"use client";
import Heading from "../components/Heading";
import FormCore from "../components/FormCore";
export default function Form() {
  return (
    <section
      id="form"
      className="relative h-screen overflow-hidden px-4 py-[15vh]"
    >
      <div className="mx-site-margin gap-space-base grid h-full grid-cols-12">
        <div className="gap-space-base col-start-1 col-end-6 flex flex-col">
          <div className="flex flex-col gap-4">
            <h2>
              <Heading className="text-4xl" splitType="words">
                Dites-moi ce qui vous freine, je vous aide à le débloquer
              </Heading>
            </h2>
            <p>
              <Heading className="text-base" splitType="lines">
                Chez Experiencia Consulting les clients sont au coeur de chaque
                décision. Alors on commence toujours par vous écouter. Vraiment.
              </Heading>
            </p>
          </div>
          <div className="flex flex-col gap-2">
            <h3 className="text-2xl">1.</h3>
            <p>Réservez votre visio découverte</p>
            <p className="text-tertiary text-sm">
              Parce qu'un bon accompagnement part de votre réalité, cette visio
              c'est une heure pour vous écouter, comprendre où vous en êtes, et
              répondre à vos questions.
            </p>
          </div>
        </div>
        <div className="col-start-7 col-end-13">
          <div className="p-space-2x rounded-3xl bg-white">
            <h3 className="text-xl">
              Ne laissez plus votre CA s’envoler avec vos clients
            </h3>
            <p className="text-xs">
              Les champs marqués d’un * sont obligatoires.
            </p>
            <FormCore />
          </div>
        </div>
      </div>
    </section>
  );
}
