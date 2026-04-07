import type { Metadata } from "next";
import { JsonLd } from "@/components/seo/JsonLd";
import { TransitionLink } from "@/components/ui/TransitionLink";
import { getPortfolioProjects } from "@/lib/projects";
import { getServices } from "@/lib/services";
import {
  buildCollectionPageSchema,
  buildItemListSchema,
  buildPageMetadata,
  buildWebPageSchema,
} from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Leistungen für klare Websites und Relaunches",
  description:
    "Leistungen von STACKWERKHAUS für Dienstleister, kleine Unternehmen und neue Marken: Webdesign, DSGVO-orientierte Websites und Relaunches mit klarer Struktur.",
  path: "/leistungen",
});

export default async function ServicesIndexPage() {
  const [services, projects] = await Promise.all([
    getServices(),
    getPortfolioProjects(),
  ]);

  const pageGraph = {
    "@context": "https://schema.org",
    "@graph": [
      buildWebPageSchema({
        title: "Leistungen für klare Websites und Relaunches",
        description:
          "Leistungsübersicht von STACKWERKHAUS mit Webdesign, Relaunch- und DSGVO-orientierten Website-Angeboten.",
        path: "/leistungen",
        dateModified: "2026-04-07",
      }),
      buildCollectionPageSchema({
        title: "Leistungsübersicht",
        description:
          "Sammlung aller STACKWERKHAUS-Leistungen mit passenden Projektbeispielen und klaren nächsten Schritten.",
        path: "/leistungen",
        dateModified: "2026-04-07",
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
      <div className="mx-auto w-full max-w-6xl px-6 py-16 md:px-10">
        <header className="max-w-3xl space-y-4">
          <p className="text-xs uppercase tracking-[0.35em] text-ink-soft">
            Leistungen
          </p>
          <h1 className="font-display text-4xl font-bold uppercase tracking-[0.2em] md:text-5xl">
            Leistungen mit klarer Struktur, sauberer Umsetzung und belastbarer SEO-Basis
          </h1>
          <p className="text-sm text-ink-soft">
            Diese Seite bündelt die drei typischen Einstiege in unsere Arbeit:
            neue Dienstleister-Website, datenschutzbewusste Umsetzung oder ein
            Relaunch mit sauberem Go-live. Jede Leistungsseite führt in ein
            konkretes Problem, passende Projektbeispiele und einen klaren
            nächsten Schritt.
          </p>
        </header>

        <section className="mt-12 grid gap-6">
          {services.map((service) => {
            const relatedProjects = projects.filter((project) =>
              service.relatedProjectSlugs.includes(project.slug),
            );

            return (
              <article
                key={service.slug}
                className="grid gap-6 border border-black/10 bg-white/70 p-6 shadow-[0_20px_40px_rgba(0,0,0,0.06)] lg:grid-cols-[1.15fr_0.85fr]"
              >
                <div className="space-y-4">
                  <div className="space-y-2">
                    <p className="text-xs uppercase tracking-[0.35em] text-ink-soft">
                      {service.kicker}
                    </p>
                    <h2 className="font-display text-3xl font-bold uppercase tracking-[0.18em] md:text-4xl">
                      {service.shortTitle}
                    </h2>
                  </div>

                  <p className="max-w-3xl text-sm text-ink-soft">
                    {service.intro}
                  </p>

                  <div className="grid gap-4 md:grid-cols-3">
                    <div className="border border-black/10 bg-white/80 p-4">
                      <p className="text-xs uppercase tracking-[0.35em] text-ink-soft">
                        Für wen
                      </p>
                      <p className="mt-3 text-sm text-ink-soft">{service.audience}</p>
                    </div>
                    <div className="border border-black/10 bg-white/80 p-4">
                      <p className="text-xs uppercase tracking-[0.35em] text-ink-soft">
                        Zeitrahmen
                      </p>
                      <p className="mt-3 text-sm text-ink-soft">{service.timeline}</p>
                    </div>
                    <div className="border border-black/10 bg-white/80 p-4">
                      <p className="text-xs uppercase tracking-[0.35em] text-ink-soft">
                        Fokus
                      </p>
                      <p className="mt-3 text-sm text-ink-soft">{service.pricingHint}</p>
                    </div>
                  </div>

                  <TransitionLink
                    href={`/leistungen/${service.slug}`}
                    className="inline-flex items-center gap-3 text-xs font-bold uppercase tracking-[0.35em] text-ink-soft hover:text-foreground"
                  >
                    Zur Leistungsseite
                    <span>↗</span>
                  </TransitionLink>
                </div>

                <div className="space-y-4 border-t border-black/10 pt-6 lg:border-l lg:border-t-0 lg:pl-6 lg:pt-0">
                  <p className="text-xs uppercase tracking-[0.35em] text-ink-soft">
                    Passende Projekte
                  </p>
                  <ul className="space-y-3">
                    {relatedProjects.map((project) => (
                      <li key={project.slug} className="border border-black/10 bg-white/80 p-4">
                        <p className="text-xs uppercase tracking-[0.35em] text-ink-soft">
                          {project.type ?? "Projekt"}
                        </p>
                        <h3 className="mt-2 font-display text-xl font-bold uppercase tracking-[0.16em]">
                          {project.title}
                        </h3>
                        <p className="mt-3 text-sm text-ink-soft">
                          {project.summary}
                        </p>
                        <TransitionLink
                          href={`/work/${project.slug}`}
                          className="mt-4 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.35em] text-ink-soft hover:text-foreground"
                        >
                          Zur Case Study
                          <span>↗</span>
                        </TransitionLink>
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            );
          })}
        </section>
      </div>
      <JsonLd data={pageGraph} />
    </>
  );
}
