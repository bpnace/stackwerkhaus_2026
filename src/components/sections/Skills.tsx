import { Marquee } from "@/components/animations/Marquee";

const skills = [
  "Webentwicklung",
  "UI/UX Design",
  "Branding",
  "Beratung",
  "Konzept",
  "Design",
  "Entwicklung",
  "Launch",
  "Responsive Design",
  "SEO",
  "Performance Optimierung",
  "Content Management",
  "E-Commerce",
  "Wartung & Support",
  "KI-Integration",
  "Full-Stack Lösungen",
  "Accessibility",
  "Sicherheit",
  "Analytics",
  "Conversion Optimierung",
  "Social Media Integration",
];

export function Skills() {
  return (
    <section id="skills" className="border-y border-black/10 bg-white/60">
      <Marquee speed={32} mobileSpeed={20} direction="left" className="py-6">
        {skills.map((skill) => (
          <span
            key={skill}
            className="marquee-item mx-6 font-display text-2xl uppercase tracking-[0.2em] text-ink-soft/70 sm:mx-8 sm:text-2xl sm:tracking-[0.25em] md:mx-10 md:text-3xl md:tracking-[0.3em]"
          >
            {skill}
          </span>
        ))}
      </Marquee>

      <div className="mx-auto flex w-full max-w-6xl flex-col items-center gap-2 px-6 py-10 text-center text-xs uppercase tracking-[0.35em] text-ink-soft md:flex-row md:justify-between md:gap-6 md:text-left md:px-10">
        <span>Moderne Websites auf jedem Gerät</span>
        <span>Klarer Look, stimmiges Gefühl</span>
        <span>Branding, das zu dir passt</span>
      </div>

      <Marquee speed={32} mobileSpeed={20} direction="right" className="py-6">
        {skills.map((skill) => (
          <span
            key={skill}
            className="marquee-item mx-6 font-display text-2xl uppercase tracking-[0.2em] text-ink-soft/70 sm:mx-8 sm:text-2xl sm:tracking-[0.25em] md:mx-10 md:text-3xl md:tracking-[0.3em]"
          >
            {skill}
          </span>
        ))}
      </Marquee>
    </section>
  );
}
