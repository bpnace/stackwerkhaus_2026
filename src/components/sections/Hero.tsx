import { FadeIn } from "@/components/animations/FadeIn";
import { MaskedTextReveal } from "@/components/animations/MaskedTextReveal";
import { MagneticLink } from "@/components/animations/MagneticLink";

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-6 pb-24 pt-16 md:px-10 md:pb-32 md:pt-20">
        <FadeIn direction="up" className="flex flex-wrap items-center gap-4">
          <span className="text-xs uppercase tracking-[0.35em] text-ink-soft">
            Überzeugende Websites für Startups
          </span>
          <span className="text-xs uppercase tracking-[0.35em] text-ink-soft">
            <b>Sicher. Schnell. Direkt.</b>
          </span>
        </FadeIn>

        <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="space-y-6">
            <MaskedTextReveal
              as="h1"
              className="relative z-10 font-display font-bold text-[12vw] leading-[0.82] tracking-[-0.02em] md:text-[6.5vw]"
              lastLinePaddingEm={0.23}
            >
              Verkaufsstarke Webseiten, die deine Kunden überzeugen.
            </MaskedTextReveal>
            <FadeIn direction="up" className="relative z-0 mt-2">
              <p className="max-w-xl text-lg text-ink-soft md:text-xl">
                Webdesign für Startups, Selbstständige und kleine Unternehmen:
                bezahlbar, sicher und ohne viel Aufwand. Du bekommst eine
                professionelle Website mit klarem Aufbau, SEO-Basis und DSGVO-
                Fokus in kurzer Zeit.
              </p>
            </FadeIn>
          </div>

          <FadeIn direction="up" className="flex flex-col gap-8">
            <div className="flex flex-col gap-8 border border-black/10 bg-white/70 p-6 shadow-[0_20px_60px_rgba(0,0,0,0.08)]">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-xs uppercase tracking-[0.35em] text-ink-soft">
                    Ablauf
                  </p>
                  <p className="text-2xl uppercase tracking-[0.2em]">
                    In 5 Schritten online
                  </p>
                </div>
                <span className="text-xs font-bold uppercase tracking-[0.3em]">
                  STARTUP
                </span>
              </div>
              <div className="space-y-3 text-sm text-ink-soft">
                <p>⚎ Ziel & Konzept</p>
                <p>⚎ Struktur & Inhalte</p>
                <p>⚎ Design & UI</p>
                <p>⚎ Entwicklung & SEO</p>
                <p>⚎ Launch & Support</p>
              </div>
              <MagneticLink
                href="#work"
                className="inline-flex items-center justify-between border border-black/20 px-5 py-4 text-xs uppercase tracking-[0.3em] transition-colors transition-shadow hover:bg-black hover:text-white hover:shadow-[0_12px_30px_rgba(0,0,0,0.12)] focus-visible:shadow-[0_12px_30px_rgba(0,0,0,0.12)]"
                data-cursor-ignore
              >
                Projekte & Beispiele
                <span className="text-lg">↘</span>
              </MagneticLink>
            </div>
          </FadeIn>
        </div>

        <FadeIn
          direction="up"
          trigger="load"
          delay={0.95}
          className="hidden flex-wrap items-center justify-between gap-6 border-t border-black/10 pt-10 text-xs uppercase tracking-[0.35em] text-ink-soft md:flex"
        >
          <span>Berlin / Remote</span>
          <span>Websites für Startups & junge Businesses</span>
          <span>Scroll</span>
        </FadeIn>
      </div>
    </section>
  );
}
