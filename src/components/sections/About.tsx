import { CountUp } from "@/components/animations/CountUp";
import { FadeIn } from "@/components/animations/FadeIn";
import { MaskedTextReveal } from "@/components/animations/MaskedTextReveal";

const competencies = [
  "Web & App Entwicklung mit TypeScript, React und Next.js",
  "KI-Integration für smarte Prozesse und Personalisierung",
  "UI/UX Design mit klarer Struktur und starker Markenwirkung",
  "Projektmanagement mit Notion und agilen Methoden",
  "Komplexes klar erklären und Kundenbedürfnisse präzise erfassen",
];

const principles = [
  "Tech trifft Business: Digitale Produkte, die konvertieren.",
  "KI als Multiplikator: Mehr Wirkung in kürzerer Zeit.",
  "Transparenz & Partnerschaft: Klare Kommunikation auf Augenhöhe.",
  "Berliner Innovation: Frische Perspektiven aus der Tech-Szene.",
];

export function About() {
  return (
    <section id="about" className="mx-auto w-full max-w-6xl px-6 py-24 md:px-10">
      <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="space-y-6">
          <p className="text-xs uppercase tracking-[0.35em] text-ink-soft">
            Über mich
          </p>
          <MaskedTextReveal
            as="h2"
            className="font-display font-bold text-4xl uppercase tracking-[0.2em] md:text-5xl"
          >
            Tarik Marshall
          </MaskedTextReveal>
          <FadeIn direction="up">
            <p className="text-base text-ink-soft">
              Hey, ich bin Tarik aus Berlin – Gründer von STACKWERKHAUS und dein
              Ansprechpartner für deine Website. Ich mach’s dir einfach: Du
              sagst mir, was du brauchst, und ich kümmere mich um den Rest.
              Keine Fachbegriffe, kein Technikstress.
            </p>
          </FadeIn>
          <FadeIn direction="up">
            <p className="text-base text-ink-soft">
              Ich verbinde langjährige B2B/B2C-Erfahrung mit technischer
              Expertise und KI-Innovation, um digitale Produkte zu schaffen, die
              nicht nur ästhetisch überzeugen, sondern nachhaltige Werte für
              dein Unternehmen generieren.
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
                B2B/B2C Key Account Management
              </p>
            </div>
          </div>
          <div className="grid gap-3 text-sm text-ink-soft">
            {competencies.map((item) => (
              <div key={item} className="border border-black/10 px-4 py-3">
                {item}
              </div>
            ))}
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
              <span>STACKWERKHAUS</span>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
