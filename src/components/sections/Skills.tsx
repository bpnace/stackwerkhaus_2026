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
      className="border-y border-white/15 bg-black py-12 text-white"
      aria-labelledby="skills-title"
    >
      <div className="mx-auto w-full max-w-6xl px-6 md:px-10">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div className="space-y-3">
            <p className="text-xs uppercase tracking-[0.35em] text-white/55">
              Was wir mitbringen
            </p>
          </div>
        </div>

        <ul className="mt-8 flex flex-wrap gap-3">
          {skills.map((skill) => (
            <li
              key={skill}
              className="rounded-full border border-white/15 bg-white/8 px-4 py-2 text-[11px] uppercase tracking-[0.28em] text-white/80"
            >
              {skill}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
