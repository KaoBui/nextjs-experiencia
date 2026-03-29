"use client";

import { useRef } from "react";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import TransitionLink from "@/components/TransitionLink";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const navItems = [
  { href: "/", label: "Accueil" },
  { href: "/services", label: "Services" },
  { href: "/a-propos", label: "A propos" },
  { href: "/contact", label: "Contact" },
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

    gsap
      .timeline({
        scrollTrigger: {
          trigger: document.documentElement,
          start: "top top",
          end: "+=300vh",
          scrub: true,
        },
        defaults: {
          ease: "power2.inOut",
        },
      })
      .to(
        headerRef.current,
        {
          top: "1rem",
        },
        0,
      )
      .to(
        navInnerRef.current,
        {
          paddingLeft: "0px",
          paddingRight: "0px",
        },
        0,
      )
      .to(
        navRef.current,
        {
          width: "50%",
          backgroundColor: "rgba(255,255,255,0.7)",
          borderRadius: "9999px",
          boxShadow: "0 4px 4px rgba(0,0,0,0.04)",
          backdropFilter: "blur(12px)",
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
        <nav ref={navRef} className="flex items-center justify-between p-2">
          <TransitionLink href="/" className="pl-2 font-serif text-lg">
            <Image
              src="/logo.png"
              alt="Experiencia Consulting Logo"
              width={100}
              height={100}
            />
          </TransitionLink>
          <div className="flex items-center gap-6 text-sm">
            {navItems.map((item) => (
              <TransitionLink key={item.href} href={item.href}>
                {item.label}
              </TransitionLink>
            ))}
          </div>
          <TransitionLink
            href="/contact"
            className="bg-indigo rounded-full p-2 px-4"
          >
            <p className="text-sm text-white">Calculer mon CA perdu</p>
          </TransitionLink>
        </nav>
      </div>
    </header>
  );
}
