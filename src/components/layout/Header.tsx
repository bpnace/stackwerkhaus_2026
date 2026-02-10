"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSmoothScroll } from "@/providers/SmoothScrollProvider";
import { Navigation } from "@/components/layout/Navigation";
import { LogoLockup } from "@/components/layout/LogoLockup";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export function Header() {
  const pathname = usePathname();
  const { scrollTo } = useSmoothScroll();
  const [mobileOpen, setMobileOpen] = useState(false);
  const innerRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  const handleLogoClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    if (pathname !== "/") return;
    event.preventDefault();
    scrollTo(0, { immediate: true });
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
        className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 md:px-10"
      >
        <Link href="/#top" className="flex items-center gap-4" onClick={handleLogoClick}>
          <LogoLockup className="shrink-0" />
          <div className="hidden md:block">
            <p className="font-display font-bold text-lg uppercase tracking-[0.2em]">
              STACKWERKHAUS
            </p>
            <p className="text-[11px] uppercase tracking-[0.35em] text-ink-soft">
              Dein Berliner Design Studio
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
        className={`border-t border-black/10 bg-[rgba(243,239,230,0.92)] backdrop-blur md:hidden ${
          mobileOpen ? "block" : "hidden"
        }`}
      >
        <div className="mx-auto w-full max-w-6xl px-6 py-6">
          <Navigation
            className="flex-col items-start gap-4 text-sm tracking-[0.25em]"
            onNavigate={() => setMobileOpen(false)}
          />
        </div>
      </div>
    </header>
  );
}
