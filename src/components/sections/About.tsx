"use client";

import { useCallback, useEffect, useRef, useState, type MouseEvent } from "react";
import { CountUp } from "@/components/animations/CountUp";
import { gsap, useGSAP } from "@/lib/gsap";
import { FadeIn } from "@/components/animations/FadeIn";
import { MaskedTextReveal } from "@/components/animations/MaskedTextReveal";
import { useReducedMotion } from "@/hooks/useReducedMotion";

const competencies = [
  "Positionierung & Angebotslogik",
  "Website-Struktur",
  "Webdesign",
  "Frontend-Entwicklung",
  "Technisches SEO",
  "Performance",
  "DSGVO-Basis",
  "Content-Führung",
  "Relaunches",
  "Launch-Begleitung",
  "UI/UX Design",
  "Analytics-Grundsetup",
  "Barrierearme Patterns",
  "Wartung & Support",
  "Conversion-Fokus",
];

const principles = [
  "Klare Struktur vor dekorativer Überladung.",
  "Direkte Zusammenarbeit statt Agentur-Schleifen.",
  "Texte, die Leistung verständlich machen.",
  "Mobile zuerst gedacht, nicht nachträglich repariert.",
  "Technische Sauberkeit und DSGVO-Basis als Vertrauensfaktor.",
  "SEO-Grundlage und interne Logik ab Launch mitgedacht.",
  "Design, das Orientierung unterstützt statt sie zu verstecken.",
  "Eine Übergabe, mit der Inhalte später pflegbar bleiben.",
];

const pillSizes = competencies.map((_, index) => (index % 4 === 0 ? "lg" : "md"));

export function About() {
  const reducedMotion = useReducedMotion();
  const [motionEnabled, setMotionEnabled] = useState(true);
  const sectionRef = useRef<HTMLDivElement>(null);
  const pillsRef = useRef<HTMLDivElement[]>([]);
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

      const pills = pillsRef.current.filter(Boolean);
      if (pills.length === 0) return;

      const measure = () => {
        basePositions.current = pills.map((pill) => ({
          x: pill.offsetLeft + pill.offsetWidth / 2,
          y: pill.offsetTop + pill.offsetHeight / 2,
        }));
      };

      measure();
      window.addEventListener("resize", measure);

      gsap.from(pills, {
        y: -220,
        x: () => gsap.utils.random(-30, 30),
        opacity: 0,
        rotate: () => gsap.utils.random(-8, 8),
        stagger: 0.04,
        duration: 0.7,
        ease: "bounce.out",
      });

      quickToRef.current = pills.map((pill) => ({
        x: gsap.quickTo(pill, "x", { duration: 0.1, ease: "power3.out" }),
        y: gsap.quickTo(pill, "y", { duration: 0.1, ease: "power3.out" }),
      }));

      const tick = () => {
        pills.forEach((_, index) => {
          const base = basePositions.current[index];
          const quick = quickToRef.current[index];
          if (!quick || !base) return;

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

          quick.x(repelX);
          quick.y(repelY);
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
    <section
      className="mx-auto w-full max-w-6xl px-6 pb-8 pt-24 md:px-10"
    >
      <div className="grid items-end gap-10 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="flex flex-col gap-8 text-left">
          <div id="about" className="scroll-mt-24 space-y-3">
            <p className="text-xs uppercase tracking-[0.35em] text-ink-soft">
              Über uns
            </p>
            <MaskedTextReveal
              as="h2"
              className="font-display font-bold text-4xl uppercase tracking-[0.2em] md:text-5xl"
            >
              Wer ist STACKWERKHAUS?
            </MaskedTextReveal>
          </div>
          <div className="mx-auto flex w-full max-w-xl flex-col space-y-6">
            <FadeIn direction="up">
              <p className="text-left text-base text-ink-soft">
                <b>STACKWERKHAUS</b> aus Berlin entwickelt Websites für Unternehmen, die
                online klarer wirken und weniger Erklärarbeit leisten
                wollen. Wir verbinden Positionierung, Content-Führung, Design und
                technische Umsetzung so, dass Besucher schneller verstehen, was
                angeboten wird und wie der nächste Schritt aussieht.
              </p>
            </FadeIn>
            <FadeIn direction="up">
              <p className="text-left text-base text-ink-soft">
                Der Schwerpunkt liegt auf Dienstleistern, kleinen Unternehmen und
                neuen Marken im DACH-Raum. Ob neuer Auftritt oder Relaunch:
                Wichtig ist, dass Struktur, Vertrauen und Anfragepfad zusammen
                gedacht werden statt in separaten Einzelschritten zu enden.
              </p>
            </FadeIn>
            <div className="flex w-full flex-col items-center gap-4 border border-black/10 bg-white/70 px-5 py-5 text-center md:flex-row md:text-left">
              <span className="font-display text-4xl font-bold uppercase tracking-[0.18em]">
                <CountUp value={8} suffix="+" />
              </span>
              <div className="max-w-sm">
                <p className="text-xs uppercase tracking-[0.35em] text-ink-soft">
                  Jahre Erfahrung
                </p>
                <p className="text-sm text-ink-soft">
                  Strategie, Design und Entwicklung für serviceorientierte Marken
                </p>
              </div>
            </div>
          </div>
        </div>
        <FadeIn direction="up" className="hidden md:block md:h-full md:w-full md:max-w-xl lg:max-w-none">
          <div className="flex h-full flex-col gap-6 border border-black/10 bg-white/70 p-5 text-center md:p-6 md:text-left">
            <p className="text-xs uppercase tracking-[0.35em] text-ink-soft">
              Leitprinzipien & Werte
            </p>
            <ul className="mx-auto w-full max-w-xl space-y-4 text-sm text-ink-soft md:mx-0">
              {principles.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <div className="mt-auto flex items-center justify-center gap-4 border-t border-black/10 pt-6 text-xs uppercase tracking-[0.35em] md:justify-between md:gap-0">
              <span>Berlin</span>
              <span><b>STACKWERKHAUS</b></span>
            </div>
          </div>
        </FadeIn>
        <FadeIn direction="up" className="hidden">
          <p className="text-center text-xs uppercase tracking-[0.35em] text-ink-soft">
            Kompetenzen
          </p>
          <div className="flex flex-wrap justify-center gap-2">
            {competencies.map((item) => (
              <span
                key={item}
                className="inline-flex items-center justify-center rounded-full border border-black/15 bg-white/90 px-4 py-2 text-center text-[11px] uppercase tracking-[0.24em] text-ink-soft shadow-[0_10px_22px_rgba(0,0,0,0.08)]"
              >
                {item}
              </span>
            ))}
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
                <div
                  key={item}
                  ref={(el) => {
                    if (el) pillsRef.current[index] = el;
                  }}
                >
                  <button
                    className={`relative whitespace-nowrap rounded-full border border-black/15 bg-white/90 px-4 py-2 text-xs uppercase tracking-[0.28em] text-ink-soft shadow-[0_10px_22px_rgba(0,0,0,0.08)] ${
                      pillSizes[index] === "lg"
                        ? "md:px-6 md:py-3 md:text-sm"
                        : "md:text-xs"
                    }`}
                  >
                    <span className="relative z-10">{item}</span>
                  </button>
                </div>
              ))}
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
