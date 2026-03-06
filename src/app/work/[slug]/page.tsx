import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { FadeIn } from "@/components/animations/FadeIn";
import { ImageReveal } from "@/components/animations/ImageReveal";
import { MaskedTextReveal } from "@/components/animations/MaskedTextReveal";
import { JsonLd } from "@/components/seo/JsonLd";
import { TransitionLink } from "@/components/ui/TransitionLink";
import { MagneticLink } from "@/components/animations/MagneticLink";
import {
  getPortfolioProjectBySlug,
  getPortfolioProjects,
  type PortfolioProject,
} from "@/lib/projects";
import {
  buildBreadcrumbSchema,
  buildPageMetadata,
  buildWebPageSchema,
  formatGermanDate,
  siteConfig,
} from "@/lib/seo";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export const dynamicParams = false;

export async function generateStaticParams() {
  const projects = await getPortfolioProjects();
  return projects.map((project) => ({ slug: project.slug }));
}

const buildNarrative = (project: PortfolioProject) => {
  const client = project.client ?? "ein Berliner Team";
  const services =
    project.services.length > 0
      ? project.services
      : ["Strategie", "Design", "Entwicklung"];

  const overview =
    project.body ||
    project.summary ||
    `Für ${client} entstand eine Website, die Haltung, Angebot und Persönlichkeit in eine klare digitale Struktur übersetzt.`;

  const challenge =
    project.problem ||
    "Die Herausforderung lag in der Verdichtung der Inhalte und der klaren Führung zu Anfrage und Kontakt.";

  const solution =
    project.approach ||
    `Die Lösung: ein stringenter Aufbau mit reduzierter Typografie, klaren Navigationsankern und einer visuellen Dramaturgie, die ${services
      .slice(0, 2)
      .join(" und ")} sichtbar macht.`;

  const results = (project.outcomes ?? [
    "Das Markenbild wirkt präziser und vermittelt auf den ersten Blick mehr Expertise.",
    "Besucher:innen finden Angebote, Preise und Kontakt ohne Umwege auf allen Geräten.",
    "Ein schlankes System für Inhalte und Medien macht zukünftige Updates planbar.",
  ]).map((copy, index) => ({
    title: ["Schärfere Positionierung", "Schnelle Orientierung", "Saubere Übergabe"][
      index
    ] ?? `Ergebnis ${index + 1}`,
    copy,
  }));

  const stats = [
    {
      label: "Branche",
      value: project.sector ?? "Digitale Marke",
    },
    {
      label: "Leistungen",
      value: services.join(" · "),
    },
    {
      label: "Zeitrahmen",
      value: "4-6 Wochen",
    },
    {
      label: "Launch",
      value: project.year ?? "2025",
    },
  ];

  return { overview, challenge, solution, results, stats, services };
};

const PROJECT_LAST_EDITED_AT = "2026-03-06";

const getProjectDateModified = (project: PortfolioProject) => {
  return project.updatedAt ?? PROJECT_LAST_EDITED_AT;
};

const getProjectUpdatedLabel = (project: PortfolioProject) => {
  return formatGermanDate(project.updatedAt ?? PROJECT_LAST_EDITED_AT);
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project =
    (await getPortfolioProjectBySlug(slug)) ||
    (await getPortfolioProjects())[0];

  if (!project) {
    return {
      title: "Case Study nicht gefunden - STACKWERKHAUS",
    };
  }

  const title = `Case Study: ${project.title}`;
  const description =
    project.summary ||
    project.body ||
    "Case Study-Detailansicht aus dem Portfolio von STACKWERKHAUS.";

  return buildPageMetadata({
    title,
    description,
    path: `/work/${project.slug}`,
    type: "article",
    image: project.cover?.url || siteConfig.ogImage,
  });
}

