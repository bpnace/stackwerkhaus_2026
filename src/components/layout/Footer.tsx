"use client";

import { useRef } from "react";
import Image from "next/image";

import { TransitionLink } from "@/components/ui/TransitionLink";
import { gsap, useGSAP } from "@/lib/gsap";
import { useReducedMotion } from "@/hooks/useReducedMotion";

const studioLinks = [
  { href: "/leistungen", label: "Leistungen" },
  { href: "/work", label: "Projekte" },
  { href: "/#faq", label: "FAQ" },
  { href: "/#contact", label: "Kontakt" },
];

const legalLinks = [
  { href: "/impressum", label: "Impressum" },
  { href: "/datenschutz", label: "Datenschutz" },
  { href: "/cookie-richtlinien", label: "Cookie-Richtlinien" },
];

const socialLinks = [
  {
    href: "https://www.instagram.com/stackwerkhaus",
    label: "Instagram",
    iconSrc: "/images/logos/instagram_icon.svg",
  },
  {
    href: "https://www.linkedin.com/in/tarik-arthur-marshall-6112b2239",
    label: "LinkedIn",
    iconSrc: "/images/logos/LinkedIn_icon.svg",
  },
];

export function Footer() {
  const footerRef = useRef<HTMLElement>(null);
  const iconRef = useRef<HTMLSpanElement>(null);
  const reducedMotion = useReducedMotion();
  const FULL_SPIN_DEGREES = 1080;

  useGSAP(
    () => {
      const footer = footerRef.current;
      const icon = iconRef.current;
      if (!footer || !icon || reducedMotion) return;

      gsap.set(icon, { transformOrigin: "50% 50%" });

      const tween = gsap.to(icon, {
        rotate: FULL_SPIN_DEGREES,
        ease: "none",
        scrollTrigger: {
          trigger: footer,
          start: "top bottom",
          end: "bottom bottom",
          scrub: 0.35,
          onUpdate: () => {
            const scrolledToBottom =
              window.scrollY + window.innerHeight >=
              document.documentElement.scrollHeight - 1;

            // Lock to a full-turn angle at page bottom so the icon sits straight.
            if (scrolledToBottom) {
              gsap.set(icon, { rotate: FULL_SPIN_DEGREES });
            }
          },
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
      className="relative overflow-hidden border-t border-white/10 bg-[linear-gradient(180deg,rgba(27,25,23,0.96),rgba(10,10,9,0.99))] text-white"
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent,rgba(210,176,115,0.45),transparent)]" />
      <div className="pointer-events-none absolute -left-20 top-10 h-48 w-48 rounded-full bg-[radial-gradient(circle,rgba(198,90,46,0.18),transparent_68%)]" />
      <div className="pointer-events-none absolute right-0 top-0 h-56 w-56 bg-[radial-gradient(circle,rgba(255,255,255,0.08),transparent_65%)]" />

      <div className="mx-auto w-full max-w-7xl px-6 py-8 md:px-10 md:py-12">
        <div className="grid gap-10 border-b border-white/10 pb-8 md:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] md:gap-14 md:pb-10">
          <div className="space-y-5">
            <p className="text-[11px] uppercase tracking-[0.35em] text-white/55">
              Berlin / Remote
            </p>

            <div className="space-y-3">
              <p className="flex items-center gap-2.5 font-display text-lg font-bold uppercase tracking-[0.14em] md:gap-3 md:text-2xl md:tracking-[0.2em]">
                <span
                  ref={iconRef}
                  className="inline-flex h-6 w-6 shrink-0 items-center justify-center md:h-7 md:w-7"
                >
                  <Image
                    src="/images/logos/icon2.png"
                    alt=""
                    width={28}
                    height={28}
                    className="h-6 w-6 rounded-full p-0.5 md:h-7 md:w-7"
                    aria-hidden="true"
                  />
                </span>
                <span>STACKWERKHAUS</span>
              </p>

              <p className="max-w-xl text-sm leading-relaxed text-white/72 md:text-[15px]">
                Digitale Auftritte mit klarer Struktur, ruhiger Markenführung
                und sauberen Kontaktpfaden. Für Dienstleister, KMU und neue
                Marken, die professionell auftreten und schneller zu passenden
                Anfragen kommen wollen.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3 text-[11px] uppercase tracking-[0.28em]">
              <a
                href="mailto:info@stackwerkhaus.de"
                className="inline-flex items-center gap-2 border border-white/15 bg-white/8 px-3 py-2 text-white transition-colors hover:border-white/25 hover:bg-white/12"
              >
                Projektanfrage
                <span className="text-white/65">info@stackwerkhaus.de</span>
              </a>
              <span className="text-white/50">Aus Berlin für DACH</span>
            </div>
          </div>

          <div className="grid gap-8 sm:grid-cols-2">
            <div className="space-y-4">
              <p className="text-[11px] uppercase tracking-[0.35em] text-white/55">
                Studio
              </p>
              <div className="flex flex-col gap-3 text-xs uppercase tracking-[0.3em]">
                {studioLinks.map((link) => (
                  <TransitionLink
                    key={link.href}
                    href={link.href}
                    className="text-white/72 transition-colors hover:text-white"
                  >
                    {link.label}
                  </TransitionLink>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <p className="text-[11px] uppercase tracking-[0.35em] text-white/55">
                Rechtliches
              </p>
              <div className="flex flex-col gap-3 text-xs uppercase tracking-[0.3em]">
                {legalLinks.map((link) => (
                  <TransitionLink
                    key={link.href}
                    href={link.href}
                    className="text-white/72 transition-colors hover:text-white"
                  >
                    {link.label}
                  </TransitionLink>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-6 pt-6 md:flex-row pb-5 md:items-center md:justify-between">
          <div className="space-y-4">
            <div className="inline-flex flex-wrap gap-3">
           <p className="text-[11px] inline-flex uppercase tracking-[0.28em] items-center text-white/45">
              STACKWERKHAUS 2026 · Berlin / Remote
            </p>
              {socialLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 px-3 py-2 text-[11px] uppercase tracking-[0.28em] text-white/72 transition-colors hover:border-white/22 hover:bg-white/12 hover:text-white"
                >
                  <Image
                    src={link.iconSrc}
                    alt=""
                    width={18}
                    height={18}
                    aria-hidden="true"
                  />
                  <span>{link.label}</span>
                </a>
              ))}
            </div>

          </div>

          <div className="flex flex-col items-start gap-3 md:items-end">
            <div className="flex items-center gap-3  px-4 py-3">
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
                width={54}
                height={64}
                className="h-11 w-auto opacity-80 md:h-16"
              />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
