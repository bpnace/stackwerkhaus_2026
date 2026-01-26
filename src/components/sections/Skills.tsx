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
      <Marquee speed={32} direction="left" className="py-6">
        {skills.map((skill) => (
          <span
            key={skill}
            className="marquee-item font-display text-3xl uppercase tracking-[0.3em] text-ink-soft/70 mx-10"
          >
            {skill}
          </span>
        ))}
      </Marquee>

      <div className="mx-auto flex w-full max-w-6xl flex-wrap items-center justify-between gap-6 px-6 py-10 text-xs uppercase tracking-[0.35em] text-ink-soft md:px-10">
        <span>Moderne Websites auf jedem Gerät</span>
        <span>Klarer Look, stimmiges Gefühl</span>
        <span>Branding, das zu dir passt</span>
      </div>

      <Marquee speed={32} direction="right" className="py-6">
        {skills.map((skill) => (
          <span
            key={skill}
            className="marquee-item font-display text-3xl uppercase tracking-[0.3em] text-ink-soft/70 mx-10"
          >
            {skill}
          </span>
        ))}
      </Marquee>
    </section>
  );
}
