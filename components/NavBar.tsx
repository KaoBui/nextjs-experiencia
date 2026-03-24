import Link from "next/link";

const navItems = [
  { href: "/", label: "Accueil" },
  { href: "/services", label: "Services" },
  { href: "/about", label: "A propos" },
  { href: "/contact", label: "Contact" },
];

export default function NavBar() {
  return (
    <header className="fixed top-0 z-50 w-full">
      <nav className="mx-site-margin mt-8 flex items-center justify-between rounded-full border border-white/60 bg-white/80 px-6 py-3 backdrop-blur-sm">
        <Link href="/" className="font-serif text-lg">
          Experiencia
        </Link>
        <div className="flex items-center gap-6 text-sm">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href}>
              {item.label}
            </Link>
          ))}
        </div>
      </nav>
    </header>
  );
}
