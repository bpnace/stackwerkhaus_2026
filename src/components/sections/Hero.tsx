import { MagneticLink } from "@/components/animations/MagneticLink";
import { ScrollHint } from "@/components/animations/ScrollHint";

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-6 pb-14 pt-5 md:px-10 md:pb-32 md:pt-10">
        <div className="flex flex-wrap items-center justify-center gap-4 text-center md:justify-start md:text-left">
          <span className="text-xs uppercase tracking-[0.35em] text-ink-soft">
            Wir gestalten deinen Webauftritt.
          </span>
          <span className="text-xs uppercase tracking-[0.35em] text-ink-soft">
            <b>Klar. Schnell. Direkt.</b>
          </span>
        </div>

        <div className="grid gap-10 lg:grid-cols-[1.15fr_0.80fr]">
          <div className="space-y-6 text-center md:text-left">
            <h1 className="relative z-10 mx-auto max-w-5xl font-display font-bold text-[12vw] leading-[0.82] tracking-[-0.02em] md:mx-0 md:text-[6.5vw]">
              Ein digitales Zuhause für deine Marke.
            </h1>
            <div className="relative z-0 mt-10 md:mt-20">
              <p className="mx-auto max-w-xl text-lg text-ink-soft md:mx-0 md:text-l">
                <b>STACKWERKHAUS</b> entwickelt Websites mit Substanz.
                Du bekommst ein digitales Bauwerk: saubere Struktur,
                verständliche Nutzerführung, SEO-Basis und datenschutzbewusste
                Umsetzung. Stockwerk für Stockwerk.
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-10">
            <div className="mx-auto flex w-full max-w-[28rem] flex-col gap-6 border border-black/10 bg-white/70 p-5 text-center shadow-[0_20px_60px_rgba(0,0,0,0.08)] md:mx-0 md:max-w-none md:gap-8 md:p-6 md:text-left">
              <div className="flex flex-col items-center gap-3 md:flex-row md:items-start md:justify-between">
                <div>
                  <p className="text-xs uppercase tracking-[0.35em] text-ink-soft">
                    Projektlogik
                  </p>
                  <p className="text-xl uppercase tracking-[0.18em] md:text-2xl md:tracking-[0.2em]">
                    In 5 Schritten online
                  </p>
                </div>
                <span className="text-xs font-bold uppercase tracking-[0.3em]">
                  SKWKHS
                </span>
              </div>
              <div className="text-sm text-ink-soft">
                <div className="space-y-2 md:space-y-3">
                  <p>⚎ Ziel & Konzept</p>
                  <p>⚎ Struktur & Inhalte</p>
                  <p>⚎ Design & UI</p>
                  <p>⚎ Entwicklung & SEO</p>
                  <p>⚎ Launch & Support</p>
                </div>
              </div>
              <div className="flex flex-col gap-3">
                <MagneticLink
                  href="/#contact"
                  className="inline-flex items-center justify-between border border-black bg-black px-5 py-4 text-xs uppercase tracking-[0.3em] text-white shadow-[0_12px_30px_rgba(0,0,0,0.22)] transition-colors transition-shadow hover:bg-white hover:text-black hover:shadow-[0_16px_36px_rgba(0,0,0,0.16)] focus-visible:bg-white focus-visible:text-black focus-visible:shadow-[0_16px_36px_rgba(0,0,0,0.16)]"
                >
                  Jetzt Erstgespräch buchen
                  <span className="text-lg">↘</span>
                </MagneticLink>
                <MagneticLink
                  href="/#services"
                  className="inline-flex items-center justify-between border border-black/10 px-5 py-4 text-xs uppercase tracking-[0.3em] text-ink-soft transition-colors hover:border-black/20 hover:text-foreground"
                >
                  Leistungen ansehen
                  <span className="text-lg">↘</span>
                </MagneticLink>
              </div>
            </div>
          </div>
        </div>

        <div className="hidden flex-wrap items-center justify-between gap-6 border-t border-black/10 pt-10 text-xs uppercase tracking-[0.35em] text-ink-soft md:flex">
          <span>Berlin / Remote</span>
          <span>Websites für Dienstleister, KMU und neue Marken</span>
          <MagneticLink
            href="/#services"
            className="inline-flex items-center gap-3 text-ink-soft transition-colors hover:text-foreground"
            data-cursor-text="Scroll"
          >
            <ScrollHint
              label="SCROLL"
              className="font-display text-sm font-bold tracking-[0.24em]"
            />
            <span className="text-sm">↓</span>
          </MagneticLink>
        </div>
      </div>
    </section>
  );
}
