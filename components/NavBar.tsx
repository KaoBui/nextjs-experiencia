"use client";

import { useRef } from "react";
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
            width={300}
            height={300}
            className="h-full w-auto"
          />
        </TransitionLink>

        <div className="flex items-center gap-4 text-base">
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

        <Button href="/contact">Prendre rendez-vous</Button>
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
