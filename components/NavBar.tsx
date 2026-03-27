"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

const navItems = [
  { href: "/", label: "Accueil" },
  { href: "/services", label: "Services" },
  { href: "/about", label: "A propos" },
];

function NavContent({ floating = false }: { floating?: boolean }) {
  return (
    <nav
      className={[
        "flex items-center justify-between px-2 py-1 transition-all duration-500",
        floating
          ? "w-1/2 rounded-full bg-white/75 shadow-sm backdrop-blur-md"
          : "mx-site-margin",
      ].join(" ")}
    >
      <Link href="/" className="font-serif text-lg pl-2">
        <Image
        src="/logo.png"
        alt="Experiencia Consulting Logo"
        width={100}
        height={100}
        />
      </Link>
      <div className="flex items-center gap-6 text-sm">
        {navItems.map((item) => (
          <Link key={item.href} href={item.href}>
            {item.label}
          </Link>
        ))}
      </div>
      <div className="rounded-full bg-indigo p-2 px-4">
        <p className="text-sm text-white">Calculer mon CA perdu</p>
      </div>
    </nav>
  );
}

export default function NavBar() {
  const [showFloatingNav, setShowFloatingNav] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowFloatingNav(window.scrollY > 160);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <header className="absolute top-8 z-50 w-full">
        <div className="opacity-100">
          <NavContent />
        </div>
      </header>
      <header
        className={[
          "pointer-events-none fixed top-4 left-1/2 z-60 w-full -translate-x-1/2 transition-all duration-500",
          showFloatingNav
            ? "translate-y-0 opacity-100"
            : "-translate-y-full opacity-0",
        ].join(" ")}
      >
        <div className="pointer-events-auto flex justify-center">
          <NavContent floating />
        </div>
      </header>
    </>
  );
}
