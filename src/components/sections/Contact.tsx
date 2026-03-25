"use client";

import type { MouseEvent } from "react";
import { FadeIn } from "@/components/animations/FadeIn";
import { MagneticLink } from "@/components/animations/MagneticLink";

const calendlyUrl =
  "https://calendly.com/kontakt-codariq/30min?hide_event_type_details=1&hide_gdpr_banner=1";
const calendlyScriptUrl = "https://assets.calendly.com/assets/external/widget.js";
const calendlyStylesUrl = "https://assets.calendly.com/assets/external/widget.css";
let calendlyWidgetPromise: Promise<void> | null = null;

declare global {
  interface Window {
    Calendly?: {
      initPopupWidget: (options: { url: string }) => void;
    };
  }
}

function ensureCalendlyWidget() {
  if (typeof window === "undefined") {
    return Promise.reject(new Error("Calendly is only available in the browser."));
  }

  if (window.Calendly?.initPopupWidget) {
    return Promise.resolve();
  }

  if (calendlyWidgetPromise) {
    return calendlyWidgetPromise;
  }

  calendlyWidgetPromise = new Promise<void>((resolve, reject) => {
    if (!document.querySelector('link[data-calendly-widget="true"]')) {
      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.href = calendlyStylesUrl;
      link.dataset.calendlyWidget = "true";
      document.head.appendChild(link);
    }

    const handleLoad = () => {
      if (window.Calendly?.initPopupWidget) {
        resolve();
        return;
      }

      reject(new Error("Calendly widget did not initialize."));
    };

    const handleError = () => {
      reject(new Error("Calendly widget failed to load."));
    };

    const existingScript = document.querySelector(
      'script[data-calendly-widget="true"]'
    ) as HTMLScriptElement | null;

    if (existingScript) {
      if (window.Calendly?.initPopupWidget) {
        resolve();
        return;
      }

      existingScript.addEventListener("load", handleLoad, { once: true });
      existingScript.addEventListener("error", handleError, { once: true });
      return;
    }

    const script = document.createElement("script");
    script.src = calendlyScriptUrl;
    script.async = true;
    script.dataset.calendlyWidget = "true";
    script.addEventListener("load", handleLoad, { once: true });
    script.addEventListener("error", handleError, { once: true });
    document.body.appendChild(script);
  }).catch((error) => {
    calendlyWidgetPromise = null;
    throw error;
  });

  return calendlyWidgetPromise;
}

export function Contact() {
  const handleCalendlyClick = (event: MouseEvent<HTMLAnchorElement>) => {
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    event.preventDefault();

    void ensureCalendlyWidget()
      .then(() => {
        if (window.Calendly?.initPopupWidget) {
          window.Calendly.initPopupWidget({ url: calendlyUrl });
          return;
        }

        window.location.href = calendlyUrl;
      })
      .catch(() => {
        window.location.href = calendlyUrl;
      });
  };

  return (
    <section className="border-t border-black/10 bg-white/60 pt-24">
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
            Im Erstgespräch ordnen wir dein Angebot, deine Zielgruppe
            und den Projektumfang so ein, dass eine tragfähige Entscheidung
            möglich wird. Dabei wird klar, ob ein neuer Auftritt, ein Relaunch
            oder zunächst der Ausbau einer fokussierten Leistungsseite sinnvoll ist.
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
                className="inline-flex w-full items-center justify-between border border-black bg-black px-5 py-4 text-[11px] uppercase tracking-[0.28em] text-white shadow-[0_12px_30px_rgba(0,0,0,0.22)] transition-colors transition-shadow hover:bg-white hover:text-black hover:shadow-[0_16px_36px_rgba(0,0,0,0.16)] focus-visible:bg-white focus-visible:text-black focus-visible:shadow-[0_16px_36px_rgba(0,0,0,0.16)] md:text-xs md:tracking-[0.35em]"
                data-cursor-text="Termin"
                data-cursor-ignore
                onClick={handleCalendlyClick}
                rel="noreferrer"
              >
                Jetzt Erstgespräch buchen
                <span className="text-lg">↘</span>
              </MagneticLink>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
