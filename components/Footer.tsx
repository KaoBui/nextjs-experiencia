import Image from "next/image";
import TransitionLink from "@/components/TransitionLink";

const navigationLinks = [
  { href: "/", label: "Accueil" },
  { href: "/a-propos", label: "A propos" },
  { href: "/contact", label: "Contact" },
];

const contactDetails = [
  "contact@experiencia-consulting.fr",
  "+33 6 12 34 56 78",
  "Lyon, France",
];

const infoLinks = [
  { href: "/reactiver", label: "Réactiver" },
  { href: "/captiver", label: "Captiver" },
  { href: "/fideliser", label: "Fideliser" },
  { href: "/piloter", label: "Piloter" },
];

const legalLinks = [
  { href: "/mentions-legales", label: "Mentions légales" },
  {
    href: "/politique-de-confidentialite",
    label: "Politique de confidentialité",
  },
  { href: "/cookies", label: "Cookies" },
];

export default function Footer() {
  return (
    <footer className="bg-indigo-dark p-space-base pt-16 text-white">
      <div className="mx-site-margin">
        <div className="grid gap-12 border-b border-white/10 pb-10 md:grid-cols-2 xl:grid-cols-12">
          <div className="col-start-1 col-end-6 flex max-w-xs flex-col gap-4">
            <TransitionLink href="/" className="flex justify-center">
              <Image
                src="/logo-vertical.png"
                alt="Experiencia Consulting Logo"
                width={120}
                height={120}
                className="h-auto w-24"
              />
            </TransitionLink>
            <p className="text-center text-sm leading-6 text-white/70">
              Conseil stratégique pour renforcer l&apos;expérience client et la
              performance durable.
            </p>
          </div>
          <div className="col-start-6 col-end-13 flex justify-between gap-12">
            <div className="flex flex-1 flex-col gap-4">
              <h3 className="text-md text-white/75">Navigation</h3>
              <div className="flex flex-col gap-3 text-sm text-white/80">
                {navigationLinks.map((link) => (
                  <TransitionLink
                    key={link.href}
                    href={link.href}
                    className="w-fit transition hover:text-white"
                  >
                    {link.label}
                  </TransitionLink>
                ))}
              </div>
            </div>

            <div className="flex flex-1 flex-col gap-4">
              <h3 className="text-md text-white/75">Services</h3>
              <div className="flex flex-col gap-3 text-sm text-white/80">
                {infoLinks.map((link) => (
                  <TransitionLink
                    key={link.href}
                    href={link.href}
                    className="w-fit transition hover:text-white"
                  >
                    {link.label}
                  </TransitionLink>
                ))}
              </div>
            </div>
            <div className="flex flex-1 flex-col gap-4">
              <h3 className="text-md text-white/75">Contact</h3>
              <div className="flex flex-col gap-3 text-sm text-white/80">
                {contactDetails.map((detail) => (
                  <p key={detail}>{detail}</p>
                ))}
              </div>
            </div>
          </div>{" "}
        </div>

        <div className="flex flex-col gap-4 pt-6 text-xs text-white/50 md:flex-row md:items-center md:justify-between">
          <p>© 2026 Experiencia Consulting. Tous droits réservés.</p>
          <div className="flex flex-wrap gap-4">
            {legalLinks.map((link) => (
              <TransitionLink
                key={link.href}
                href={link.href}
                className="transition hover:text-white/80"
              >
                {link.label}
              </TransitionLink>
            ))}
            <p className="text-xs">Website by Kao</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
