"use client";

import { useCallback, useEffect, useRef, useState, type MouseEvent } from "react";
import { CountUp } from "@/components/animations/CountUp";
import { gsap, useGSAP } from "@/lib/gsap";
import { FadeIn } from "@/components/animations/FadeIn";
import { MaskedTextReveal } from "@/components/animations/MaskedTextReveal";
import { useReducedMotion } from "@/hooks/useReducedMotion";

const competencies = [
  "Website ohne Programmierung",
  "Günstige Startup Website",
  "No-Code & Low-Code",
  "SEO-Optimierung 2026",
  "Sichere Website (DSGVO)",
  "Performance & Core Web Vitals",
  "UI/UX Design",
  "Content-Strategie",
  "Barrierefreiheit",
  "Wartung & Support",
  "KI-Integration",
  "Conversion-Optimierung",
];

const principles = [
  "Website ohne Outsourcing: Direkt, transparent, effizient.",
  "Sicher & günstig: DSGVO‑Fokus und klare Pakete.",
  "Schneller Launch: Von 0 auf Website in wenigen Wochen.",
  "E‑E‑A‑T: Klare Struktur, echte Referenzen, messbare Wirkung.",
  "SEO & AEO: Inhalte für Suche und AI Overviews optimiert.",
  "Conversion‑Fokus: Nutzerführung, Vertrauen, klare CTAs.",
  "Startups zuerst: Pragmatismus statt Agentur‑Overhead.",
];

const pillSizes = competencies.map((_, index) => (index % 4 === 0 ? "lg" : "md"));

