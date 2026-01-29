"use client";

import Script from "next/script";
import { FadeIn } from "@/components/animations/FadeIn";
import { MagneticLink } from "@/components/animations/MagneticLink";

const calendlyUrl = "https://calendly.com/kontakt-codariq/30min";
const calendlyPopupUrl =
  "https://calendly.com/kontakt-codariq/30min?hide_event_type_details=1&hide_gdpr_banner=1";
const faqItems = [
  {
    question: "Was kostet eine Website bei STACKWERKHAUS?",
    answer:
      "Basis-Websites starten ab 999€ inklusive Konzeption und Umsetzung. Der finale Preis hängt von Umfang, Seitenanzahl und Funktionen ab - nach dem Erstgespräch bekommst du ein klares Angebot.",
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
      "Ja. Von Logo und Look & Feel bis hin zu einer klaren Markenlinie, die sich durch die Website zieht.",
  },
  {
    question: "Was bedeutet Full-Stack Lösungen bei euch?",
    answer:
      "Neben der Oberfläche entsteht eine stabile technische Basis: Performance, Content-Struktur, Integrationen und eine saubere Übergabe.",
  },
  {
    question: "Wie hilft KI-Integration meinem Business?",
    answer:
      "KI kann Inhalte oder Prozesse automatisieren je nach Bedarf mit klar messbarem Nutzen.",
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

declare global {
  interface Window {
    Calendly?: {
      initPopupWidget: (options: { url: string }) => void;
    };
  }
}

export function Contact() {
  const handleCalendlyClick = (
    event: React.MouseEvent<HTMLAnchorElement>
  ) => {
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
              Bereit für den nächsten Schritt?
            </h2>
            <p className="max-w-lg text-base text-ink-soft">
              Dann lass uns gemeinsam deine Website an den Start bringen! Ganz
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
              Kurz, klar und ohne Technikstress. Die wichtigsten Antworten auf
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
    </>
  );
}
