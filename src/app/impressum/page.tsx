export default function ImpressumPage() {
  return (
    <main className="mx-auto w-full max-w-4xl px-6 py-16 md:px-10">
      <div className="space-y-10">
        <div className="space-y-3">
          <p className="text-xs uppercase tracking-[0.35em] text-ink-soft">
            Rechtliches
          </p>
          <h1 className="font-display text-4xl uppercase tracking-[0.2em] md:text-5xl">
            Impressum
          </h1>
          <p className="text-ink-soft">
            Rechtliche Informationen und Kontaktdaten von STACKWERKHAUS
          </p>
        </div>

        <section className="space-y-6 text-sm text-ink-soft">
          <div>
            <h2 className="font-display text-xl uppercase tracking-[0.2em]">
              Angaben gemäß § 5 TMG
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
            <h2 className="font-display text-xl uppercase tracking-[0.2em]">
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
            <h2 className="font-display text-xl uppercase tracking-[0.2em]">
              Verantwortlich für den Inhalt nach § 55 Abs. 2 RStV
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
            <h2 className="font-display text-xl uppercase tracking-[0.2em]">
              Steuerliche Angaben
            </h2>
            <p className="mt-3">
              <strong>Kleinunternehmer gemäß § 19 UStG</strong>
              <br />
              Aufgrund der Anwendung der Kleinunternehmerregelung gemäß § 19 UStG
              wird keine Umsatzsteuer berechnet.
              <br />
              <strong>Finanzamt:</strong> Finanzamt Berlin Wilmersdorf
            </p>
          </div>

          <div>
            <h2 className="font-display text-xl uppercase tracking-[0.2em]">
              Berufshaftpflichtversicherung
            </h2>
            <p className="mt-3">
              Eine Berufshaftpflichtversicherung wird bei Aufnahme größerer
              Projekte (Enterprise-Level) abgeschlossen.
            </p>
          </div>

          <div>
            <h2 className="font-display text-xl uppercase tracking-[0.2em]">
              EU-Streitschlichtung
            </h2>
            <p className="mt-3">
              Die Europäische Kommission stellt eine Plattform zur
              Online-Streitbeilegung (OS) bereit:{" "}
              <a href="https://ec.europa.eu/consumers/odr/">
                https://ec.europa.eu/consumers/odr/
              </a>
            </p>
            <p className="mt-2">
              Unsere E-Mail-Adresse finden Sie oben im Impressum.
            </p>
          </div>

          <div>
            <h2 className="font-display text-xl uppercase tracking-[0.2em]">
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