export function About() {
  const reducedMotion = useReducedMotion();
  const [motionEnabled, setMotionEnabled] = useState(true);
  const sectionRef = useRef<HTMLDivElement>(null);
  const pillsRef = useRef<HTMLButtonElement[]>([]);
  const basePositions = useRef<Array<{ x: number; y: number }>>([]);
  const repelRef = useRef({ x: 0, y: 0, active: false });
  const quickToRef = useRef<Array<{ x: gsap.QuickToFunc; y: gsap.QuickToFunc }>>([]);

  useEffect(() => {
    const media = window.matchMedia("(pointer: fine) and (hover: hover)");
    const update = () => setMotionEnabled(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  useGSAP(
    () => {
      if (reducedMotion || !motionEnabled) return;

      const container = sectionRef.current;
      if (!container) return;

      const buttons = pillsRef.current.filter(Boolean);
      if (buttons.length === 0) return;

      const measure = () => {
        basePositions.current = buttons.map((button) => ({
          x: button.offsetLeft + button.offsetWidth / 2,
          y: button.offsetTop + button.offsetHeight / 2,
        }));
      };

      measure();
      window.addEventListener("resize", measure);

      gsap.from(buttons, {
        y: -220,
        x: () => gsap.utils.random(-30, 30),
        opacity: 0,
        rotate: () => gsap.utils.random(-8, 8),
        stagger: 0.04,
        duration: 0.7,
        ease: "bounce.out",
      });

      quickToRef.current = buttons.map((button) => ({
        x: gsap.quickTo(button, "x", { duration: 0.1, ease: "power3.out" }),
        y: gsap.quickTo(button, "y", { duration: 0.1, ease: "power3.out" }),
      }));

      const tick = (time: number) => {
        buttons.forEach((_, index) => {
          const base = basePositions.current[index];
          const quick = quickToRef.current[index];
          if (!quick || !base) return;

          const floatX = Math.sin(time * 0.0012 + index) * 6;
          const floatY = Math.cos(time * 0.0014 + index * 0.7) * 5;

          let repelX = 0;
          let repelY = 0;

          if (repelRef.current.active) {
            const dx = base.x - repelRef.current.x;
            const dy = base.y - repelRef.current.y;
            const dist = Math.hypot(dx, dy);
            const influence = Math.max(0, 320 - dist) / 320;
            const easedInfluence = influence * influence;
            const push = easedInfluence * 70;
            repelX = dist === 0 ? 0 : (dx / dist) * push;
            repelY = dist === 0 ? 0 : (dy / dist) * push;
          }

          quick.x(floatX + repelX);
          quick.y(floatY + repelY);
        });
      };

      gsap.ticker.add(tick);

      return () => {
        window.removeEventListener("resize", measure);
        gsap.ticker.remove(tick);
        quickToRef.current = [];
      };
    },
    { dependencies: [reducedMotion, motionEnabled] }
  );

  const handleMouseMove = useCallback(
    (event: MouseEvent<HTMLDivElement>) => {
      if (!motionEnabled) return;
      const container = sectionRef.current;
      if (!container) return;
      const rect = container.getBoundingClientRect();
      repelRef.current = {
        x: event.clientX - rect.left,
        y: event.clientY - rect.top,
        active: true,
      };
    },
    [motionEnabled]
  );

  const handleMouseLeave = useCallback(() => {
    if (!motionEnabled) return;
    repelRef.current.active = false;
  }, [motionEnabled]);

  return (
    <section id="about" className="mx-auto w-full max-w-6xl px-6 pb-8 pt-24 md:px-10">
      <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="space-y-6">
          <p className="text-xs uppercase tracking-[0.35em] text-ink-soft">
            Über mich
          </p>
          <MaskedTextReveal
            as="h2"
            className="font-display font-bold text-4xl uppercase tracking-[0.2em] md:text-5xl"
          >
            Website‑Builder für Startups
          </MaskedTextReveal>
          <FadeIn direction="up">
            <p className="text-base text-ink-soft">
              Ich bin Arthur aus Berlin und entwickle günstige, sichere Websites
              für Startups und kleine Unternehmen - ohne Outsourcing. Du bekommst
              eine professionelle Website, die schnell online geht, verständlich
              bleibt und Vertrauen schafft.
            </p>
          </FadeIn>
          <FadeIn direction="up">
            <p className="text-base text-ink-soft">
              Ob Website ohne Programmierung, Relaunch oder MVP‑Seite: Ich
              kombiniere klares Design, SEO‑Basics und DSGVO‑Sicherheit, damit
              du sichtbar wirst und Anfragen bekommst.
            </p>
          </FadeIn>
          <div className="flex flex-wrap items-center gap-4 border border-black/10 bg-white/70 px-4 py-4">
            <span className="font-display text-4xl font-bold uppercase tracking-[0.18em]">
              <CountUp value={8} suffix="+" />
            </span>
            <div>
              <p className="text-xs uppercase tracking-[0.35em] text-ink-soft">
                Jahre Erfahrung
              </p>
              <p className="text-sm text-ink-soft">
                B2B/B2C Konzeption & Entwicklung
              </p>
            </div>
          </div>
        </div>
        <FadeIn direction="up" className="space-y-6">
          <div className="space-y-6 border border-black/10 bg-white/70 p-6">
            <p className="text-xs uppercase tracking-[0.35em] text-ink-soft">
              Leitprinzipien & Werte
            </p>
            <ul className="space-y-4 text-sm text-ink-soft">
              {principles.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <div className="flex items-center justify-between border-t border-black/10 pt-6 text-xs uppercase tracking-[0.35em]">
              <span>Berlin</span>
              <span><b>STACKWERKHAUS</b></span>
            </div>
          </div>
        </FadeIn>
        <FadeIn direction="up" className="hidden space-y-4 lg:col-span-2 md:block">
          <p className="text-xs uppercase tracking-[0.35em] text-ink-soft">
            Kompetenzen
          </p>
          <div
            ref={sectionRef}
            className="relative w-full overflow-hidden p-4 md:h-[320px] lg:h-[380px] md:p-6"
            data-cursor-rest
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
          >
            <div className="relative flex h-full -translate-y-4 flex-wrap content-center items-center justify-center gap-3">
              {competencies.map((item, index) => (
                <button
                  key={item}
                  ref={(el) => {
                    if (el) pillsRef.current[index] = el;
                  }}
                  className={`relative whitespace-nowrap rounded-full border border-black/15 bg-white/90 px-4 py-2 text-xs uppercase tracking-[0.28em] text-ink-soft shadow-[0_10px_22px_rgba(0,0,0,0.08)] ${
                    pillSizes[index] === "lg"
                      ? "md:px-6 md:py-3 md:text-sm"
                      : "md:text-xs"
                  }`}
                >
                  <span className="relative z-10">{item}</span>
                </button>
              ))}
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
