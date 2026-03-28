"use client";
import Image from "next/image";
import Heading from "../components/Heading";

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

export default function Testimonials() {
  return (
    <section className="relative overflow-hidden px-4 py-[15vh]">
      <div className="mx-site-margin gap-space-2x flex flex-col items-center justify-center">
        <h1 className="max-w-[20ch] text-center text-4xl">
          <Heading splitType="words">
            Ils ont transformé leur performance
          </Heading>
        </h1>
        <div className="relative flex w-full justify-center">
          <div className="p-space-base pt-space-2x gap-space-base z-1 flex max-w-2xl flex-col items-end rounded-3xl bg-white/75 shadow-2xl/5 backdrop-blur-md">
            <p className="text-secondary text-base">
              Nous avions un bon chiffre d’affaires, mais une forte instabilité
              client. Nous pensions que c’était "normal" dans notre secteur.
              Experiencia nous a permis d’identifier les points de friction
              invisibles dans notre parcours client. En 3 mois, notre taux de
              rétention a augmenté de 18 %.
            </p>
            <div className="flex items-center gap-4">
              <div className="flex flex-col items-end">
                <p className="text-md font-head text-primary">Sophie Martin</p>
                <p className="text-tertiary text-xs">
                  Dirigeante de cabinet de conseil
                </p>
              </div>
              <div className="aspect-square w-16 rounded-md">
                <Image
                  src="/client-photo.jpg"
                  width={100}
                  height={100}
                  alt=""
                />
              </div>
            </div>
          </div>
          <div className="gap-space-2x absolute top-1/2 flex -translate-y-1/2 items-center justify-between opacity-25">
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
      </div>
    </section>
  );
}
