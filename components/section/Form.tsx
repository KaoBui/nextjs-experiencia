"use client";
import Image from "next/image";
import Heading from "../components/Heading";
import FormCore from "../components/FormCore";
function Step({
  number,
  title,
  description,
}: {
  number: string;
  title: string;
  description: string;
}) {
  return (
    <div className="flex flex-1 flex-col items-start gap-4">
      <h3 className="text-tertiary text-4xl">{number}</h3>
      <div className="flex flex-col gap-2">
        <p className="text-base">{title}</p>
        <Heading className="textbase" splitType="lines">
          <p className="text-tertiary text-sm">{description}</p>
        </Heading>
      </div>
    </div>
  );
}

export default function Form() {
  return (
    <section id="form" className="relative overflow-hidden px-4 py-[15vh]">
      <div className="mx-site-margin gap-space-base flex h-full grid-cols-12 flex-col md:grid">
        <div className="gap-space-2x col-start-2 col-end-6 flex flex-col justify-center">
          <div className="flex flex-col gap-4">
            <h2>
              <Heading className="text-4xl" splitType="lines">
                Dites-moi ce qui vous freine, je vous aide à le débloquer
              </Heading>
            </h2>
            <p>
              <Heading className="textbase" splitType="lines">
                Chez Experiencia Consulting les clients sont au coeur de chaque
                décision. Alors on commence toujours par vous écouter. Vraiment.
              </Heading>
            </p>
            <div className="pt-space-base flex flex-col gap-4">
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
                <p className="text-primary text-base">
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
                <p className="text-primary text-base">06 06 66 60 52</p>
              </div>
              <p className="text-secondary text-sm">
                Disponible en distanciel ou presentiel sur demande
              </p>
            </div>
          </div>
        </div>
        <div className="col-start-7 col-end-12">
          <div className="p-space-2x rounded-3xl bg-white">
            <div className="pb-space-base">
              <h3 className="text-md font-body">
                Ne laissez plus votre CA s’envoler avec vos clients
              </h3>
              <p className="text-xs">
                Les champs marqués d’un * sont obligatoires.
              </p>
            </div>
            <FormCore />
          </div>
        </div>
        <div className="pt-space-4x col-span-full flex justify-center">
          <h2>
            <Heading className="text-4xl" splitType="lines">
              Comment ca se passe?
            </Heading>
          </h2>{" "}
        </div>
        <div className="gap-space-2x pt-space-base col-start-2 col-end-12 flex flex-col justify-between md:flex-row">
          <Step
            number="1."
            title="Réservez votre visio découverte"
            description="Parce qu'un bon accompagnement part de votre réalité, cette visio c'est une heure pour vous écouter, comprendre où vous en êtes, et répondre à vos questions."
          />
          <Step
            number="2."
            title="Réservez votre visio découverte"
            description="Parce qu'un bon accompagnement part de votre réalité, cette visio c'est une heure pour vous écouter, comprendre où vous en êtes, et répondre à vos questions."
          />
          <Step
            number="3."
            title="Réservez votre visio découverte"
            description="Parce qu'un bon accompagnement part de votre réalité, cette visio c'est une heure pour vous écouter, comprendre où vous en êtes, et répondre à vos questions."
          />
        </div>
      </div>
    </section>
  );
}
