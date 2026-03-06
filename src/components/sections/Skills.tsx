"use client";

import dynamic from "next/dynamic";
import { Marquee } from "@/components/animations/Marquee";

const SkillsWarpBackground = dynamic(
  () =>
    import("@/components/ui/skills-warp-background").then((m) => ({
      default: m.SkillsWarpBackground,
    })),
  {
    ssr: false,
  },
);

const skills = [
  "Website-Strategie",
  "Webdesign",
  "Content-Führung",
  "Relaunch",
  "Technisches SEO",
  "Performance",
  "DSGVO-Basis",
  "Responsives Frontend",
  "Launch-Begleitung",
  "Analytics-Grundsetup",
  "Wartung & Support",
  "Barrierearme Patterns",
  "UI/UX Design",
  "Conversion-Fokus",
  "Struktur & Nutzerführung",
];

export function Skills() {
  return (
    <section
      id="skills"
      className="relative overflow-hidden border-y border-white/15 bg-black text-white"
    >
      <SkillsWarpBackground className="[mask-image:linear-gradient(to_bottom,transparent,black_14%,black_86%,transparent)]" />
      <div className="pointer-events-none absolute inset-0 z-[1] bg-[radial-gradient(920px_430px_at_14%_0%,rgba(198,90,46,0.1),transparent_60%),radial-gradient(980px_460px_at_86%_100%,rgba(255,255,255,0.04),transparent_66%)]" />

      <div className="relative z-10">
        <Marquee speed={32} mobileSpeed={20} direction="left" className="py-6">
          {skills.map((skill) => (
            <span
              key={skill}
              className="marquee-item mx-6 px-4 py-2 font-display text-xl uppercase tracking-[0.2em] text-white/75 sm:mx-8 sm:text-2xl sm:tracking-[0.25em] md:mx-10 md:text-3xl md:tracking-[0.3em]"
            >
              {skill}
            </span>
          ))}
        </Marquee>

        <div className="mx-auto flex w-full max-w-6xl flex-col items-center gap-3 px-6 py-10 text-center text-xs uppercase tracking-[0.35em] text-white md:flex-row md:justify-between md:gap-6 md:px-10">
          <span className="px-4 py-3">
            Klare Nutzerführung auf jedem Gerät
          </span>
          <span className="px-4 py-3">
            Vertrauen, Struktur und saubere Technik
          </span>
          <span className="px-4 py-3">
            Design, das Leistung verständlich macht
          </span>
        </div>

        <Marquee speed={32} mobileSpeed={20} direction="right" className="py-6">
          {skills.map((skill) => (
            <span
              key={skill}
              className="marquee-item mx-6 px-4 py-2 font-display text-xl uppercase tracking-[0.2em] text-white/75 sm:mx-8 sm:text-2xl sm:tracking-[0.25em] md:mx-10 md:text-3xl md:tracking-[0.3em]"
            >
              {skill}
            </span>
          ))}
        </Marquee>
      </div>
    </section>
  );
}
