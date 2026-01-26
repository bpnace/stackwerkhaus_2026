import { FadeIn } from "@/components/animations/FadeIn";
import { MaskedTextReveal } from "@/components/animations/MaskedTextReveal";
import { MagneticLink } from "@/components/animations/MagneticLink";
import { ParallaxOrb } from "@/components/animations/ParallaxOrb";

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-6 pb-24 pt-16 md:px-10 md:pb-32 md:pt-24">
        <FadeIn direction="up" className="flex flex-wrap items-center gap-4">
          <span className="text-xs uppercase tracking-[0.35em] text-ink-soft">
            Webdesign ohne Technikstress
          </span>
          <span className="text-xs uppercase tracking-[0.35em] text-ink-soft">
            <b>Klar. Schnell. Fair.</b>
          </span>
        </FadeIn>

        <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="space-y-6">
            <MaskedTextReveal
              as="h1"
              className="font-display font-bold text-[12vw] leading-[0.82] tracking-[-0.02em] md:text-[6.5vw]"
            >
              Deine Webseite? Ganz einfach!
            </MaskedTextReveal>
            <FadeIn direction="up">
              <p className="max-w-xl text-lg text-ink-soft md:text-xl">
                Webdesign, das sich jeder leisten kann. Ich übernehme Konzeption,
                Design und Umsetzung, dafür bekommst du eine moderne Website, ganz
                ohne Aufwand und zum fairen Preis.
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
                    In 5 Schritten live
                  </p>
                </div>
                <span className="text-xs font-bold uppercase tracking-[0.3em]">
                  STWKHS
                </span>
              </div>
              <div className="space-y-3 text-sm text-ink-soft">
                <p>⚎ Beratung</p>
                <p>⚎ Konzept</p>
                <p>⚎ Design</p>
                <p>⚎ Entwicklung</p>
                <p>⚎ Launch</p>
              </div>
              <MagneticLink
                href="#work"
                className="inline-flex items-center justify-between border border-black/20 px-5 py-4 text-xs uppercase tracking-[0.3em] transition-colors transition-shadow hover:bg-black hover:text-white hover:shadow-[0_12px_30px_rgba(0,0,0,0.12)] focus-visible:shadow-[0_12px_30px_rgba(0,0,0,0.12)]"
                data-cursor-ignore
              >
                Projekte ansehen
                <span className="text-lg">↘</span>
              </MagneticLink>
            </div>
          </FadeIn>
        </div>

        <FadeIn
          direction="up"
          className="flex flex-wrap items-center justify-between gap-6 border-t border-black/10 pt-10 text-xs uppercase tracking-[0.35em] text-ink-soft"
        >
          <span>Berlin / Remote</span>
          <span>Websites für Startups & junge Businesses</span>
          <span>Scroll</span>
        </FadeIn>
      </div>

      <ParallaxOrb
        className="pointer-events-none absolute -right-24 top-24 hidden h-64 w-64 rounded-full border border-black/10 lg:block"
        speed={0.08}
      />
      <ParallaxOrb
        className="pointer-events-none absolute -left-12 bottom-10 hidden h-40 w-40 rounded-full border border-black/10 lg:block"
        speed={0.14}
      />
    </section>
  );
}
