import type { Metadata } from "next";
import { TransitionLink } from "@/components/ui/TransitionLink";

export const metadata: Metadata = {
  title: "Impressum",
  description:
    "Impressum und Anbieterkennzeichnung von STACKWERKHAUS in Berlin.",
  alternates: {
    canonical: "/impressum",
  },
  openGraph: {
    title: "Impressum | STACKWERKHAUS",
    description:
      "Impressum und Anbieterkennzeichnung von STACKWERKHAUS in Berlin.",
    url: "/impressum",
    siteName: "STACKWERKHAUS",
    locale: "de_DE",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Impressum | STACKWERKHAUS",
    description:
      "Impressum und Anbieterkennzeichnung von STACKWERKHAUS in Berlin.",
  },
};

export default function ImpressumPage() {
  return (
    <main className="mx-auto w-full max-w-4xl px-6 py-16 md:px-10">
      <div className="space-y-10">
        <div className="space-y-3">
          <TransitionLink
            href="/#top"
            className="inline-flex items-center gap-2 border border-black/20 px-4 py-2 text-[11px] uppercase tracking-[0.3em] text-ink-soft transition-colors hover:bg-black hover:text-white"
          >
            <span>↙</span>
            Zurück zur Startseite
          </TransitionLink>
          <p className="text-xs uppercase tracking-[0.35em] text-ink-soft">
            Rechtliches
          </p>
          <h1 className="font-display font-bold text-4xl uppercase tracking-[0.2em] md:text-5xl">
            Impressum
          </h1>
          <p className="text-ink-soft">
            Rechtliche Informationen und Kontaktdaten von STACKWERKHAUS
          </p>
        </div>

        <section className="space-y-6 text-sm text-ink-soft">
          <div>
            <h2 className="font-display font-bold text-xl uppercase tracking-[0.2em]">
              Angaben gemäß § 5 DDG
            </h2>
            <p className="mt-3">
              Tarik Marshall
              <br />
              Codariq
              <br />
              (STACKWERKHAUS ist Teil von Codariq)
              <br />
              Sigmaringer Str. 27
              <br />
              10713 Berlin
              <br />
              Deutschland
            </p>
          </div>

          <div>
            <h2 className="font-display font-bold text-xl uppercase tracking-[0.2em]">
              Kontakt
            </h2>
            <p className="mt-3">
              <strong>Telefon:</strong> <a href="tel:017631378294">0176 31378294</a>
              <br />
              <strong>E-Mail:</strong>{" "}
              <a href="mailto:info@stackwerkhaus.de">info@stackwerkhaus.de</a>
              <br />
              <strong>Website:</strong>{" "}
              <a href="https://www.stackwerkhaus.de">www.stackwerkhaus.de</a>
            </p>
          </div>

          <div>
            <h2 className="font-display font-bold text-xl uppercase tracking-[0.2em]">
              Verantwortlich i. S. d. § 18 Abs. 2 MStV
            </h2>
            <p className="mt-3">
              Tarik Marshall
              <br />
              Sigmaringer Str. 27
              <br />
              10713 Berlin
              <br />
              Deutschland
            </p>
          </div>

          <div>
            <h2 className="font-display font-bold text-xl uppercase tracking-[0.2em]">
              Steuerliche Angaben
            </h2>
            <p className="mt-3">
              <strong>Kleinunternehmer gemäß § 19 UStG</strong>
              <br />
              Aufgrund der Anwendung der Kleinunternehmerregelung gemäß § 19 UStG
              wird keine Umsatzsteuer berechnet.
              <br />
              <strong>Finanzamt:</strong> Finanzamt Berlin Wilmersdorf
              <br />
              <strong>USt-IdNr.:</strong> Keine vorhanden.
            </p>
          </div>

          <div>
            <h2 className="font-display font-bold text-xl uppercase tracking-[0.2em]">
              Berufshaftpflichtversicherung
            </h2>
            <p className="mt-3">
              Eine Berufshaftpflichtversicherung wird bei Aufnahme größerer
              Projekte (Enterprise-Level) abgeschlossen.
            </p>
          </div>

          <div>
            <h2 className="font-display font-bold text-xl uppercase tracking-[0.2em]">
              EU-Streitschlichtung
            </h2>
            <p className="mt-3">
              Die Plattform der EU zur Online-Streitbeilegung (OS) wurde
              eingestellt. Wir nehmen nicht an einem Streitbeilegungsverfahren
              vor einer Verbraucherschlichtungsstelle teil.
            </p>
          </div>

          <div>
            <h2 className="font-display font-bold text-xl uppercase tracking-[0.2em]">
              Verbraucherstreitbeilegung
            </h2>
            <p className="mt-3">
              Wir sind nicht bereit oder verpflichtet, an
              Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle
              teilzunehmen.
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}
