import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { FadeIn } from "@/components/animations/FadeIn";
import { ImageReveal } from "@/components/animations/ImageReveal";
import { MaskedTextReveal } from "@/components/animations/MaskedTextReveal";
import { TransitionLink } from "@/components/ui/TransitionLink";
import { MagneticLink } from "@/components/animations/MagneticLink";
import {
  getPortfolioProjectBySlug,
  getPortfolioProjects,
  type PortfolioProject,
} from "@/lib/projects";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export const dynamicParams = true;

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
    "Die Herausforderung lag in der Verdichtung der Inhalte und der klaren Führung zu Anfrage und Kontakt.";

  const solution = `Die Lösung: ein stringenter Aufbau mit reduzierter Typografie, klaren Navigationsankern und einer visuellen Dramaturgie, die ${services
    .slice(0, 2)
    .join(" und ")
    } sichtbar macht.`;

  const results = [
    {
      title: "Schärfere Positionierung",
      copy: "Das Markenbild wirkt präziser, ruhiger und vermittelt auf den ersten Blick die Expertise.",
    },
    {
      title: "Schnelle Orientierung",
      copy: "Besucher:innen finden Angebote, Preise und Kontakt ohne Umwege auf allen Devices.",
    },
    {
      title: "Saubere Übergabe",
      copy: "Ein schlankes System für Inhalte und Medien macht zukünftige Updates planbar.",
    },
  ];

  const stats = [
    {
      label: "Leistungen",
      value: services.join(" · "),
    },
    {
      label: "Zeitrahmen",
      value: "4–6 Wochen",
    },
    {
      label: "Launch",
      value: project.year ?? "2025",
    },
  ];

  return { overview, challenge, solution, results, stats, services };
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project =
    (await getPortfolioProjectBySlug(slug)) ||
    (await getPortfolioProjects())[0];

  if (!project) {
    return {
      title: "Projekt nicht gefunden - STACKWERKHAUS",
    };
  }

  const projectType = project.type ?? "Projekt";
  const title = `${project.title} – STACKWERKHAUS`;
  const description =
    project.summary ||
    project.body ||
    `${
      projectType === "Case Study" ? "Case Study" : "Projekt"
    }-Detailansicht aus dem Portfolio von STACKWERKHAUS.`;

  return {
    title,
    description,
    alternates: {
      canonical: `/work/${project.slug}`,
    },
    openGraph: {
      type: "article",
      locale: "de_DE",
      url: `/work/${project.slug}`,
      siteName: "STACKWERKHAUS",
      title,
      description,
      images: [
        {
          url: project.cover?.url || "/images/og_image.webp",
          alt: project.cover?.alt || project.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [project.cover?.url || "/images/og_image.webp"],
    },
  };
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

  return (
    <div>
      <section className="relative overflow-hidden border-b border-black/10">
        <div className="pointer-events-none absolute -right-20 top-12 hidden h-56 w-56 rounded-full border border-black/10 lg:block" />
        <div className="mx-auto w-full max-w-6xl px-6 pb-16 pt-24 md:px-10">
          <div className="flex flex-wrap items-center justify-between gap-4 text-xs uppercase tracking-[0.35em] text-ink-soft">
            <TransitionLink
              href="/#work"
              className="inline-flex items-center gap-2 border border-black/20 px-4 py-2 text-[11px] uppercase tracking-[0.3em] text-ink-soft transition-colors hover:bg-black hover:text-white"
              data-cursor-text="Zurück"
            >
              <span>↙</span>
              Zurück zur Übersicht
            </TransitionLink>
            <span>{projectType}</span>
            <span className="font-bold text-foreground">
              {project.client ?? "STACKWERKHAUS"}
            </span>
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
                    `${projectType === "Case Study" ? "Eine Case Study" : "Ein Projekt"}, das Klarheit, Geschwindigkeit und Wirkung in eine prägnante Marke übersetzt.`}
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
                  priority
                  fetchPriority="high"
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
              Ein klares System, das Markenführung, Content und Conversion in
              Einklang bringt.
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

      <section className="mx-auto w-full max-w-6xl px-6 py-24 md:px-10">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div className="space-y-3">
            <p className="text-xs uppercase tracking-[0.35em] text-ink-soft">
              {projectType === "Case Study"
                ? "Weitere Case Studies"
                : "Weitere Projekte"}
            </p>
            <MaskedTextReveal
              as="h2"
              className="font-display font-bold text-4xl uppercase tracking-[0.2em] md:text-5xl"
            >
              {projectType === "Case Study"
                ? "Nächste Case Studies"
                : "Nächste Projekte"}
            </MaskedTextReveal>
          </div>
          <TransitionLink
            href="/#work"
            className="text-xs uppercase tracking-[0.35em] text-ink-soft hover:text-foreground"
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
                <div className="h-28 w-full border border-black/10 bg-[linear-gradient(135deg,rgba(198,90,46,0.2),rgba(21,21,20,0.08))]" />
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
  );
}
