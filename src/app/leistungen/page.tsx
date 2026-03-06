import type { Metadata } from "next";
import { JsonLd } from "@/components/seo/JsonLd";
import { TransitionLink } from "@/components/ui/TransitionLink";
import {
  buildItemListSchema,
  buildPageMetadata,
  buildWebPageSchema,
  formatGermanDate,
} from "@/lib/seo";
import { getServices } from "@/lib/services";

export const metadata: Metadata = buildPageMetadata({
  title: "Leistungen",
  description:
    "Leistungen von STACKWERKHAUS für Dienstleister, kleine Unternehmen und neue Marken: Webdesign, Relaunches und DSGVO-orientierte Website-Umsetzung.",
  path: "/leistungen",
});

export default async function ServicesPage() {
  const services = await getServices();
  const pageGraph = {
    "@context": "https://schema.org",
    "@graph": [
      buildWebPageSchema({
        title: "Leistungen",
        description:
          "Leistungen von STACKWERKHAUS für klare, vertrauenswürdige Websites mit Fokus auf Anfragen und Struktur.",
        path: "/leistungen",
        dateModified: "2026-03-06",
      }),
      buildItemListSchema({
        title: "Leistungen von STACKWERKHAUS",
        path: "/leistungen",
        items: services.map((service) => ({
          name: service.title,
          path: `/leistungen/${service.slug}`,
        })),
      }),
    ],
  };

  return (
    <>
      <main className="mx-auto w-full max-w-6xl px-6 py-16 md:px-10 md:py-5">
        <header className="grid gap-6 border-b border-black/10 pb-10 lg:grid-cols-[1fr_minmax(18rem,28rem)] lg:items-end">
          <div className="space-y-4">
            <p className="text-xs uppercase tracking-[0.35em] text-ink-soft">
              Leistungen
            </p>
            <h1 className="font-display text-4xl font-bold uppercase tracking-[0.2em] md:text-5xl">
              Welche Leistung zu deiner Ausgangslage passt
            </h1>
            <p className="max-w-3xl text-sm text-ink-soft">
              Diese Leistungen sind nicht nach Agentur-Kategorien sortiert,
              sondern nach dem Problem, das die Website heute verursacht:
              unklarer Erstauftritt, technischer Vertrauensverlust oder ein
              historisch gewachsener Auftritt, der modernisiert werden muss.
            </p>
          </div>
          <div className="space-y-3 border border-black/10 bg-white/70 p-5 text-sm text-ink-soft shadow-[0_20px_40px_rgba(0,0,0,0.06)]">
            <p className="text-xs uppercase tracking-[0.35em] text-ink-soft">
              Orientierung
            </p>
            <p>
              Wenn du noch unsicher bist, starte bei der Ausgangslage. Die
              passende Leistungsseite zeigt dir danach konkret, für wen sie
              gedacht ist, was enthalten ist und welche Projekte am ehesten
              vergleichbar sind.
            </p>
            <p className="text-[11px] uppercase tracking-[0.3em] text-ink-soft">
              Aktualisiert: {formatGermanDate("2026-03-06")}
            </p>
          </div>
        </header>

        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {services.map((service) => (
            <TransitionLink
              key={service.slug}
              href={`/leistungen/${service.slug}`}
              className="group flex h-full min-h-[32rem] flex-col justify-between border border-black/10 bg-white/70 p-6 shadow-[0_20px_50px_rgba(0,0,0,0.08)] transition-transform duration-300 hover:-translate-y-1"
              data-cursor-text="Leistung"
            >
              <div className="space-y-5">
                <div className="space-y-2">
                  <p className="text-xs uppercase tracking-[0.35em] text-ink-soft">
                    {service.kicker}
                  </p>
                  <h2 className="font-display text-2xl font-bold uppercase tracking-[0.18em]">
                    {service.shortTitle}
                  </h2>
                </div>
                <p className="text-sm text-ink-soft">{service.summary}</p>
                <div className="space-y-3 border-t border-black/10 pt-4 text-sm text-ink-soft">
                  {service.benefits.map((benefit) => (
                    <p key={benefit.title}>{benefit.title}</p>
                  ))}
                </div>
              </div>
              <div className="mt-8 space-y-4 text-xs uppercase tracking-[0.3em] text-ink-soft">
                <div className="flex items-center justify-between border-t border-black/10 pt-4">
                  <span>{service.timeline}</span>
                  <span>↗</span>
                </div>
                <span className="block text-foreground">Leistung öffnen</span>
              </div>
            </TransitionLink>
          ))}
        </div>
      </main>
      <JsonLd data={pageGraph} />
    </>
  );
}
