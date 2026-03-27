"use client";

import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const navItems = [
  { href: "/", label: "Accueil" },
  { href: "/services", label: "Services" },
  { href: "/about", label: "A propos" },
];

export default function NavBar() {
  const headerRef = useRef<HTMLElement | null>(null);
  const navRef = useRef<HTMLElement | null>(null);
  const navInnerRef = useRef<HTMLDivElement | null>(null);

  useGSAP(() => {
    if (!headerRef.current || !navRef.current || !navInnerRef.current) {
      return;
    }

    gsap.set(headerRef.current, {
      top: "2rem",
    });

    gsap.set(navRef.current, {
      width: "100%",
      backgroundColor: "rgba(255,255,255,0)",
      borderRadius: "0px",
      boxShadow: "0 0 0 rgba(0,0,0,0)",
      backdropFilter: "blur(0px)",
    });

    gsap.timeline({
      scrollTrigger: {
        trigger: document.documentElement,
        start: "top top",
        end: "+=180",
        scrub: true,
      },
    })
      .to(
        headerRef.current,
        {
          top: "1rem",
          ease: "none",
        },
        0,
      )
      .to(
        navInnerRef.current,
        {
          paddingLeft: "0px",
          paddingRight: "0px",
          ease: "none",
        },
        0,
      )
      .to(
        navRef.current,
        {
          width: "50%",
          backgroundColor: "rgba(255,255,255,0.75)",
          borderRadius: "9999px",
          boxShadow: "0 4px 4px rgba(0,0,0,0.04)",
          backdropFilter: "blur(12px)",
          ease: "none",
        },
        0,
      );
  });

  return (
    <header
      ref={headerRef}
      className="fixed left-1/2 z-60 w-full -translate-x-1/2"
    >
      <div ref={navInnerRef} className="mx-site-margin flex justify-center">
        <nav
          ref={navRef}
          className="flex items-center justify-between p-2"
        >
          <Link href="/" className="pl-2 font-serif text-lg">
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
          <div className="bg-indigo rounded-full p-2 px-4">
            <p className="text-sm text-white">Calculer mon CA perdu</p>
          </div>
        </nav>
      </div>
    </header>
  );
}