export default async function WorkDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const project =
    (await getPortfolioProjectBySlug(slug)) ||
    (await getPortfolioProjects())[0];
  if (!project) notFound();
  const projectType = project.type ?? "Projekt";

  const projects = await getPortfolioProjects();
  const moreProjects = projects
    .filter((item) => item.slug !== project.slug)
    .slice(0, 3);

  const { overview, challenge, solution, results, stats, services } =
    buildNarrative(project);
  const breadcrumbItems = [
    { name: "Start", path: "/" },
    { name: "Projekte", path: "/work" },
    { name: project.title, path: `/work/${project.slug}` },
  ];
  const pageGraph = {
    "@context": "https://schema.org",
    "@graph": [
      buildBreadcrumbSchema(breadcrumbItems),
      buildWebPageSchema({
        title: `Case Study: ${project.title}`,
        description: project.summary || project.body || project.title,
        path: `/work/${project.slug}`,
        dateModified: getProjectDateModified(project),
        breadcrumbItems,
      }),
    ],
  };

  return (
    <>
      <div>
      <section className="relative overflow-hidden border-b border-black/10">
        <div className="pointer-events-none absolute -right-20 top-12 hidden h-56 w-56 rounded-full border border-black/10 lg:block" />
        <div className="mx-auto w-full max-w-6xl px-6 pb-16 pt-5 md:px-10">
          <div className="flex flex-wrap items-center justify-between gap-4 text-xs uppercase tracking-[0.35em] text-ink-soft">
            <TransitionLink
              href="/#work"
              className="flex items-center gap-2 text-ink-soft hover:text-foreground font-bold"
              data-cursor-text="Zurück"
            >
              <span>↙</span>
              Zurück
            </TransitionLink>
            <span>{projectType}</span>
            <span className="font-bold text-foreground">
              {project.client ?? "STACKWERKHAUS"}
            </span>
          </div>
          <div className="mt-6 text-[11px] uppercase tracking-[0.3em] text-ink-soft">
            <span>Aktualisiert: {getProjectUpdatedLabel(project)}</span>
          </div>

          <div className="mt-10 grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="space-y-6">
              <MaskedTextReveal
                as="h1"
                className="font-display font-bold text-[10vw] uppercase tracking-[0.18em] leading-[0.9] md:text-6xl"
              >
                {project.title}
              </MaskedTextReveal>
              <FadeIn direction="up">
                <p className="max-w-xl text-lg text-ink-soft md:text-xl">
                  {project.summary ||
                    `${projectType === "Case Study" ? "Eine Case Study" : "Ein Projekt"}, das Klarheit, Geschwindigkeit und Wirkung in einen digitalen Auftritt übersetzt.`}
                </p>
              </FadeIn>
              <FadeIn direction="up" className="space-y-5 text-sm text-ink-soft">
                <div>
                  <p className="text-xs uppercase tracking-[0.35em] text-ink-soft">
                    Überblick
                  </p>
                  <p>{overview}</p>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-[0.35em] text-ink-soft">
                    Herausforderung
                  </p>
                  <p>{challenge}</p>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-[0.35em] text-ink-soft">
                    Lösung
                  </p>
                  <p>{solution}</p>
                </div>
              </FadeIn>
            </div>

            <FadeIn direction="up">
              <div className="flex flex-col gap-6 border border-black/10 bg-white/70 p-6 shadow-[0_20px_50px_rgba(0,0,0,0.08)]">
                <div>
                  <p className="text-xs uppercase tracking-[0.35em] text-ink-soft">
                    {projectType === "Case Study"
                      ? "Case Study Details"
                      : "Projektdetails"}
                  </p>
                  <p className="font-display text-2xl font-bold uppercase tracking-[0.2em]">
                    {project.client || "Stackwerkhaus"}
                  </p>
                </div>
                <div className="grid gap-4 text-xs uppercase tracking-[0.3em] text-ink-soft">
                  {stats.map((stat) => (
                    <div
                      key={stat.label}
                      className="flex items-center justify-between border-b border-black/10 pb-3"
                    >
                      <span
                        className={`flex-1 ${
                          stat.label === "Leistungen" ? "text-left" : ""
                        }`}
                      >
                        {stat.label}
                      </span>
                      <span
                        className={`text-foreground ${
                          stat.label === "Leistungen" ? "text-right" : ""
                        }`}
                      >
                        {stat.value}
                      </span>
                    </div>
                  ))}
                </div>
                <div className="flex flex-wrap gap-2">
                  {services.map((service) => (
                    <span
                      key={service}
                      className="border border-black/20 px-3 py-1 text-[11px] uppercase tracking-[0.3em]"
                    >
                      {service}
                    </span>
                  ))}
                </div>
                {project.website && (
                  <MagneticLink
                    href={project.website}
                    target="_blank"
                    rel="noreferrer"
                    strength={0.15}
                    className="flex w-full items-center border border-black/20 px-5 py-4 text-xs uppercase tracking-[0.3em] transition-colors transition-shadow hover:bg-black hover:text-white hover:shadow-[0_12px_30px_rgba(0,0,0,0.12)] focus-visible:shadow-[0_12px_30px_rgba(0,0,0,0.12)]"
                  >
                    <span className="flex w-full items-center justify-between gap-6">
                      <span className="flex items-center gap-3">
                        Live ansehen
                        <span className="text-lg">↗</span>
                      </span>
                      <span className="justify-right flex h-2.5 w-2.5 items-center justify-center">
                        <span className="absolute h-2.5 w-2.5 rounded-full bg-red-500/60 animate-ping" />
                        <span className="relative h-2 w-2 rounded-full bg-red-500" />
                      </span>
                    </span>
                  </MagneticLink>
                )}
                <div className="flex items-center justify-between border-t border-black/10 pt-4 text-xs uppercase tracking-[0.35em]">
                  <span>STACKWERKHAUS</span>
                  <span>{project.year ?? "2025"}</span>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>

        <div className="mx-auto w-full max-w-6xl px-6 pb-10 md:px-10">
          <FadeIn direction="up" className="grid gap-6 md:grid-cols-[1.2fr_0.8fr]">
            <div className="space-y-4">
              <p className="text-xs uppercase tracking-[0.35em] text-ink-soft">
                Projektfokus
              </p>
              <MaskedTextReveal
                as="h2"
                className="font-display font-bold text-3xl uppercase tracking-[0.2em] md:text-4xl"
              >
                Von Positionierung bis Livegang
              </MaskedTextReveal>
              <p className="text-sm text-ink-soft">
                Diese Case Study zeigt nicht nur das Ergebnis, sondern den
                strukturellen Hebel dahinter: bessere Reihenfolge,
                verständlichere Leistungsdarstellung und ein klarerer Weg zur
                Kontaktaufnahme.
              </p>
            </div>
          </FadeIn>
        </div>

        <div className="mx-auto w-full max-w-6xl px-6 pb-24 md:px-10">
          <FadeIn direction="up" trigger="load">
            <div className="relative aspect-[16/9] overflow-hidden border border-black/10 bg-white/60 shadow-[0_20px_50px_rgba(0,0,0,0.08)]">
              {project.cover?.url ? (
                <ImageReveal
                  src={project.cover.url}
                  alt={project.cover.alt || project.title}
                  fill
                  sizes="(min-width: 1024px) 80vw, 100vw"
                  className="h-full w-full"
                  direction="up"
                  trigger="load"
                  fetchPriority="low"
                />
              ) : (
                <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(198,90,46,0.3),rgba(21,21,20,0.15))]" />
              )}
              <div className="absolute inset-0 bg-black/10" />
            </div>
          </FadeIn>
        </div>
      </section>

      <section className="border-b border-black/10 bg-white/60">
        <div className="mx-auto w-full max-w-6xl px-6 py-24 md:px-10">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div className="space-y-3">
              <p className="text-xs uppercase tracking-[0.35em] text-ink-soft">
                Ergebnis
              </p>
              <MaskedTextReveal
                as="h2"
                className="font-display font-bold text-4xl uppercase tracking-[0.2em] md:text-5xl"
              >
                Wirkung & Resultat
              </MaskedTextReveal>
            </div>
            <p className="max-w-md text-sm text-ink-soft">
              Konkrete Verbesserungen, die aus der neuen Struktur, ruhigeren
              Darstellung und einem besseren Anfragepfad entstanden sind.
            </p>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {results.map((item) => (
              <FadeIn
                key={item.title}
                direction="up"
                className="border border-black/10 bg-white/80 p-6 shadow-[0_20px_40px_rgba(0,0,0,0.06)]"
              >
                <p className="text-xs uppercase tracking-[0.35em] text-ink-soft">
                  Ergebnis
                </p>
                <h3 className="mt-4 font-display text-2xl font-bold uppercase tracking-[0.18em]">
                  {item.title}
                </h3>
                <p className="mt-4 text-sm text-ink-soft">{item.copy}</p>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-black/10">
        <div className="mx-auto grid w-full max-w-6xl gap-8 px-6 py-16 md:grid-cols-[1fr_auto] md:px-10">
          <div className="space-y-3">
            <p className="text-xs uppercase tracking-[0.35em] text-ink-soft">
              Ähnliches Projekt geplant?
            </p>
            <h2 className="font-display text-3xl font-bold uppercase tracking-[0.2em] md:text-4xl">
              Wir können denselben Klarheitsgewinn auf deine Website übertragen.
            </h2>
            <p className="max-w-2xl text-sm text-ink-soft">
              Im Erstgespräch klären wir, wo dein aktueller Auftritt Reibung
              erzeugt und welche Seiten oder Leistungsblöcke den größten Hebel
              haben.
            </p>
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

      <section className="mx-auto w-full max-w-6xl px-6 py-24 md:px-10">
        <div className="flex flex-wrap items-baseline justify-between gap-6">
          <div className="space-y-3">
            <MaskedTextReveal
              as="h2"
              className="font-display font-bold text-4xl uppercase tracking-[0.2em] md:text-5xl"
            >
              Weitere Projekte
            </MaskedTextReveal>
          </div>
          <TransitionLink
            href="/#work"
            className="text-xs font-bold uppercase tracking-[0.35em] text-ink-soft hover:text-foreground"
            data-cursor-text="Übersicht"
          >
            Zur Übersicht
          </TransitionLink>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {moreProjects.map((item) => (
            <TransitionLink
              key={item.id}
              href={`/work/${item.slug}`}
              className="group flex flex-col justify-between border border-black/10 bg-white/70 p-6 shadow-[0_20px_40px_rgba(0,0,0,0.06)]"
              data-cursor-text="Ansehen"
            >
              <div className="space-y-4">
                <div className="relative h-28 w-full overflow-hidden border border-black/10 bg-[linear-gradient(135deg,rgba(198,90,46,0.2),rgba(21,21,20,0.08))]">
                  {item.cover?.url && (
                    <Image
                      src={item.cover.url}
                      alt={item.cover.alt || item.title}
                      fill
                      sizes="(min-width: 768px) 20vw, 80vw"
                      className="object-cover blur-sm"
                    />
                  )}
                  <div className="absolute inset-0 bg-black/10" />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-[0.35em] text-ink-soft">
                    {item.client ||
                      item.services[0] ||
                      item.type ||
                      "Projekt"}
                  </p>
                  <h3 className="font-display text-2xl font-bold uppercase tracking-[0.18em]">
                    {item.title}
                  </h3>
                </div>
              </div>
              <div className="mt-6 flex items-center justify-between text-xs uppercase tracking-[0.35em]">
                <span>
                  {item.type === "Case Study" ? "Zur Case Study" : "Zum Projekt"}
                </span>
                <span>↗</span>
              </div>
            </TransitionLink>
          ))}
        </div>
      </section>
      </div>
      <JsonLd data={pageGraph} />
    </>
  );
}
