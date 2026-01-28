"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSmoothScroll } from "@/providers/SmoothScrollProvider";
import { Navigation } from "@/components/layout/Navigation";

export function Header() {
  const pathname = usePathname();
  const { scrollTo } = useSmoothScroll();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleLogoClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    if (pathname !== "/") return;
    event.preventDefault();
    scrollTo(0, { immediate: true });
  };

  return (
    <header className="sticky top-0 z-40 border-b border-black/10 bg-[rgba(243,239,230,0.82)] backdrop-blur">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-6 md:px-10">
        <Link href="/#top" className="flex items-center gap-4" onClick={handleLogoClick}>
          <Image
            src="/images/logos/skwkhs.svg"
            alt="STACKWERKHAUS"
            width={40}
            height={40}
            className="h-10 w-20"
          />
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
