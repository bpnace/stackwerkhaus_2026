"use client";

import { useRef } from "react";
import Image from "next/image";

import { TransitionLink } from "@/components/ui/TransitionLink";
import { gsap, useGSAP } from "@/lib/gsap";
import { useReducedMotion } from "@/hooks/useReducedMotion";


const legalLinks = [
  { href: "/leistungen", label: "Leistungen" },
  { href: "/work", label: "Projekte" },
  { href: "/impressum", label: "Impressum" },
  { href: "/datenschutz", label: "Datenschutz" },
  { href: "/cookie-richtlinien", label: "Cookie-Richtlinien" },
];

const socialLinks = [
  {
    href: "https://www.instagram.com/stackwerkhaus",
    label: "Instagram",
    icon: (
      <Image
        src="/images/logos/instagram_icon.svg"
        alt=""
        width={20}
        height={20}
      />
    ),
  },
  {
    href: "https://www.linkedin.com/in/tarik-arthur-marshall-6112b2239",
    label: "LinkedIn",
    icon: (
      <Image
        src="/images/logos/LinkedIn_icon.svg"
        alt=""
        width={20}
        height={20}
      />
    ),
  },
];

export function Footer() {
  const footerRef = useRef<HTMLElement>(null);
  const iconRef = useRef<HTMLSpanElement>(null);
  const reducedMotion = useReducedMotion();

  useGSAP(
    () => {
      const footer = footerRef.current;
      const icon = iconRef.current;
      if (!footer || !icon || reducedMotion) return;

      gsap.set(icon, { transformOrigin: "50% 50%" });

      const tween = gsap.to(icon, {
        rotate: 180,
        ease: "none",
        scrollTrigger: {
          trigger: footer,
          start: "top bottom",
          end: "bottom bottom",
          scrub: 0.35,
        },
      });

      return () => {
        tween.scrollTrigger?.kill();
        tween.kill();
      };
    },
    { scope: footerRef, dependencies: [reducedMotion] }
  );

  return (
    <footer
      ref={footerRef}
      className="border-t border-black/10 bg-[rgba(243,239,230,0.85)]"
    >
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-6 py-7 text-sm md:flex-row md:items-start md:justify-between md:gap-8 md:px-10 md:py-10">
        <div className="space-y-1.5 md:space-y-2">
          <p className="flex items-center gap-2.5 font-display text-lg font-bold uppercase tracking-[0.14em] md:gap-3 md:text-xl md:tracking-[0.2em]">
            <span
              ref={iconRef}
              className="inline-flex h-6 w-6 shrink-0 items-center justify-center md:h-7 md:w-7"
            >
              <Image
                src="/images/logos/icon.png"
                alt=""
                width={28}
                height={28}
                className="h-6 w-6 md:h-7 md:w-7"
                aria-hidden="true"
              />
            </span>
            <span>STACKWERKHAUS</span>
          </p>
          <p className="text-ink-soft">
            Klare Websites aus Berlin. Für Dienstleister, kleine Unternehmen und
            neue Marken mit Fokus auf Vertrauen, Struktur und Anfragen.
          </p>
          <a
            href="mailto:info@stackwerkhaus.de"
            className="text-ink-soft hover:text-foreground"
          >
            info@stackwerkhaus.de
          </a>
        </div>

        <div className="flex flex-col gap-5 text-[11px] uppercase tracking-[0.2em] md:gap-6 md:text-xs md:tracking-[0.3em]">
          <div className="grid grid-cols-2 gap-x-4 gap-y-3 md:flex md:items-center md:gap-6">
            {legalLinks.map((link) => (
              <TransitionLink
                key={link.href}
                href={link.href}
                className="text-ink-soft transition-colors hover:text-foreground"
              >
                {link.label}
              </TransitionLink>
            ))}
          </div>
          <div className="flex items-center justify-between gap-4 md:gap-6">
            <div className="flex items-center gap-4">
              {socialLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  aria-label={link.label}
                  target="_blank"
                  rel="noreferrer"
                  className="text-ink-soft transition-colors hover:text-foreground"
                >
                  {link.icon}
                </a>
              ))}
            </div>
            <div className="flex items-center gap-3">
              <Image
                src="/images/eu_lock.svg"
                alt="EU Lock"
                width={54}
                height={64}
                className="h-11 w-auto opacity-80 md:h-16"
              />
              <Image
                src="/images/logos/eu_hoster.png"
                alt="EU Hoster"
                width={76}
                height={86}
                className="h-12 w-auto opacity-80 md:h-[86px]"
              />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
