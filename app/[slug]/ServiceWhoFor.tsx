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
      <div className="mx-site-margin gap-space-base flex flex-col md:grid grid-cols-12">
        <div className="col-span-5 col-start-2 flex flex-col">
          <SectionLabel color={service.color}>Pour qui</SectionLabel>
          <h2 className="pb-space-2x text-4xl max-w-[24ch]">
            <Heading>
              Mon offre <em> {service.name} </em> est faite pour vous
            </Heading>
          </h2>
        </div>
        <div className="gap-space-base col-span-5 col-start-7 flex flex-col">
          {service.whoFor.map((item) => (
            <div
              key={item}
              className="flex items-center justify-start gap-4 rounded-4xl border border-white/15 bg-white/60 backdrop-blur-md p-6 tex-base md:text-md leading-7"
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
