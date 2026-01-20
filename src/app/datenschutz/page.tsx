export default function DatenschutzPage() {
  return (
    <main className="mx-auto w-full max-w-4xl px-6 py-16 md:px-10">
      <div className="space-y-10">
        <div className="space-y-3">
          <p className="text-xs uppercase tracking-[0.35em] text-ink-soft">
            Rechtliches
          </p>
          <h1 className="font-display text-4xl uppercase tracking-[0.2em] md:text-5xl">
            Datenschutzerklärung
          </h1>
          <p className="text-ink-soft">
            Informationen zum Umgang mit Ihren Daten bei STACKWERKHAUS
          </p>
        </div>

        <section className="space-y-8 text-sm text-ink-soft">
          <p>
            Diese Datenschutzerklärung informiert Sie über die Art, den Umfang
            und Zweck der Verarbeitung von personenbezogenen Daten auf unserer
            Website und in unserem Dienstleistungsgeschäft.
          </p>

          <div>
            <h2 className="font-display text-xl uppercase tracking-[0.2em]">
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
          </div>

          <div>
            <h2 className="font-display text-xl uppercase tracking-[0.2em]">
              2. Datenerfassung auf dieser Website
            </h2>
            <h3 className="mt-3 text-base uppercase tracking-[0.2em] text-foreground">
              2.1 Server-Log-Dateien
            </h3>
            <p className="mt-2">
              Beim Besuch unserer Website werden automatisch Informationen
              (sogenannte Server-Logfiles) wie IP-Adresse, Zeitpunkt des
              Zugriffs, Browsertyp usw. erhoben. Diese Daten dienen ausschließlich
              der Sicherstellung eines störungsfreien Betriebs und werden nicht
              zur Identifikation deiner Person verwendet.
            </p>
            <p className="mt-2">
              <strong>Rechtsgrundlage:</strong> Art. 6 Abs. 1 lit. f DSGVO
              <br />
              <strong>Zweck:</strong> Sicherstellung eines störungsfreien Betriebs
              <br />
              <strong>Speicherdauer:</strong> 7 Tage
            </p>
          </div>

          <div>
            <h2 className="font-display text-xl uppercase tracking-[0.2em]">
              3. Kontaktaufnahme
            </h2>
            <p className="mt-3">
              Bei der Nutzung unseres Kontaktformulars werden folgende Daten
              verarbeitet: Name, E-Mail-Adresse, Telefonnummer (optional),
              Nachricht und angehängte Dateien (optional).
            </p>
            <p className="mt-2">
              <strong>Rechtsgrundlage:</strong> Art. 6 Abs. 1 lit. b DSGVO
              <br />
              <strong>Zweck:</strong> Bearbeitung Ihrer Anfrage
              <br />
              <strong>Speicherdauer:</strong> Bis zu 3 Jahre nach Abschluss der
              Geschäftsbeziehung
            </p>
          </div>

          <div>
            <h2 className="font-display text-xl uppercase tracking-[0.2em]">
              4. Externe Dienste
            </h2>
            <p className="mt-3">
              <strong>Calendly:</strong> Für Terminbuchungen nutzen wir Calendly,
              Inc. (USA). Datenübertragung: Name, E-Mail-Adresse, Terminwünsche.
            </p>
            <p className="mt-2">
              <strong>Kontaktformular-Webhook:</strong> Für die Kontaktformular-
              Verarbeitung nutzen wir einen Webhook unter
              automation.codariq.de.
            </p>
            <p className="mt-2">
              <strong>Social-Media-Präsenzen:</strong> Wir unterhalten Profile
              auf Instagram und LinkedIn. Beim Besuch dieser Profile gelten die
              Datenschutzrichtlinien der jeweiligen Betreiber.
            </p>
          </div>

          <div>
            <h2 className="font-display text-xl uppercase tracking-[0.2em]">
              5. Ihre Rechte
            </h2>
            <p className="mt-3">
              Sie haben das Recht auf Auskunft, Berichtigung, Löschung,
              Einschränkung der Verarbeitung sowie Datenübertragbarkeit. Zudem
              können Sie jederzeit Widerspruch gegen die Verarbeitung einlegen.
            </p>
          </div>

          <div>
            <h2 className="font-display text-xl uppercase tracking-[0.2em]">
              6. Beschwerderecht
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
            <strong>Stand:</strong> Dezember 2024
          </p>
        </section>
      </div>
    </main>
  );
}
