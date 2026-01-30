"use client";

import Script from "next/script";
import type { MouseEvent } from "react";
import { FadeIn } from "@/components/animations/FadeIn";
import { MagneticLink } from "@/components/animations/MagneticLink";

const calendlyPopupUrl =
  "https://calendly.com/kontakt-codariq/30min?hide_event_type_details=1&hide_gdpr_banner=1";
const calendlyUrl = calendlyPopupUrl;
declare global {
  interface Window {
    Calendly?: {
      initPopupWidget: (options: { url: string }) => void;
    };
  }
}

export function Contact() {
  const handleCalendlyClick = (event: MouseEvent<HTMLAnchorElement>) => {
    if (window.Calendly?.initPopupWidget) {
      event.preventDefault();
      window.Calendly.initPopupWidget({ url: calendlyPopupUrl });
    }
  };

  return (
    <>
      <Script
        src="https://assets.calendly.com/assets/external/widget.js"
        strategy="afterInteractive"
      />
      <section id="contact" className="border-t border-black/10 bg-white/60">
        <div className="mx-auto grid w-full max-w-6xl gap-10 px-6 py-16 md:grid-cols-[1.1fr_0.9fr] md:px-10 md:py-24">
          <FadeIn direction="up" className="space-y-6">
            <p className="text-xs uppercase tracking-[0.35em] text-ink-soft">
              Kontakt
            </p>
            <h2 className="font-display font-bold text-3xl uppercase tracking-[0.2em] md:text-5xl">
              Überzeugt? Lass uns sprechen!
            </h2>
            <p className="max-w-lg text-base text-ink-soft">
              Jetzt einen Termin vereinbaren um eine beeindruckenden Online-Auftritt zu erhalten, der Ihren Umsatz
              steigert und Ihre Marke stärkt. Schnell online, klar strukturiert, Einzigartig und professionell nur für dich erstellt.
            </p>
          </FadeIn>

          <FadeIn direction="up" className="md:mt-8 lg:mt-10">
            <div className="flex flex-col gap-6 border border-black/10 bg-white/80 p-6 shadow-[0_20px_60px_rgba(0,0,0,0.08)] md:p-8">
              <div className="space-y-3">
                <p className="text-xs uppercase tracking-[0.35em] text-ink-soft">
                  Direkt Termin sichern
                </p>
                <a
                  href="mailto:info@stackwerkhaus.de"
                  className="break-all font-display text-xl font-bold uppercase tracking-[0.18em] md:text-2xl md:tracking-[0.2em]"
                  data-cursor-text="Mail"
                >
                  info@stackwerkhaus.de
                </a>
              </div>

              <div className="flex flex-col gap-3 text-[11px] uppercase tracking-[0.28em] text-ink-soft md:text-xs md:tracking-[0.35em]">
                <MagneticLink
                  href={calendlyUrl}
                  className="inline-flex w-full items-center justify-center border border-black/20 px-5 py-4 text-center text-[11px] uppercase tracking-[0.28em] text-ink-soft transition-colors transition-shadow hover:bg-black hover:text-white hover:!text-white hover:shadow-[0_12px_30px_rgba(0,0,0,0.12)] focus-visible:text-white focus-visible:shadow-[0_12px_30px_rgba(0,0,0,0.12)] md:text-xs md:tracking-[0.35em]"
                  data-cursor-text="Termin"
                  onClick={handleCalendlyClick}
                  rel="noreferrer"
                >
                  Jetzt kostenlosen Termin vereinbaren
                </MagneticLink>
              </div>
            </div>
          </FadeIn>
        </div>


    </section>
    </>
  );
}
