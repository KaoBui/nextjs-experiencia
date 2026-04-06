"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import TransitionLink from "@/components/TransitionLink";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";
import { servicePages, serviceSlugs } from "@/lib/service-pages";
import Button from "./components/Button";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const navItems = [{ href: "/a-propos", label: "A propos" }];

const serviceNavItems = serviceSlugs.map((slug) => ({
  href: `/${slug}`,
  label: servicePages[slug].name,
  color: servicePages[slug].color,
}));

function NavContent({ compact = false }: { compact?: boolean }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className={compact ? "mx-site-margin flex justify-center" : ""}>
      <nav
        className={[
          "relative flex items-center justify-between p-2",
          compact
            ? "w-full max-w-[50rem] rounded-full bg-white/70 shadow-[0_4px_4px_rgba(0,0,0,0.04)] backdrop-blur-md"
            : "w-full",
        ].join(" ")}
      >
        <TransitionLink href="/" className="pl-2 font-serif text-lg">
          <Image
            src="/logo.png"
            alt="Experiencia Consulting Logo"
            width={300}
            height={300}
            className="h-full w-auto"
          />
        </TransitionLink>

        <div className="hidden items-center gap-4 text-base md:flex">
          <NavigationMenu viewport={false} className="flex-none">
            <NavigationMenuList className="gap-4">
              <NavigationMenuItem>
                <NavigationMenuTrigger className="bg-transparent px-0 hover:bg-transparent focus:bg-transparent data-[state=open]:bg-transparent data-[state=open]:hover:bg-transparent">
                  Services
                </NavigationMenuTrigger>
                <NavigationMenuContent className="left-1/2 w-[18rem] -translate-x-1/2 rounded-[1.5rem] border border-white/70 bg-white/92 p-3 shadow-[0_20px_60px_rgba(34,8,66,0.12)] backdrop-blur-md md:absolute">
                  <div className="flex flex-col gap-1">
                    {serviceNavItems.map((item) => (
                      <NavigationMenuLink
                        key={item.href}
                        asChild
                        className="rounded-[1rem] px-4 py-3 pr-12 hover:bg-black/[0.03] focus:bg-black/[0.03]"
                      >
                        <TransitionLink href={item.href}>
                          <span className="text-sm">{item.label}</span>
                        </TransitionLink>
                      </NavigationMenuLink>
                    ))}
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>

          {navItems.map((item) => (
            <TransitionLink
              key={item.href}
              href={item.href}
              className={cn(
                navigationMenuTriggerStyle(),
                "bg-transparent px-4 hover:bg-white",
              )}
            >
              {item.label}
            </TransitionLink>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <Button href="/contact">Prendre rendez-vous</Button>
          <button
            type="button"
            aria-expanded={isMenuOpen}
            aria-controls={compact ? "mobile-nav-sticky" : "mobile-nav-main"}
            aria-label={isMenuOpen ? "Fermer le menu" : "Ouvrir le menu"}
            className="flex h-11 w-11 items-center justify-center rounded-full border border-white/70 bg-white/80 backdrop-blur-md md:hidden"
            onClick={() => setIsMenuOpen((open) => !open)}
          >
            <span className="sr-only">
              {isMenuOpen ? "Fermer le menu" : "Ouvrir le menu"}
            </span>
            <span className="relative block h-4 w-5">
              <span
                className={`bg-indigo absolute top-0 left-0 h-0.5 w-5 rounded-full transition-transform duration-300 ${
                  isMenuOpen ? "translate-y-[7px] rotate-45" : ""
                }`}
              />
              <span
                className={`bg-indigo absolute top-[7px] left-0 h-0.5 w-5 rounded-full transition-opacity duration-200 ${
                  isMenuOpen ? "opacity-0" : "opacity-100"
                }`}
              />
              <span
                className={`bg-indigo absolute top-[14px] left-0 h-0.5 w-5 rounded-full transition-transform duration-300 ${
                  isMenuOpen ? "-translate-y-[7px] -rotate-45" : ""
                }`}
              />
            </span>
          </button>
        </div>

        <div
          id={compact ? "mobile-nav-sticky" : "mobile-nav-main"}
          className={`absolute top-full left-0 right-0 mt-3 rounded-[1.75rem] border border-white/70 bg-white/92 p-3 shadow-[0_20px_60px_rgba(34,8,66,0.12)] backdrop-blur-md transition-all duration-300 md:hidden ${
            isMenuOpen
              ? "pointer-events-auto translate-y-0 opacity-100"
              : "pointer-events-none -translate-y-2 opacity-0"
          }`}
        >
          <div className="flex flex-col gap-1">
            <p className="px-3 pt-1 text-xs font-medium tracking-[0.16em] uppercase text-neutral-500">
              Services
            </p>
            {serviceNavItems.map((item) => (
              <TransitionLink
                key={item.href}
                href={item.href}
                className="rounded-[1rem] px-3 py-3 text-sm transition hover:bg-black/[0.03]"
              >
                {item.label}
              </TransitionLink>
            ))}
            {navItems.map((item) => (
              <TransitionLink
                key={item.href}
                href={item.href}
                className="rounded-[1rem] px-3 py-3 text-sm transition hover:bg-black/[0.03]"
              >
                {item.label}
              </TransitionLink>
            ))}
          </div>
        </div>
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
        <div className="mx-site-margin px-section-padding">
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
