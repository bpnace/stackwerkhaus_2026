import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { FadeIn } from "@/components/animations/FadeIn";
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
import { getPortfolioProjects } from "@/lib/projects";
import { getServiceBySlug, getServices } from "@/lib/services";

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

  const projects = await getPortfolioProjects();
  const relatedProjects = projects.filter((project) =>
    service.relatedProjectSlugs.includes(project.slug),
  );
  const breadcrumbItems = [
    { name: "Start", path: "/" },
    { name: "Leistungen", path: "/leistungen" },
    { name: service.shortTitle, path: `/leistungen/${service.slug}` },
  ];
  const updatedLabel = formatGermanDate(service.updatedAt);
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
      }),
      buildFaqSchema(service.faqs),
    ],
  };

  return (
    <>
      <main>
        <section className="relative overflow-hidden border-b border-black/10">
          <div className="pointer-events-none absolute -right-20 top-12 hidden h-56 w-56 rounded-full border border-black/10 lg:block" />
          <div className="mx-auto w-full max-w-6xl px-6 pb-5 md:px-10 md:pt-5">
            <div className="flex flex-wrap items-center justify-between gap-4 text-xs uppercase tracking-[0.35em] text-ink-soft">
              <TransitionLink
                href="/leistungen"
                className="flex items-center gap-2 font-bold text-ink-soft hover:text-foreground"
                data-cursor-text="Zurück"
              >
                <span>↙</span>
                Zur Leistungen
              </TransitionLink>
              <span>Leistung</span>
              <span className="font-bold text-foreground">{service.shortTitle}</span>
            </div>
            <div className="mt-6 flex flex-wrap gap-3 text-[11px] uppercase tracking-[0.3em] text-ink-soft">
              <span>{service.kicker}</span>
              <span>{service.timeline}</span>
              <span>Aktualisiert: {updatedLabel}</span>
            </div>

            <div className="mt-10 grid gap-10 lg:grid-cols-[1.05fr_0.95fr]">
              <div className="space-y-8">
                <div className="space-y-6">
                  <MaskedTextReveal
                    as="h1"
                    className="max-w-5xl font-display text-4xl font-bold uppercase tracking-[0.16em] md:text-6xl"
                  >
                    {service.title}
                  </MaskedTextReveal>
                  <FadeIn direction="up">
                    <p className="max-w-3xl text-lg text-ink-soft md:text-xl">
                      {service.summary}
                    </p>
                  </FadeIn>
                </div>

                <FadeIn direction="up" className="border border-black/10 bg-white/70 p-6 shadow-[0_20px_50px_rgba(0,0,0,0.08)]">
                  <p className="text-xs uppercase tracking-[0.35em] text-ink-soft">
                    Direkte Antwort
                  </p>
                  <p className="mt-4 max-w-3xl text-sm text-ink-soft md:text-base">
                    {service.intro}
                  </p>
                </FadeIn>

                <div className="space-y-4">
                  <p className="text-xs uppercase tracking-[0.35em] text-ink-soft">
                    Typische Ausgangslage
                  </p>
                  <div className="grid gap-4 md:grid-cols-3">
                    {service.situations.map((situation, index) => (
                      <FadeIn
                        key={situation}
                        direction="up"
                        className="border border-black/10 bg-white/70 p-5 shadow-[0_20px_40px_rgba(0,0,0,0.06)]"
                      >
                        <p className="text-xs uppercase tracking-[0.35em] text-ink-soft">
                          Ausgangslage {String(index + 1).padStart(2, "0")}
                        </p>
                        <p className="mt-4 text-sm text-ink-soft">{situation}</p>
                      </FadeIn>
                    ))}
                  </div>
                </div>
              </div>

              <FadeIn direction="up" className="h-full">
                <aside className="flex h-full flex-col gap-6 border border-black/10 bg-white/70 p-6 shadow-[0_20px_50px_rgba(0,0,0,0.08)]">
                  <div>
                    <p className="text-xs uppercase tracking-[0.35em] text-ink-soft">
                      Leistungsrahmen
                    </p>
                    <p className="mt-3 font-display text-3xl font-bold uppercase tracking-[0.16em]">
                      {service.shortTitle}
                    </p>
                  </div>

                  <div className="grid gap-4 text-xs uppercase tracking-[0.3em] text-ink-soft">
                    <div className="flex items-center justify-between gap-6 border-b border-black/10 pb-3">
                      <span>Für wen</span>
                      <span className="max-w-[18rem] text-right text-sm normal-case tracking-normal text-foreground">
                        {service.audience}
                      </span>
                    </div>
                    <div className="flex items-center justify-between gap-6 border-b border-black/10 pb-3">
                      <span>Zeitrahmen</span>
                      <span className="text-right text-sm normal-case tracking-normal text-foreground">
                        {service.timeline}
                      </span>
                    </div>
                    <div className="flex items-center justify-between gap-6 border-b border-black/10 pb-3">
                      <span>Investition</span>
                      <span className="max-w-[18rem] text-right text-sm normal-case tracking-normal text-foreground">
                        {service.pricingHint}
                      </span>
                    </div>
                    <div className="flex items-center justify-between gap-6 border-b border-black/10 pb-3">
                      <span>Aktualisiert</span>
                      <span className="text-right text-sm normal-case tracking-normal text-foreground">
                        {updatedLabel}
                      </span>
                    </div>
                  </div>

                  <div className="space-y-4 border-t border-black/10 pt-6">
                    <p className="text-xs uppercase tracking-[0.35em] text-ink-soft">
                      Enthalten
                    </p>
                    <div className="space-y-4">
                      {service.deliverables.map((deliverable) => (
                        <div key={deliverable.title} className="border border-black/10 bg-white/80 p-4">
                          <p className="text-xs uppercase tracking-[0.3em] text-foreground">
                            {deliverable.title}
                          </p>
                          <p className="mt-3 text-sm text-ink-soft">
                            {deliverable.copy}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <TransitionLink
                    href="/#contact"
                    className="inline-flex w-full items-center justify-between border border-black/20 px-5 py-4 text-xs uppercase tracking-[0.3em] transition-colors hover:bg-black hover:text-white"
                    data-cursor-text="Kontakt"
                  >
                    Erstgespräch buchen
                    <span className="text-lg">↗</span>
                  </TransitionLink>
                </aside>
              </FadeIn>
            </div>
          </div>
        </section>

        <section className="mx-auto w-full max-w-6xl px-6 py-20 md:px-10">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div className="space-y-3">
              <p className="text-xs uppercase tracking-[0.35em] text-ink-soft">
                Entscheidungshilfe
              </p>
              <MaskedTextReveal
                as="h2"
                className="font-display text-3xl font-bold uppercase tracking-[0.18em] md:text-4xl"
              >
                Wann diese Leistung passt
              </MaskedTextReveal>
            </div>
            <p className="max-w-md text-sm text-ink-soft">
              Gute Service-Seiten helfen nicht nur beim Verkaufen, sondern auch
              beim Aussortieren. Deshalb ist hier klar benannt, für welche
              Ausgangslage diese Leistung gedacht ist und wofür eher nicht.
            </p>
          </div>

          <div className="mt-10 grid gap-6 lg:grid-cols-2">
            <FadeIn direction="up" className="border border-black/10 bg-white/70 p-6 shadow-[0_20px_40px_rgba(0,0,0,0.06)]">
              <p className="text-xs uppercase tracking-[0.35em] text-ink-soft">
                Passt gut, wenn
              </p>
              <ul className="mt-5 space-y-4 text-sm text-ink-soft">
                {service.idealFor.map((item) => (
                  <li key={item} className="border-t border-black/10 pt-4 first:border-t-0 first:pt-0">
                    {item}
                  </li>
                ))}
              </ul>
            </FadeIn>
            <FadeIn direction="up" className="border border-black/10 bg-white/70 p-6 shadow-[0_20px_40px_rgba(0,0,0,0.06)]">
              <p className="text-xs uppercase tracking-[0.35em] text-ink-soft">
                Eher nicht passend, wenn
              </p>
              <ul className="mt-5 space-y-4 text-sm text-ink-soft">
                {service.notFor.map((item) => (
                  <li key={item} className="border-t border-black/10 pt-4 first:border-t-0 first:pt-0">
                    {item}
                  </li>
                ))}
              </ul>
            </FadeIn>
          </div>
        </section>

        <section className="border-y border-black/10 bg-white/60">
          <div className="mx-auto w-full max-w-6xl px-6 py-20 md:px-10">
            <div className="max-w-2xl space-y-4">
              <p className="text-xs uppercase tracking-[0.35em] text-ink-soft">
                Ergebnisbild
              </p>
              <h2 className="font-display text-3xl font-bold uppercase tracking-[0.18em] md:text-4xl">
                Was du nach dem Launch konkret hast
              </h2>
              <p className="text-sm text-ink-soft">
                Nicht nur eine schönere Oberfläche, sondern einen Auftritt, der
                Leistung, Vertrauen und nächsten Schritt klarer zusammenführt.
              </p>
            </div>

            <div className="mt-10 grid gap-6 md:grid-cols-3">
              {service.benefits.map((benefit) => (
                <FadeIn
                  key={benefit.title}
                  direction="up"
                  className="border border-black/10 bg-white/80 p-6 shadow-[0_20px_40px_rgba(0,0,0,0.06)]"
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

        <section className="mx-auto w-full max-w-6xl px-6 py-20 md:px-10">
          <div className="max-w-2xl space-y-4">
            <p className="text-xs uppercase tracking-[0.35em] text-ink-soft">
              Ablauf
            </p>
            <h2 className="font-display text-3xl font-bold uppercase tracking-[0.18em] md:text-4xl">
              So läuft die Leistung ab
            </h2>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {service.process.map((step, index) => (
              <FadeIn
                key={step.title}
                direction="up"
                className="border border-black/10 bg-white/70 p-6 shadow-[0_20px_40px_rgba(0,0,0,0.06)]"
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

        <section className="border-y border-black/10 bg-white/60">
          <div className="mx-auto w-full max-w-6xl px-6 py-20 md:px-10">
            <div className="flex flex-wrap items-end justify-between gap-6">
              <div className="space-y-3">
                <p className="text-xs uppercase tracking-[0.35em] text-ink-soft">
                  Passende Beispiele
                </p>
                <h2 className="font-display text-3xl font-bold uppercase tracking-[0.18em] md:text-4xl">
                  Relevante Projekte
                </h2>
              </div>
              <p className="max-w-md text-sm text-ink-soft">
                Diese Projekte zeigen, wie ähnliche Ausgangslagen in klarere
                Nutzerführung, bessere Vertrauenssignale und stärkere
                Kontaktpfade übersetzt wurden.
              </p>
            </div>

            <div
              className={`mt-10 grid gap-6 ${
                relatedProjects.length === 2 ? "md:grid-cols-2" : "md:grid-cols-3"
              }`}
            >
              {relatedProjects.map((project) => (
                <TransitionLink
                  key={project.slug}
                  href={`/work/${project.slug}`}
                  className="group flex h-full flex-col justify-between border border-black/10 bg-white/70 p-6 shadow-[0_20px_40px_rgba(0,0,0,0.06)]"
                  data-cursor-text="Ansehen"
                >
                  <div className="space-y-4">
                    <p className="text-xs uppercase tracking-[0.35em] text-ink-soft">
                      {project.sector ?? project.type ?? "Projekt"}
                    </p>
                    <h3 className="font-display text-2xl font-bold uppercase tracking-[0.16em]">
                      {project.title}
                    </h3>
                    <p className="text-sm text-ink-soft">{project.summary}</p>
                  </div>
                  <div className="mt-8 flex items-center justify-between text-xs uppercase tracking-[0.35em]">
                    <span>
                      {project.type === "Case Study" ? "Zur Case Study" : "Zum Projekt"}
                    </span>
                    <span>↗</span>
                  </div>
                </TransitionLink>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto w-full max-w-6xl px-6 py-20 md:px-10">
          <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
            <div className="space-y-4">
              <p className="text-xs uppercase tracking-[0.35em] text-ink-soft">
                FAQ
              </p>
              <h2 className="font-display text-3xl font-bold uppercase tracking-[0.18em] md:text-4xl">
                Häufige Fragen zu dieser Leistung
              </h2>
              <p className="text-sm text-ink-soft">
                Klare Antworten auf typische Fragen zu Aufwand, Fit,
                Sichtbarkeit und Projektumfang.
              </p>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              {service.faqs.map((faq) => (
                <FadeIn
                  key={faq.question}
                  direction="up"
                  className="border border-black/10 bg-white/70 p-6 shadow-[0_20px_40px_rgba(0,0,0,0.06)]"
                >
                  <h3 className="font-display text-xl font-bold uppercase tracking-[0.14em]">
                    {faq.question}
                  </h3>
                  <p className="mt-4 text-sm text-ink-soft">{faq.answer}</p>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>

        <section className="border-t border-black/10 bg-white/60">
          <div className="mx-auto grid w-full max-w-6xl gap-8 px-6 py-20 md:grid-cols-[1fr_auto] md:px-10">
            <div className="space-y-4">
              <p className="text-xs uppercase tracking-[0.35em] text-ink-soft">
                Nächster Schritt
              </p>
              <h2 className="font-display text-3xl font-bold uppercase tracking-[0.18em] md:text-4xl">
                {service.ctaTitle}
              </h2>
              <p className="max-w-2xl text-sm text-ink-soft">{service.ctaCopy}</p>
            </div>
            <div className="flex items-center">
              <TransitionLink
                href="/#contact"
                className="inline-flex items-center gap-3 border border-black/20 px-5 py-4 text-xs uppercase tracking-[0.3em] transition-colors hover:bg-black hover:text-white"
                data-cursor-text="Kontakt"
              >
                Erstgespräch buchen
                <span className="text-lg">↗</span>
              </TransitionLink>
            </div>
          </div>
        </section>
      </main>
      <JsonLd data={pageGraph} />
    </>
  );
}
