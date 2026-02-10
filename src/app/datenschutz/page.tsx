import type { Metadata } from "next";
import { TransitionLink } from "@/components/ui/TransitionLink";

export const metadata: Metadata = {
  title: "Datenschutz",
  description:
    "Datenschutzerklärung von STACKWERKHAUS mit Informationen zu Cookies, Hosting und Terminbuchung.",
  alternates: {
    canonical: "/datenschutz",
  },
  openGraph: {
    title: "Datenschutz | STACKWERKHAUS",
    description:
      "Datenschutzerklärung von STACKWERKHAUS mit Informationen zu Cookies, Hosting und Terminbuchung.",
    url: "/datenschutz",
    siteName: "STACKWERKHAUS",
    locale: "de_DE",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Datenschutz | STACKWERKHAUS",
    description:
      "Datenschutzerklärung von STACKWERKHAUS mit Informationen zu Cookies, Hosting und Terminbuchung.",
  },
};

export default function DatenschutzPage() {
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
          <h1 className="break-words font-display font-bold text-3xl uppercase tracking-[0.12em] sm:text-4xl sm:tracking-[0.16em] md:text-5xl md:tracking-[0.2em]">
            Datenschutzerklärung
          </h1>
          <p className="text-ink-soft">
            Informationen zum Umgang mit Ihren Daten bei STACKWERKHAUS
          </p>
        </div>

        <section className="space-y-8 text-sm text-ink-soft">
          <p>
            Diese Datenschutzerklärung informiert über die Art, den Umfang und
            Zweck der Verarbeitung personenbezogener Daten auf dieser Website
            sowie im Rahmen der Kontaktaufnahme und Terminbuchung.
          </p>

          <div>
            <h2 className="font-display font-bold text-xl uppercase tracking-[0.2em]">
              1. Verantwortlicher
            </h2>
            <p className="mt-3">
              <strong>Verantwortlich für die Datenverarbeitung:</strong>
            </p>
            <p className="mt-2">
              Tarik Marshall
              <br />
              STACKWERKHAUS
              <br />
              Sigmaringer Str. 27
              <br />
              10713 Berlin
              <br />
              Deutschland
            </p>
            <p className="mt-2">
              <strong>Kontakt:</strong>{" "}
              <a href="mailto:info@stackwerkhaus.de">info@stackwerkhaus.de</a>
            </p>
            <p className="mt-2">
              Ein Datenschutzbeauftragter ist nicht benannt, da keine gesetzliche
              Verpflichtung besteht.
            </p>
          </div>

          <div>
            <h2 className="font-display font-bold text-xl uppercase tracking-[0.2em]">
              2. Hosting und Server-Log-Dateien
            </h2>
            <p className="mt-3">
              Die Website wird bei der STRATO AG, Otto-Ostrowski-Straße 7, 10249
              Berlin, Deutschland gehostet. Beim Zugriff auf die Website
              verarbeitet der Hosting-Provider Server-Log-Daten (z. B.
              IP-Adresse, Datum und Uhrzeit, angefragte Seite, Statuscode,
              User-Agent), um die Stabilität und Sicherheit der Website zu
              gewährleisten.
            </p>
            <p className="mt-2">
              <strong>Rechtsgrundlage:</strong> Art. 6 Abs. 1 lit. f DSGVO
              <br />
              <strong>Zweck:</strong> Sicherstellung eines störungsfreien
              Betriebs und Abwehr von Missbrauch
              <br />
              <strong>Speicherdauer:</strong> Für einen begrenzten Zeitraum gemäß
              den Vorgaben des Hosting-Providers
            </p>
          </div>

          <div>
            <h2 className="font-display font-bold text-xl uppercase tracking-[0.2em]">
              3. Kontaktaufnahme
            </h2>
            <p className="mt-3">
              Wenn Sie uns per E-Mail oder Telefon kontaktieren, verarbeiten wir
              die von Ihnen mitgeteilten Daten (z. B. Name, E-Mail-Adresse,
              Telefonnummer und Nachricht), um Ihre Anfrage zu beantworten.
            </p>
            <p className="mt-2">
              <strong>Rechtsgrundlage:</strong> Art. 6 Abs. 1 lit. b DSGVO
              (vorvertragliche Maßnahmen) oder Art. 6 Abs. 1 lit. f DSGVO
              (allgemeine Anfragen)
              <br />
              <strong>Zweck:</strong> Bearbeitung Ihrer Anfrage
              <br />
              <strong>Speicherdauer:</strong> Bis zum Abschluss der Bearbeitung
              und im Rahmen gesetzlicher Aufbewahrungspflichten
            </p>
          </div>

          <div>
            <h2 className="font-display font-bold text-xl uppercase tracking-[0.2em]">
              4. Cookies und Einwilligungsmanagement (Cookiebot)
            </h2>
            <p className="mt-3">
              Wir verwenden Cookiebot, um Ihre Einwilligungen in das Setzen von
              Cookies und den Einsatz vergleichbarer Technologien zu verwalten.
              Cookiebot speichert Ihre Auswahl und ermöglicht Ihnen, diese
              jederzeit anzupassen.
            </p>
            <p className="mt-2">
              <strong>Anbieter:</strong> Usercentrics A/S (Cookiebot), Havnegade
              39, 1058 Kopenhagen, Dänemark.
            </p>
            <p className="mt-2">
              <strong>Rechtsgrundlage:</strong> Art. 6 Abs. 1 lit. c DSGVO
              (Erfüllung rechtlicher Verpflichtungen) und Art. 6 Abs. 1 lit. f
              DSGVO (Nachweis der Einwilligungen); für das Setzen von Cookies
              § 25 Abs. 1 TDDDG
              <br />
              <strong>Zweck:</strong> Einwilligungsmanagement und Compliance
              <br />
              <strong>Speicherdauer:</strong> Gemäß den Einstellungen des
              Consent-Tools
            </p>
          </div>

          <div>
            <h2 className="font-display font-bold text-xl uppercase tracking-[0.2em]">
              5. Terminbuchung über Calendly
            </h2>
            <p className="mt-3">
              Für die Terminbuchung verwenden wir den Dienst Calendly. Bei der
              Nutzung werden die von Ihnen eingegebenen Daten (z. B. Name,
              E-Mail-Adresse, gewünschter Termin und optionale Hinweise)
              verarbeitet, um den Termin zu organisieren.
            </p>
            <p className="mt-2">
              <strong>Anbieter:</strong> Calendly LLC, 115 E Main St, Ste A1B,
              Buford, GA 30518, USA.
            </p>
            <p className="mt-2">
              <strong>Rechtsgrundlage:</strong> Art. 6 Abs. 1 lit. b DSGVO
              (Terminvereinbarung); Cookies bzw. vergleichbare Technologien nur
              nach Einwilligung gemäß § 25 Abs. 1 TDDDG
              <br />
              <strong>Datenübermittlung:</strong> Bei Calendly kann eine
              Verarbeitung in Drittländern (z. B. USA) stattfinden. Es gelten die
              von Calendly bereitgestellten geeigneten Garantien (z. B. SCCs).
            </p>
          </div>

          <div>
            <h2 className="font-display font-bold text-xl uppercase tracking-[0.2em]">
              6. Social-Media-Links
            </h2>
            <p className="mt-3">
              Auf der Website sind nur Links zu Instagram und LinkedIn
              eingebunden. Beim Anklicken gelten die Datenschutzrichtlinien der
              jeweiligen Anbieter.
            </p>
          </div>

          <div>
            <h2 className="font-display font-bold text-xl uppercase tracking-[0.2em]">
              7. Ihre Rechte
            </h2>
            <p className="mt-3">
              Sie haben das Recht auf Auskunft, Berichtigung, Löschung,
              Einschränkung der Verarbeitung sowie Datenübertragbarkeit. Zudem
              können Sie jederzeit Widerspruch gegen die Verarbeitung einlegen.
            </p>
          </div>

          <div>
            <h2 className="font-display font-bold text-xl uppercase tracking-[0.2em]">
              8. Beschwerderecht
            </h2>
            <p className="mt-3">
              <strong>
                Berliner Beauftragte für Datenschutz und Informationsfreiheit
              </strong>
              <br />
              Friedrichstr. 219, 10969 Berlin
              <br />
              Telefon: 030 13889-0
              <br />
              Website:{" "}
              <a href="https://www.datenschutz-berlin.de">
                www.datenschutz-berlin.de
              </a>
            </p>
          </div>

          <p>
            <strong>Stand:</strong> Januar 2026
          </p>
        </section>
      </div>
    </main>
  );
}
