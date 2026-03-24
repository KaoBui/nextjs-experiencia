import Image from "next/image";
import ServiceWave from "../svg/ServiceWave";
import ServiceCard from "../components/ServiceCard";
export default function Services() {
  return (
    <section id="#services" className="relative px-4">
      <ServiceWave className="pointer-events-none absolute top-0 right-0 -z-10 h-auto w-[120vw]" />
      <div className="mx-site-margin grid grid-cols-12 gap-space-base gap-y-space-2x">
        <div className="col-start-1 col-end-7 flex flex-col items-start gap-space-base">
          <p className="text-xl">Vous sentez que ça coince?</p>
          <h2 className="text-3xl">
            Je vous montre <em> où, pourquoi et comment y remédier</em>
          </h2>
          <p className="text-base">
            Aucune entreprise n'est identique et par conséquent aucune stratégie
            de fidélisation ne devrait l'être. Ce que je vous propose c'est une
            solution sur mesure, adaptée à vos problématiques pour stopper
            l'hémorragie et accélérer votre croissance.{" "}
          </p>
        </div>
        <div className="col-start-5 col-end-9">
          <div className="bg-white/60 rounded-3xl border-2 border-white flex flex-col justify-between items-start p-6 min-h-[360px] backdrop-blur-xl">
            <div className="w-full flex justify-end">
              <div className="w-20 h-20 rounded-full bg-white shadow-2xl/10 flex p-5">
                <Image
                  src="/reactiver-icon.svg"
                  width={100}
                  height={100}
                  alt=""
                />
              </div>
            </div>
            <div className="flex flex-col items-start">
              <h3 className="text-3xl text-indigo">Réactiver</h3>
              <p className="text-base text-secondary">
                Vous galérez à créer du réachat
              </p>
              <div className="bg-indigo/5 rounded-xl px-6 p-3 mt-space-base">
                <a href="" className="text-sm text-indigo font-semibold">
                  Voir l'offre
                  <span className="uppercase"> REACTIVER</span>
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="col-start-9 col-end-13">
          <ServiceCard
            imgSrc="/reactiver-icon.svg"
            offerName="Captiver"
            description="Vous perdez des clients"
            href=""
            cardColor="var(--color-lila)"
          />
        </div>
        <div className="col-start-1 col-end-5">
          <div className="bg-white/80 rounded-2xl border border-white flex flex-col justify-between items-start p-6 min-h-[360px]">
            <div className="w-full flex justify-end">
              <div className="w-20 h-20 rounded-full bg-white shadow-2xl/10"></div>
            </div>
            <div>
              <h3 className="text-2xl text-indigo">Réactiver</h3>
              <p>Vous galérez à créer du réachat</p>
              <div className="bg-indigo/5 rounded-xl px-6 p-3 mt-space-base">
                <p className="text-sm">Explore l'offre REACTIVER</p>
              </div>
            </div>
          </div>
        </div>
        <div className="col-start-5 col-end-9">
          <div className="bg-white/80 rounded-2xl border border-white flex flex-col justify-between items-start p-6 min-h-[360px]">
            <div className="w-full flex justify-end">
              <div className="w-20 h-20 rounded-full bg-white shadow-2xl/10"></div>
            </div>
            <div>
              <h3 className="text-2xl text-indigo">Réactiver</h3>
              <p>Vous galérez à créer du réachat</p>
              <div className="bg-indigo/5 rounded-xl px-6 p-3 mt-space-base">
                <p className="text-sm">Explore l'offre REACTIVER</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
