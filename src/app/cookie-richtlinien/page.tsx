import type { Metadata } from "next";
import { TransitionLink } from "@/components/ui/TransitionLink";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Cookie-Richtlinien",
  description:
    "Cookie-Richtlinien von STACKWERKHAUS mit Übersicht zu eingesetzten Cookies und Einwilligungen.",
  path: "/cookie-richtlinien",
  noindex: true,
});

export default function CookieRichtlinienPage() {
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
            Cookie-Richtlinien
          </h1>
          <p className="text-ink-soft">
            Informationen zu Cookies und Einwilligungen auf stackwerkhaus.de
          </p>
        </div>

        <section className="space-y-6 text-sm text-ink-soft">
          <p>
            Hier findest du eine Übersicht der eingesetzten Cookies sowie deren
            Zweck. Deine Auswahl kannst du jederzeit anpassen.
          </p>
          <div>
            <h2 className="font-display font-bold text-xl uppercase tracking-[0.2em]">
              Was sind Cookies?
            </h2>
            <p className="mt-3">
              Cookies sind kleine Textdateien, die auf deinem Endgerät
              gespeichert werden. Damit lässt sich eine Website technisch
              bereitstellen, Präferenzen speichern oder Reichweitenmessung
              ermöglichen. Außerdem gibt es ähnliche Technologien wie Local
              Storage oder Pixel.
            </p>
          </div>

          <div>
            <h2 className="font-display font-bold text-xl uppercase tracking-[0.2em]">
              Welche Kategorien verwenden wir?
            </h2>
            <p className="mt-3">
              Wir unterscheiden zwischen notwendigen Cookies, Präferenz-Cookies,
              Statistik/Analyse und Marketing. Notwendige Cookies sind für den
              technischen Betrieb erforderlich. Alle anderen Kategorien setzen
              wir nur mit deiner Einwilligung.
            </p>
          </div>

          <div>
            <h2 className="font-display font-bold text-xl uppercase tracking-[0.2em]">
              Einwilligung und Widerruf
            </h2>
            <p className="mt-3">
              Deine Einwilligung kannst du jederzeit anpassen oder widerrufen.
              Nutze dafür den Cookie-Hinweis von CCM19 oder ändere deine
              Einstellungen direkt in deinem Browser. Wenn du Cookies löschst,
              kann es sein, dass bestimmte Funktionen eingeschränkt sind.
            </p>
          </div>

          <div>
            <h2 className="font-display font-bold text-xl uppercase tracking-[0.2em]">
              Drittdienste
            </h2>
            <p className="mt-3">
              Wenn du eine Terminbuchung über Calendly startest, können Cookies
              oder ähnliche Technologien gesetzt werden, um den Dienst korrekt
              auszuführen. Details findest du in der Datenschutzerklärung.
            </p>
          </div>

          <div>
            <h2 className="font-display font-bold text-xl uppercase tracking-[0.2em]">
              Cookie-Übersicht
            </h2>
            <p className="mt-3">
              Die detaillierte Übersicht sowie die nachträgliche Anpassung deiner
              Auswahl stellt unser Consent-Anbieter CCM19 direkt im Frontend
              bereit.
            </p>
            <div className="mt-6">
              <a
                href="#CCM.openWidget"
                className="inline-flex items-center gap-2 border border-black bg-black px-5 py-3 text-[11px] uppercase tracking-[0.28em] text-white transition-colors hover:bg-white hover:text-black"
              >
                Cookie-Einstellungen öffnen
                <span className="text-lg">↘</span>
              </a>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
