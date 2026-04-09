"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { useReducedMotion } from "@/hooks/useReducedMotion";

const skills = [
  "Positionierung & Angebotslogik",
  "Website-Struktur",
  "Webdesign",
  "Content-Führung",
  "Relaunch",
  "Technisches SEO",
  "Performance",
  "DSGVO-Basis",
  "Frontend-Entwicklung",
  "Launch-Begleitung",
  "Analytics-Grundsetup",
  "Wartung & Support",
  "Barrierearme Patterns",
  "UI/UX Design",
  "Conversion-Fokus",
];

export function Skills() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const reducedMotion = useReducedMotion();

  useGSAP(
    () => {
      const section = sectionRef.current;
      if (!section || reducedMotion) return;

      const pills = gsap.utils.toArray<HTMLElement>("[data-skill-pill]", section);
      if (pills.length === 0) return;

      gsap.set(pills, {
        autoAlpha: 0,
        filter: "blur(20px)",
        y: 20,
        willChange: "transform, filter, opacity",
      });

      gsap.to(pills, {
        autoAlpha: 1,
        filter: "blur(0px)",
        y: 0,
        duration: 1,
        ease: "power2.out",
        stagger: {
          each: 0.12,
          from: "random",
        },
        clearProps: "willChange",
        scrollTrigger: {
          trigger: section,
          start: "top 80%",
          once: true,
        },
      });
    },
    { dependencies: [reducedMotion], scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      id="skills"
      className="border-y border-white/15 bg-black py-12 text-white"
      aria-labelledby="skills-title"
    >
      <div className="mx-auto w-full max-w-6xl px-6 md:px-10">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div className="space-y-3">
            <p className="text-xs uppercase tracking-[0.35em] text-white/55">
              Kompetenzen
            </p>
            <h2
              id="skills-title"
              className="font-display text-3xl font-bold uppercase tracking-[0.2em] md:text-4xl"
            >
              Strategie, Design und Umsetzung in einem System
            </h2>
          </div>
        </div>

        <ul className="mt-8 flex flex-wrap justify-center gap-3">
          {skills.map((skill) => (
            <li
              key={skill}
              data-skill-pill
              className="rounded-full border border-white/15 px-4 py-2 text-[11px] uppercase tracking-[0.28em] text-white/80"
            >
              {skill}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
