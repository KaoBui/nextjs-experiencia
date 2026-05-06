import Arrow from "@/components/svg/Arrow";
import type { ServicePageData } from "@/lib/service-pages";
import Heading from "@/components/components/Heading";

function SectionLabel({
  children,
  color,
}: {
  children: React.ReactNode;
  color: string;
}) {
  return (
    <p
      className="text-sm font-semibold tracking-[0.18em] uppercase"
      style={{ color }}
    >
      {children}
    </p>
  );
}

type ServiceWhoForProps = {
  service: ServicePageData;
};

export default function ServiceWhoFor({ service }: ServiceWhoForProps) {
  return (
    <section id="pourqui" className="px-section-padding py-[8vh]">
      <div className="mx-site-margin gap-space-base flex grid-cols-12 flex-col md:grid">
        <div className="gap-space-base col-span-full flex flex-col items-center">
          <SectionLabel color={service.color}>Pour qui</SectionLabel>
          <h2 className="pb-space-2x max-w-[32ch] text-center text-4xl">
            <Heading>
              Mon offre <em> {service.name} </em> est faite pour vous
            </Heading>
          </h2>
        </div>
        <div className="gap-space-base col-start-3 col-end-11 grid grid-cols-2">
          {service.whoFor.map((item) => (
            <div
              key={item}
              className="text-base flex items-center justify-start gap-4 rounded-4xl border border-white/15 bg-white/60 p-6 leading-7 backdrop-blur-md"
            >
              <div
                className="aspect-square h-8 w-8 rounded-full p-2"
                style={{ backgroundColor: service.color }}
              >
                <Arrow stroke="white" />
              </div>

              {item}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
