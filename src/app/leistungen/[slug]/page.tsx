import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { FadeIn } from "@/components/animations/FadeIn";
import { MagneticLink } from "@/components/animations/MagneticLink";
import { MaskedTextReveal } from "@/components/animations/MaskedTextReveal";
import { JsonLd } from "@/components/seo/JsonLd";
import { TransitionLink } from "@/components/ui/TransitionLink";
import {
  buildBreadcrumbSchema,
  buildFaqSchema,
  buildPageMetadata,
  buildServiceSchema,
  buildWebPageSchema,
  formatGermanDate,
} from "@/lib/seo";
import { getServiceBySlug, getServices } from "@/lib/services";
import { getPortfolioProjects } from "@/lib/projects";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export const dynamicParams = false;

export async function generateStaticParams() {
  const services = await getServices();
  return services.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = await getServiceBySlug(slug);

  if (!service) {
    return {
      title: "Leistung nicht gefunden",
    };
  }

  return buildPageMetadata({
    title: service.title,
    description: service.summary,
    path: `/leistungen/${service.slug}`,
  });
}

export default async function ServiceDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const service = await getServiceBySlug(slug);

  if (!service) {
    notFound();
  }

  const breadcrumbItems = [
    { name: "Start", path: "/" },
    { name: service.shortTitle, path: `/leistungen/${service.slug}` },
  ];
  const updatedLabel = formatGermanDate(service.updatedAt);
  const relatedProjects = (await getPortfolioProjects()).filter((project) =>
    service.relatedProjectSlugs.includes(project.slug),
  );
  const pageGraph = {
    "@context": "https://schema.org",
    "@graph": [
      buildBreadcrumbSchema(breadcrumbItems),
      buildWebPageSchema({
        title: service.title,
        description: service.summary,
        path: `/leistungen/${service.slug}`,
        dateModified: service.updatedAt,
        breadcrumbItems,
      }),
      buildServiceSchema({
        title: service.title,
        description: service.summary,
        path: `/leistungen/${service.slug}`,
        serviceType: service.serviceType,
        audience: service.audience,
        offer: service.offer,
      }),
      buildFaqSchema(service.faqs),
    ],
  };

  return (
    <>
      <section className="relative overflow-hidden border-b border-black/10">
          <div className="pointer-events-none absolute -right-20 top-12 hidden h-56 w-56 rounded-full border border-black/10 lg:block" />
          <div className="mx-auto w-full max-w-6xl px-6 pb-8 pt-5 md:px-10 md:pb-5">
            <div className="flex flex-col gap-4 text-xs uppercase tracking-[0.35em] text-ink-soft md:flex-row md:flex-wrap md:items-center md:justify-between">
              <TransitionLink
                href="/#services"
                className="flex items-center gap-2 font-bold text-ink-soft hover:text-foreground"
                data-cursor-text="Zurück"
              >
                <span>↙</span>
                Zurück
              </TransitionLink>
              <div className="flex flex-col items-center gap-1 text-center md:hidden">
                <span>Leistung</span>
                <span className="font-bold text-foreground">
                  {service.shortTitle}
                </span>
              </div>
              <div className="hidden items-center gap-6 md:flex">
                <span>Leistung</span>
                <span className="font-bold text-foreground">
                  {service.shortTitle}
                </span>
              </div>
            </div>
            <div className="mt-6 text-[11px] uppercase tracking-[0.3em] text-ink-soft">
              <span>Aktualisiert: {updatedLabel}</span>
            </div>

            <div className="mt-8 grid gap-8 lg:mt-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-10">
              <div className="space-y-6 md:space-y-8">
                <div className="space-y-5 md:space-y-6">
                  <MaskedTextReveal
                    as="h1"
                    className="max-w-5xl font-display font-bold text-[10vw] uppercase tracking-[0.18em] leading-[0.9] md:text-6xl"
                  >
                    {service.title}
                  </MaskedTextReveal>
                  <FadeIn direction="up">
                    <p className="max-w-3xl text-base text-ink-soft md:text-xl">
                      {service.summary}
                    </p>
                  </FadeIn>
                  <div className="flex flex-wrap gap-2 text-[11px] uppercase tracking-[0.3em] text-ink-soft md:gap-3">
                    <span>{service.kicker}</span>
                    <span>{service.timeline}</span>
                  </div>
                </div>

                <FadeIn direction="up" className="border border-black/10 bg-white/70 p-5 shadow-[0_20px_50px_rgba(0,0,0,0.08)] md:p-6">
                  <p className="text-xs uppercase tracking-[0.35em] text-ink-soft">
                    Direkte Antwort
                  </p>
                  <p className="mt-3 max-w-3xl text-sm text-ink-soft md:mt-4 md:text-base">
                    {service.intro}
                  </p>
                </FadeIn>

                <div className="space-y-3 md:space-y-4">
                  <p className="text-xs uppercase tracking-[0.35em] text-ink-soft">
                    Typische Ausgangslage
                  </p>
                  <div className="grid gap-4 md:grid-cols-3">
                    {service.situations.map((situation, index) => (
                      <FadeIn
                        key={situation}
                        direction="up"
                        className={`border border-black/10 bg-white/70 p-4 shadow-[0_20px_40px_rgba(0,0,0,0.06)] md:p-5 ${
                          index >= 2 ? "hidden md:block" : ""
                        }`}
                      >
                        <p className="text-xs uppercase tracking-[0.35em] text-ink-soft">
                          Ausgangslage {String(index + 1).padStart(2, "0")}
                        </p>
                        <p className="mt-3 text-sm text-ink-soft md:mt-4">{situation}</p>
                      </FadeIn>
                    ))}
                  </div>
                </div>
              </div>

              <FadeIn direction="up" className="h-full">
                <aside className="flex h-full flex-col gap-5 border border-black/10 bg-white/70 p-5 shadow-[0_20px_50px_rgba(0,0,0,0.08)] md:gap-6 md:p-6">
                  <div>
                    <p className="text-xs uppercase tracking-[0.35em] text-ink-soft">
                      Leistungsrahmen
                    </p>
                    <p className="mt-2 font-display text-2xl font-bold uppercase tracking-[0.16em] md:mt-3 md:text-3xl">
                      {service.shortTitle}
                    </p>
                  </div>

                  <div className="grid gap-3 text-xs uppercase tracking-[0.3em] text-ink-soft md:gap-4">
                    <div className="flex flex-col items-start gap-2 border-b border-black/10 pb-3 md:flex-row md:items-center md:justify-between md:gap-6">
                      <span>Für wen</span>
                      <span className="max-w-[18rem] text-left text-sm normal-case tracking-normal text-foreground md:text-right">
                        {service.audience}
                      </span>
                    </div>
                    <div className="flex flex-col items-start gap-2 border-b border-black/10 pb-3 md:flex-row md:items-center md:justify-between md:gap-6">
                      <span>Zeitrahmen</span>
                      <span className="text-left text-sm normal-case tracking-normal text-foreground md:text-right">
                        {service.timeline}
                      </span>
                    </div>
                    <div className="border-b border-black/10 pb-3">
                      <span className="text-left text-sm normal-case tracking-normal text-foreground">
                        {service.pricingHint}
                      </span>
                    </div>
                  </div>

                  <div className="space-y-3 pt-2 md:space-y-4 md:pt-4">
                    <p className="text-xs uppercase tracking-[0.35em] text-ink-soft">
                      Enthalten
                    </p>
                    <div className="space-y-3 md:space-y-4">
                      {service.deliverables.map((deliverable, index) => (
                        <div
                          key={deliverable.title}
                          className={`border border-black/10 bg-white/80 p-4 ${
                            index >= 2 ? "hidden md:block" : ""
                          }`}
                        >
                          <p className="text-xs uppercase tracking-[0.3em] text-foreground">
                            {deliverable.title}
                          </p>
                          <p className="mt-2 text-sm text-ink-soft md:mt-3">
                            {deliverable.copy}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <MagneticLink
                    href="/#contact"
                    className="inline-flex w-full items-center justify-center gap-3 border border-black bg-black px-5 py-4 text-xs uppercase tracking-[0.3em] text-white shadow-[0_12px_30px_rgba(0,0,0,0.22)] transition-colors transition-shadow hover:bg-white hover:text-black hover:shadow-[0_16px_36px_rgba(0,0,0,0.16)] focus-visible:outline-none focus-visible:bg-white focus-visible:text-black focus-visible:ring-2 focus-visible:ring-black/25 md:justify-between"
                    data-cursor-text="Kontakt"
                  >
                    Erstgespräch buchen
                    <span className="text-lg">↗</span>
                  </MagneticLink>
                </aside>
              </FadeIn>
            </div>
          </div>
      </section>

      <section className="mx-auto w-full max-w-6xl px-6 py-14 md:px-10 md:py-20">
          <div className="flex flex-col gap-4 md:flex-row md:flex-wrap md:items-end md:justify-between md:gap-6">
            <div className="space-y-3">
              <p className="text-xs uppercase tracking-[0.35em] text-ink-soft">
                Noch nicht sicher? Kein Problem.
              </p>
              <MaskedTextReveal
                as="h2"
                className="font-display text-3xl font-bold uppercase tracking-[0.18em] md:text-4xl"
              >
                Wann diese Leistung passt
              </MaskedTextReveal>
            </div>
            <p className="hidden max-w-md text-sm text-ink-soft md:block">
              Gute Service-Seiten helfen nicht nur beim Verkaufen, sondern auch
              beim Aussortieren. Deshalb ist hier klar benannt, für welche
              Ausgangslage diese Leistung gedacht ist und wofür eher nicht.
            </p>
          </div>

          <div className="mt-8 grid gap-4 lg:mt-10 lg:gap-6 lg:grid-cols-2">
            <FadeIn direction="up" className="border border-black/10 bg-white/70 p-5 shadow-[0_20px_40px_rgba(0,0,0,0.06)] md:p-6">
              <p className="text-xs uppercase tracking-[0.35em] text-ink-soft">
                Passt gut, wenn <b>↑</b>
              </p>
              <ul className="mt-4 space-y-3 text-sm text-ink-soft md:mt-5 md:space-y-4">
                {service.idealFor.map((item, index) => (
                  <li
                    key={item}
                    className={`border-t border-black/10 pt-3 first:border-t-0 first:pt-0 md:pt-4 ${
                      index >= 2 ? "hidden md:list-item" : ""
                    }`}
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </FadeIn>
            <FadeIn direction="up" className="border border-black/10 bg-white/70 p-5 shadow-[0_20px_40px_rgba(0,0,0,0.06)] md:p-6">
              <p className="text-xs uppercase tracking-[0.35em] text-ink-soft">
                Eher nicht passend, wenn <b>↓</b>
              </p>
              <ul className="mt-4 space-y-3 text-sm text-ink-soft md:mt-5 md:space-y-4">
                {service.notFor.map((item, index) => (
                  <li
                    key={item}
                    className={`border-t border-black/10 pt-3 first:border-t-0 first:pt-0 md:pt-4 ${
                      index >= 2 ? "hidden md:list-item" : ""
                    }`}
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </FadeIn>
          </div>
      </section>

      <section className="border-y border-black/10 bg-white/60">
          <div className="mx-auto w-full max-w-6xl px-6 py-14 md:px-10 md:py-20">
            <div className="max-w-2xl space-y-4">
              <p className="text-xs uppercase tracking-[0.35em] text-ink-soft">
                Das Ergebnis
              </p>
              <h2 className="font-display text-3xl font-bold uppercase tracking-[0.18em] md:text-4xl">
                Was du nach dem Launch konkret hast
              </h2>
              <p className="text-sm text-ink-soft">
                Nicht nur eine schönere Oberfläche, sondern einen Auftritt, der
                Leistung, Vertrauen und nächsten Schritt klarer zusammenführt.
              </p>
            </div>

            <div className="mt-8 grid gap-4 md:mt-10 md:gap-6 md:grid-cols-3">
              {service.benefits.map((benefit) => (
                <FadeIn
                  key={benefit.title}
                  direction="up"
                  className="border border-black/10 bg-white/80 p-5 shadow-[0_20px_40px_rgba(0,0,0,0.06)] md:p-6"
                >
                  <p className="text-xs uppercase tracking-[0.35em] text-ink-soft">
                    Ergebnis
                  </p>
                  <h3 className="mt-4 font-display text-2xl font-bold uppercase tracking-[0.16em]">
                    {benefit.title}
                  </h3>
                  <p className="mt-4 text-sm text-ink-soft">{benefit.copy}</p>
                </FadeIn>
              ))}
            </div>
          </div>
      </section>

      <section className="mx-auto w-full max-w-6xl px-6 py-14 md:px-10 md:py-20">
          <div className="max-w-3xl space-y-4">
            <p className="text-xs uppercase tracking-[0.35em] text-ink-soft">
              Ablauf
            </p>
            <h2 className="font-display text-3xl font-bold uppercase tracking-[0.18em] md:text-4xl">
              So läuft die Zusammenarbeit ab
            </h2>
          </div>

          <div className="mt-8 grid gap-4 md:mt-10 md:gap-6 md:grid-cols-2">
            {service.process.map((step, index) => (
              <FadeIn
                key={step.title}
                direction="up"
                className={`border border-black/10 bg-white/70 p-5 shadow-[0_20px_40px_rgba(0,0,0,0.06)] md:p-6 ${
                  index >= 3 ? "hidden md:block" : ""
                }`}
              >
                <p className="text-xs uppercase tracking-[0.35em] text-ink-soft">
                  Schritt {String(index + 1).padStart(2, "0")}
                </p>
                <h3 className="mt-4 font-display text-2xl font-bold uppercase tracking-[0.16em]">
                  {step.title}
                </h3>
                <p className="mt-4 text-sm text-ink-soft">{step.description}</p>
              </FadeIn>
            ))}
          </div>
      </section>

      <section className="mx-auto w-full max-w-6xl px-6 py-14 md:px-10 md:py-20">
          <div className="max-w-3xl space-y-4">
            <p className="text-xs uppercase tracking-[0.35em] text-ink-soft">
              FAQ
            </p>
            <h2 className="font-display text-3xl font-bold uppercase tracking-[0.18em] md:text-4xl">
              Häufige Fragen zu dieser Leistung
            </h2>
            <p className="hidden text-sm text-ink-soft md:block">
              Klare Antworten auf typische Fragen zu Aufwand, Fit, Sichtbarkeit
              und Projektumfang.
            </p>
          </div>
          <div className="mt-8 grid gap-4 md:mt-10 md:grid-cols-2">
            {service.faqs.map((faq, index) => (
              <FadeIn
                key={faq.question}
                direction="up"
                className={`border border-black/10 bg-white/70 p-5 shadow-[0_20px_40px_rgba(0,0,0,0.06)] md:p-6 ${
                  index >= 3 ? "hidden md:block" : ""
                }`}
              >
                <h3 className="font-display text-xl font-bold uppercase tracking-[0.14em]">
                  {faq.question}
                </h3>
                <p className="mt-4 text-sm text-ink-soft">{faq.answer}</p>
              </FadeIn>
            ))}
          </div>
      </section>

      {relatedProjects.length > 0 ? (
        <section className="border-t border-black/10 bg-white/60">
          <div className="mx-auto w-full max-w-6xl px-6 py-14 md:px-10 md:py-20">
            <div className="flex flex-wrap items-end justify-between gap-6">
              <div className="space-y-3">
                <p className="text-xs uppercase tracking-[0.35em] text-ink-soft">
                  Passende Referenzen
                </p>
                <h2 className="font-display text-3xl font-bold uppercase tracking-[0.18em] md:text-4xl">
                  Diese Projekte zeigen die Leistung im Einsatz
                </h2>
              </div>
              <p className="max-w-md text-sm text-ink-soft">
                Verknüpfte Case Studies und Projekte machen sichtbar, wie die
                Leistung in echten Umsetzungen aussieht und welche Resultate
                daraus entstehen.
              </p>
            </div>

            <div className="mt-8 grid gap-4 md:mt-10 md:grid-cols-2">
              {relatedProjects.map((project) => (
                <TransitionLink
                  key={project.slug}
                  href={`/work/${project.slug}`}
                  className="group flex flex-col justify-between border border-black/10 bg-white/80 p-5 shadow-[0_20px_40px_rgba(0,0,0,0.06)] md:p-6"
                >
                  <div className="space-y-3">
                    <p className="text-xs uppercase tracking-[0.35em] text-ink-soft">
                      {project.type ?? "Projekt"}
                    </p>
                    <h3 className="font-display text-2xl font-bold uppercase tracking-[0.16em]">
                      {project.title}
                    </h3>
                    <p className="text-sm text-ink-soft">{project.summary}</p>
                  </div>
                  <div className="mt-6 flex items-center justify-between text-xs uppercase tracking-[0.35em]">
                    <span>Zur Case Study</span>
                    <span>↗</span>
                  </div>
                </TransitionLink>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <section className="border-t border-black/10 bg-white/60">
          <div className="mx-auto grid w-full max-w-6xl gap-6 px-6 py-14 md:grid-cols-[1fr_auto] md:px-10 md:py-20">
            <div className="space-y-4">
              <p className="text-xs uppercase tracking-[0.35em] text-ink-soft">
                Nächster Schritt
              </p>
              <h2 className="font-display text-3xl font-bold uppercase tracking-[0.18em] md:text-4xl">
                {service.ctaTitle}
              </h2>
              <p className="max-w-2xl text-sm text-ink-soft">{service.ctaCopy}</p>
            </div>
            <div className="flex justify-center md:items-center md:justify-end">
              <MagneticLink
                href="/#contact"
                className="inline-flex items-center gap-3 border border-black bg-black px-5 py-4 text-xs uppercase tracking-[0.3em] text-white shadow-[0_12px_30px_rgba(0,0,0,0.22)] transition-colors transition-shadow hover:bg-white hover:text-black hover:shadow-[0_16px_36px_rgba(0,0,0,0.16)] focus-visible:outline-none focus-visible:bg-white focus-visible:text-black focus-visible:ring-2 focus-visible:ring-black/25"
                data-cursor-text="Kontakt"
              >
                Erstgespräch buchen
                <span className="text-lg">↗</span>
              </MagneticLink>
            </div>
          </div>
      </section>
      <JsonLd data={pageGraph} />
    </>
  );
}
