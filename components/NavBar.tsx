"use client";

import { useRef } from "react";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import TransitionLink from "@/components/TransitionLink";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const navItems = [
  { href: "/services", label: "Services" },
  { href: "/a-propos", label: "A propos" },
];

function NavContent({ compact = false }: { compact?: boolean }) {
  return (
    <div className={compact ? "mx-site-margin flex justify-center" : ""}>
      <nav
        className={[
          "flex items-center justify-between p-2",
          compact
            ? "w-full max-w-[50rem] rounded-full bg-white/70 shadow-[0_4px_4px_rgba(0,0,0,0.04)] backdrop-blur-md"
            : "w-full",
        ].join(" ")}
      >
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
          <p className="text-sm text-white">Prendre RDV</p>
        </TransitionLink>
      </nav>
    </div>
  );
}

export default function NavBar() {
  const stickyHeaderRef = useRef<HTMLElement | null>(null);

  useGSAP(() => {
    if (!stickyHeaderRef.current) {
      return;
    }

    gsap.set(stickyHeaderRef.current, {
      yPercent: -100,
      autoAlpha: 0,
    });

    const timeline = gsap.timeline({
      paused: true,
      defaults: {
        duration: 0.2,
        ease: "power2.out",
      },
    });

    timeline.to(stickyHeaderRef.current, {
      yPercent: 0,
      autoAlpha: 1,
    });

    ScrollTrigger.create({
      trigger: document.documentElement,
      start: () => window.innerHeight * 0.5,
      invalidateOnRefresh: true,
      onEnter: () => timeline.play(),
      onLeaveBack: () => timeline.reverse(),
    });

    return () => {
      timeline.kill();
    };
  }, []);

  return (
    <>
      <header className="absolute top-8 left-1/2 z-50 w-full -translate-x-1/2">
        <div className="mx-site-margin">
          <NavContent />
        </div>
      </header>

      <header
        ref={stickyHeaderRef}
        className="fixed top-4 left-1/2 z-60 w-full -translate-x-1/2"
      >
        <NavContent compact />
      </header>
    </>
  );
}
