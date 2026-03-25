"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSmoothScroll } from "@/providers/SmoothScrollProvider";
import { useTransition } from "@/providers/TransitionProvider";
import { Navigation } from "@/components/layout/Navigation";
import { LogoLockup } from "@/components/layout/LogoLockup";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export function Header() {
  const pathname = usePathname();
  const { scrollTo } = useSmoothScroll();
  const { triggerTransition } = useTransition();
  const [mobileOpen, setMobileOpen] = useState(false);
  const innerRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;

    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = previousOverflow;
    }

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [mobileOpen]);

  const handleLogoClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    if (pathname === "/") {
      event.preventDefault();
      scrollTo(0);
      return;
    }

    event.preventDefault();
    triggerTransition("/#top");
  };

  useGSAP(
    () => {
      const inner = innerRef.current;
      if (!inner) return;

      const hero = document.querySelector("#top");
      if (!hero) return;

      const largePadding = 20;
      const smallPadding = 10;

      gsap.set(inner, { paddingTop: largePadding, paddingBottom: largePadding });

      const applyPadding = (value: number) =>
        gsap.to(inner, {
          paddingTop: value,
          paddingBottom: value,
          duration: reducedMotion ? 0 : 0.35,
          ease: "power3.out",
          overwrite: true,
        });

      const trigger = ScrollTrigger.create({
        trigger: hero,
        start: "25% top",
        onEnter: () => applyPadding(smallPadding),
        onLeaveBack: () => applyPadding(largePadding),
      });

      return () => {
        trigger.kill();
      };
    },
    { dependencies: [reducedMotion] }
  );

  return (
    <header className="sticky top-0 z-40 border-b border-black/10 bg-[rgba(243,239,230,0.82)] backdrop-blur">
      <div
        ref={innerRef}
        className="mx-auto flex w-full max-w-7xl items-center justify-between px-6 py-5 md:px-10"
      >
        <Link href="/#top" className="flex items-center gap-4" onClick={handleLogoClick}>
          <LogoLockup className="shrink-0" />
          <div className="hidden md:block">
            <p className="text-[11px] uppercase tracking-[0.35em] text-ink-soft">
              Deine digitalen Architekten.
            </p>
          </div>
        </Link>
        <Navigation className="hidden md:flex" />
        <button
          type="button"
          className="flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-ink-soft transition-colors hover:text-foreground md:hidden"
          aria-expanded={mobileOpen}
          aria-controls="mobile-nav"
          onClick={() => setMobileOpen((open) => !open)}
        >
          <span className="relative flex h-5 w-6 flex-col justify-center">
            <span
              className={`absolute h-px w-full bg-current transition-transform duration-300 ${
                mobileOpen ? "translate-y-0 rotate-45" : "-translate-y-2"
              }`}
            />
            <span
              className={`absolute h-px w-full bg-current transition-opacity duration-300 ${
                mobileOpen ? "opacity-0" : "opacity-100"
              }`}
            />
            <span
              className={`absolute h-px w-full bg-current transition-transform duration-300 ${
                mobileOpen ? "translate-y-0 -rotate-45" : "translate-y-2"
              }`}
            />
          </span>
          {mobileOpen ? "Close" : "Menu"}
        </button>
      </div>
      <div
        id="mobile-nav"
        aria-hidden={!mobileOpen}
        className={`pointer-events-none fixed inset-0 z-30 md:hidden ${
          mobileOpen ? "pointer-events-auto" : ""
        }`}
      >
        <button
          type="button"
          aria-label="Menü schließen"
          className={`absolute inset-0 bg-[rgba(21,21,20,0.2)] transition-opacity ${
            reducedMotion ? "duration-0" : "duration-300"
          } ${mobileOpen ? "opacity-100" : "opacity-0"}`}
          onClick={() => setMobileOpen(false)}
        />
        <div
          className={`absolute inset-x-0 top-0 border-b border-black/10 bg-[rgba(243,239,230,0.96)] px-6 pb-8 pt-24 shadow-[0_18px_50px_rgba(0,0,0,0.12)] backdrop-blur transition-[opacity,transform] ease-out ${
            reducedMotion ? "duration-0" : "duration-300"
          } ${
            mobileOpen
              ? "translate-y-0 opacity-100"
              : "-translate-y-4 opacity-0"
          }`}
        >
          <div className="mx-auto w-full max-w-6xl">
            <Navigation
              className="w-full flex-col items-start gap-4 text-sm tracking-[0.25em]"
              onNavigate={() => setMobileOpen(false)}
            />
          </div>
        </div>
      </div>
    </header>
  );
}
