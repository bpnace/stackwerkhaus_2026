"use client";

import { useState } from "react";
import { FadeIn } from "@/components/animations/FadeIn";
import { MagneticLink } from "@/components/animations/MagneticLink";
import { TransitionLink } from "@/components/ui/TransitionLink";

const calendlyUrl = "https://calendly.com/stackwerkhaus/briefing";
const faqItems = [
  {
    question: "Was kostet eine Website bei STACKWERKHAUS?",
    answer:
      "Basis-Websites starten ab 999€ inklusive Konzeption und Umsetzung. Der finale Preis hängt von Umfang, Seitenanzahl und Funktionen ab – nach dem Erstgespräch bekommst du ein klares Angebot.",
  },
  {
    question: "Wie lange dauert ein Projekt?",
    answer:
      "Der Zeitrahmen richtet sich nach Umfang und Feedback. Nach dem Kick-off erhältst du einen realistischen Zeitplan.",
  },
  {
    question: "Was ist im Webdesign enthalten?",
    answer:
      "Konzept, Struktur, Design, Umsetzung, responsive Optimierung und ein sauberer Launch.",
  },
  {
    question: "Bietet ihr auch Branding an?",
    answer:
      "Ja – von Logo und Look & Feel bis hin zu einer klaren Markenlinie, die sich durch die Website zieht.",
  },
  {
    question: "Was bedeutet Full-Stack Lösungen bei euch?",
    answer:
      "Neben der Oberfläche entsteht eine stabile technische Basis: Performance, Content-Struktur, Integrationen und eine saubere Übergabe.",
  },
  {
    question: "Wie hilft KI-Integration meinem Business?",
    answer:
      "KI kann Inhalte oder Prozesse automatisieren – je nach Bedarf mit klar messbarem Nutzen.",
  },
];

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqItems.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: item.answer,
    },
  })),
};

export function Contact() {
  const [consent, setConsent] = useState(false);
  const ctaDisabled = !consent;

  return (
    <section id="contact" className="border-t border-black/10 bg-white/60">
      <div className="mx-auto grid w-full max-w-6xl gap-10 px-6 py-16 md:grid-cols-[1.1fr_0.9fr] md:px-10 md:py-24">
        <FadeIn direction="up" className="space-y-6">
          <p className="text-xs uppercase tracking-[0.35em] text-ink-soft">
            Kontakt
          </p>
          <h2 className="font-display font-bold text-3xl uppercase tracking-[0.2em] md:text-5xl">
            Bereit für den nächsten Schritt?
          </h2>
          <p className="max-w-lg text-base text-ink-soft">
            Dann lass uns gemeinsam deine Website an den Start bringen –
            einfach, schnell und ohne Technikstress.
          </p>
        </FadeIn>

        <FadeIn direction="up">
          <div className="flex flex-col gap-6 border border-black/10 bg-white/80 p-6 shadow-[0_20px_60px_rgba(0,0,0,0.08)] md:p-8">
            <div className="space-y-3">
              <p className="text-xs uppercase tracking-[0.35em] text-ink-soft">
                Direkt starten
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
                className={`w-full border border-black/20 px-5 py-4 text-center text-[11px] uppercase tracking-[0.28em] transition-colors md:text-xs md:tracking-[0.35em] ${
                  ctaDisabled
                    ? "cursor-not-allowed text-ink-soft/60"
                    : "text-ink-soft hover:bg-black hover:text-white"
                }`}
                data-cursor-text="Termin"
                data-cursor-ignore={ctaDisabled ? "true" : undefined}
                target="_blank"
                rel="noreferrer"
                aria-disabled={ctaDisabled}
                tabIndex={ctaDisabled ? -1 : undefined}
                onClick={(event) => {
                  if (ctaDisabled) event.preventDefault();
                }}
              >
                Jetzt kostenlosen Termin vereinbaren
              </MagneticLink>
              <label className="flex items-start gap-3 text-[10px] uppercase tracking-[0.28em] text-ink-soft md:text-[11px] md:tracking-[0.3em]">
                <input
                  type="checkbox"
                  checked={consent}
                  onChange={(event) => setConsent(event.target.checked)}
                  className="mt-0.5 h-4 w-4 border border-black/30 accent-black"
                />
                <span>
                  Ich stimme der{" "}
                  <TransitionLink href="/datenschutz" className="underline underline-offset-4">
                    Datenschutzerklärung
                  </TransitionLink>{" "}
                  zu
                </span>
              </label>
            </div>
          </div>
        </FadeIn>
      </div>

      <div id="faq" className="mx-auto w-full max-w-6xl px-6 pb-20 md:px-10 md:pb-24">
        <FadeIn direction="up" className="space-y-8">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div className="space-y-3">
              <p className="text-xs uppercase tracking-[0.35em] text-ink-soft">
                FAQ
              </p>
              <h3 className="font-display font-bold text-2xl uppercase tracking-[0.2em] md:text-4xl">
                Häufige Fragen
              </h3>
            </div>
            <p className="max-w-md text-sm text-ink-soft">
              Kurz, klar und ohne Technikstress – die wichtigsten Antworten auf
              einen Blick.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {faqItems.map((item) => (
              <div
                key={item.question}
                className="space-y-3 border border-black/10 bg-white/80 p-6 shadow-[0_16px_40px_rgba(0,0,0,0.06)]"
              >
                <p className="text-xs uppercase tracking-[0.35em] text-ink-soft">
                  Frage
                </p>
                <h4 className="font-display text-xl font-bold uppercase tracking-[0.16em]">
                  {item.question}
                </h4>
                <p className="text-sm text-ink-soft">{item.answer}</p>
              </div>
            ))}
          </div>
        </FadeIn>
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
    </section>
  );
}
