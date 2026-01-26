import { FadeIn } from "@/components/animations/FadeIn";
import { MagneticLink } from "@/components/animations/MagneticLink";
import { TransitionLink } from "@/components/ui/TransitionLink";

const calendlyUrl = "https://calendly.com/stackwerkhaus/briefing";

export function Contact() {
  return (
    <section id="contact" className="border-t border-black/10 bg-white/60">
      <div className="mx-auto grid w-full max-w-6xl gap-10 px-6 py-24 md:grid-cols-[1.1fr_0.9fr] md:px-10">
        <FadeIn direction="up" className="space-y-6">
          <p className="text-xs uppercase tracking-[0.35em] text-ink-soft">
            Kontakt
          </p>
          <h2 className="font-display font-bold text-4xl uppercase tracking-[0.2em] md:text-5xl">
            Bereit für den nächsten Schritt?
          </h2>
          <p className="max-w-lg text-base text-ink-soft">
            Dann lass uns gemeinsam deine Website an den Start bringen –
            einfach, schnell und ohne Technikstress.
          </p>
        </FadeIn>

        <FadeIn direction="up">
          <div className="flex flex-col gap-6 border border-black/10 bg-white/80 p-8 shadow-[0_20px_60px_rgba(0,0,0,0.08)]">
            <div className="space-y-3">
              <p className="text-xs uppercase tracking-[0.35em] text-ink-soft">
                Direkt starten
              </p>
              <a
                href="mailto:info@stackwerkhaus.de"
                className="font-display font-bold text-2xl uppercase tracking-[0.2em]"
                data-cursor-text="Mail"
              >
                info@stackwerkhaus.de
              </a>
            </div>

            <div className="flex flex-col gap-3 text-xs uppercase tracking-[0.35em]">
              <MagneticLink
                href={calendlyUrl}
                className="border border-black/20 px-6 py-4 text-center transition-colors hover:bg-black hover:text-white"
                data-cursor-text="Termin"
                target="_blank"
                rel="noreferrer"
              >
                Jetzt kostenlosen Termin vereinbaren
              </MagneticLink>
              <TransitionLink
                href="/datenschutz"
                className="flex items-center gap-3 text-[11px] uppercase tracking-[0.3em] text-ink-soft"
              >
                <span className="inline-flex h-4 w-4 items-center justify-center border border-black/30">
                  ✓
                </span>
                Ich stimme der Datenschutzerklärung zu
              </TransitionLink>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
