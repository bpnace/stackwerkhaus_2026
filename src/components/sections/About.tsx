import { CountUp } from "@/components/animations/CountUp";

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

export function About() {
  return (
    <section className="mx-auto w-full max-w-6xl px-6 pb-8 pt-24 md:px-10">
      <div className="grid items-start gap-10 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="flex flex-col gap-8 text-left">
          <div id="about" className="section-anchor space-y-3">
            <p className="text-xs uppercase tracking-[0.35em] text-ink-soft">
              Über uns
            </p>
            <h2 className="font-display font-bold text-4xl uppercase tracking-[0.2em] md:text-5xl">
              Wer ist STACKWERKHAUS?
            </h2>
          </div>
          <div className="mx-auto flex w-full max-w-xl flex-col space-y-6">
            <p className="text-left text-base text-ink-soft">
              <b>STACKWERKHAUS</b> aus Berlin entwickelt Websites für Unternehmen, die
              online klarer wirken und weniger Erklärarbeit leisten wollen. Wir
              verbinden Positionierung, Content-Führung, Design und technische
              Umsetzung so, dass Besucher schneller verstehen, was angeboten wird
              und wie der nächste Schritt aussieht.
            </p>
            <p className="text-left text-base text-ink-soft">
              Der Schwerpunkt liegt auf Dienstleistern, kleinen Unternehmen und
              neuen Marken im DACH-Raum. Ob neuer Auftritt oder Relaunch:
              Wichtig ist, dass Struktur, Vertrauen und Anfragepfad zusammen
              gedacht werden statt in separaten Einzelschritten zu enden.
            </p>
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
            <span>
              <b>STACKWERKHAUS</b>
            </span>
          </div>
        </div>

        <div className="space-y-4 lg:col-span-2">
          <p className="text-xs uppercase tracking-[0.35em] text-ink-soft">
            Kompetenzen
          </p>
          <div className="flex flex-wrap gap-3">
            {competencies.map((item) => (
              <span
                key={item}
                className="inline-flex items-center justify-center rounded-full border border-black/15 bg-white/90 px-4 py-2 text-center text-[11px] uppercase tracking-[0.24em] text-ink-soft shadow-[0_10px_22px_rgba(0,0,0,0.08)] md:text-xs"
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
