import { FadeIn } from "@/components/animations/FadeIn";
import { ImageReveal } from "@/components/animations/ImageReveal";
import { LazyAnimation } from "@/components/animations/LazyAnimation";
import { MaskedTextReveal } from "@/components/animations/MaskedTextReveal";
import { TransitionLink } from "@/components/ui/TransitionLink";
import { getPortfolioProjects } from "@/lib/projects";

export async function Work() {
  const projects = await getPortfolioProjects();

  return (
    <section
      id="work"
      className="mx-auto w-full max-w-6xl scroll-mt-24 pb-15 px-6 md:px-10"
    >
      <div className="flex flex-wrap items-end justify-between gap-6">
        <div className="space-y-3">
          <p className="text-xs uppercase tracking-[0.35em] text-ink-soft">
            Referenzen
          </p>
          <MaskedTextReveal
            as="h2"
            className="font-display font-bold text-4xl uppercase tracking-[0.2em] md:text-5xl"
          >
            Unsere digitalen Bauwerke
          </MaskedTextReveal>
        </div>
        <p className="max-w-md text-sm text-ink-soft">
          Unsere Projekte zeigen, wie wir aus unklaren Leistungen verständliche
          Nutzerführung erstellen. Nicht nur als Beispiele, sondern als Beweis für
          Struktur, Vertrauen und saubere Kontaktpfade.
        </p>
      </div>

      <div className="mt-6">
        <TransitionLink
          href="/work"
          className="text-xs font-bold uppercase tracking-[0.35em] text-ink-soft hover:text-foreground"
        >
          Alle Projekte ansehen
        </TransitionLink>
      </div>

      <FadeIn className="mt-12 grid gap-8 md:grid-cols-2" stagger={0.12}>
        {projects.map((project, index) => (
          <TransitionLink
            key={project.id}
            className={`${index >= 3 ? "hidden md:flex" : "flex"} group relative min-h-[280px] flex-col justify-between overflow-hidden border border-black/10 bg-white/70 p-5 shadow-[0_20px_50px_rgba(0,0,0,0.08)] md:min-h-[320px] md:p-6 ${
              index === 2 ? "md:col-span-2" : ""
            }`}
            data-cursor-text="Ansehen"
            aria-label={`${project.type ?? "Projekt"} ${project.title}`}
            href={`/work/${project.slug}`}
          >
            <div className="absolute inset-0">
              {(project.coverSmall?.url || project.cover?.url) ? (
                <LazyAnimation
                  className="h-full w-full"
                  eagerOnMobile
                  fallback={
                    <div className="h-full w-full bg-[linear-gradient(135deg,rgba(198,90,46,0.25),rgba(21,21,20,0.1))]" />
                  }
                >
                  <ImageReveal
                    src={project.coverSmall?.url || project.cover!.url}
                    alt={project.coverSmall?.alt || project.cover?.alt || project.title}
                    fill
                    sizes="(min-width: 1024px) 50vw, 100vw"
                    direction="left"
                    parallax={10}
                    trigger="load"
                    disableOnMobile
                    imageClassName="scale-[1.08]"
                    className="h-full w-full"
                  />
                </LazyAnimation>
              ) : (
                <div className="h-full w-full bg-[linear-gradient(135deg,rgba(198,90,46,0.25),rgba(21,21,20,0.1))]" />
              )}
              <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(255,255,255,0.9),rgba(255,255,255,0.65),rgba(255,255,255,0.3))] backdrop-blur-[2px]" />
              <div className="absolute inset-0 bg-black/25 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            </div>
            <div className="relative flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.35em] text-ink-soft">
                  {project.client ||
                    project.services[0] ||
                    project.type ||
                    "Projekt"}
                </p>
                <h3 className="font-display font-bold text-2xl uppercase tracking-[0.16em] md:text-3xl md:tracking-[0.18em]">
                  {project.title}
                </h3>
              </div>
              {project.year && (
                <span className="text-xs uppercase tracking-[0.35em] text-ink-soft">
                  {project.year}
                </span>
              )}
            </div>
            {project.summary && (
              <p className="relative mt-6 hidden max-w-md text-sm text-ink-soft md:block">
                {project.summary}
              </p>
            )}
            <div className="relative mt-8 flex items-center justify-between text-xs uppercase tracking-[0.35em] md:mt-10">
              <span>
                {project.type === "Case Study" ? "Zur Case Study" : "Zum Projekt"}
              </span>
              <span>↗</span>
            </div>
          </TransitionLink>
        ))}
      </FadeIn>
    </section>
  );
}
