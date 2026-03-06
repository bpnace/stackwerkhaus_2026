"use client";

import { useEffect, useRef } from "react";
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
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          const link = document.createElement("link");
          link.rel = "stylesheet";
          link.href =
            "https://assets.calendly.com/assets/external/widget.css";
          document.head.appendChild(link);
          observer.disconnect();
        }
      },
      { rootMargin: "200px" },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

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
      <section
        ref={sectionRef}
        className="border-t border-black/10 bg-white/60 pt-24"
      >
        <div id="contact" className="scroll-mt-24" />
        <div className="mx-auto grid w-full max-w-6xl gap-10 px-6 pb-16 md:grid-cols-[1.1fr_0.9fr] md:px-10 md:pb-24">
          <FadeIn direction="up" className="space-y-6">
            <div className="space-y-3">
              <p className="text-xs uppercase tracking-[0.35em] text-ink-soft">
                Kontakt
              </p>
              <h2 className="font-display font-bold text-3xl uppercase tracking-[0.2em] md:text-5xl">
                Gib uns 30 Minuten, um dein Projekt zu verstehen.
              </h2>
            </div>
            <p className="max-w-lg text-base text-ink-soft">
              Das Erstgespräch ist dazu da, Angebot, Zielgruppe und sinnvollen
              Projektumfang schnell einzuordnen. Du erfährst, ob ein neuer
              Auftritt, ein Relaunch oder zunächst nur eine fokussierte
              Leistungsseite der richtige Schritt ist.
            </p>
          </FadeIn>

          <FadeIn direction="up" className="md:mt-8 lg:mt-10">
            <div className="flex flex-col gap-6 border border-black/10 bg-white/80 p-6 shadow-[0_20px_60px_rgba(0,0,0,0.08)] md:p-8">
              <div className="space-y-3">
                <p className="text-xs uppercase tracking-[0.35em] text-ink-soft">
                  Nächster Schritt
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
                  className="inline-flex w-full items-center justify-center border border-black bg-black px-5 py-4 text-center text-[11px] uppercase tracking-[0.28em] text-white shadow-[0_12px_30px_rgba(0,0,0,0.22)] transition-transform transition-colors transition-shadow hover:-translate-y-0.5 hover:bg-white hover:text-black hover:!text-black hover:shadow-[0_16px_36px_rgba(0,0,0,0.16)] focus-visible:outline-none focus-visible:bg-white focus-visible:text-black focus-visible:ring-2 focus-visible:ring-black/25 md:text-xs md:tracking-[0.35em]"
                  data-cursor-text="Termin"
                  onClick={handleCalendlyClick}
                  rel="noreferrer"
                >
                  Kostenloses Erstgespräch buchen
                </MagneticLink>
              </div>
            </div>
          </FadeIn>
        </div>


    </section>
    </>
  );
}
