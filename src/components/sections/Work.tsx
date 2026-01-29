import { FadeIn } from "@/components/animations/FadeIn";
import { ImageReveal } from "@/components/animations/ImageReveal";
import { LazyAnimation } from "@/components/animations/LazyAnimation";
import { MaskedTextReveal } from "@/components/animations/MaskedTextReveal";
import { TransitionLink } from "@/components/ui/TransitionLink";
import { getPortfolioProjects } from "@/lib/projects";

export async function Work() {
  const projects = await getPortfolioProjects();

  return (
    <section id="work" className="mx-auto w-full max-w-6xl px-6 py-24 md:px-10">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <div className="space-y-3">
          <p className="text-xs uppercase tracking-[0.35em] text-ink-soft">
            Referenzen
          </p>
          <MaskedTextReveal
            as="h2"
            className="font-display font-bold text-4xl uppercase tracking-[0.2em] md:text-5xl"
          >
            Startup Websites mit Wirkung
          </MaskedTextReveal>
        </div>
        <p className="max-w-md text-sm text-ink-soft">
          Bezahlbare Website-Pakete, schnelle Umsetzung und messbare Ergebnisse.
          Beispiele zeigen, wie sichere, klare Websites für Startups entstehen.
        </p>
      </div>

      <FadeIn className="mt-12 grid gap-8 md:grid-cols-2" stagger={0.12}>
        {projects.map((project, index) => (
          <TransitionLink
            key={project.id}
            className={`group relative flex min-h-[320px] flex-col justify-between overflow-hidden border border-black/10 bg-white/70 p-6 shadow-[0_20px_50px_rgba(0,0,0,0.08)] ${
              index === 2 ? "md:col-span-2" : ""
            }`}
            data-cursor-text="Ansehen"
            aria-label={`${project.type ?? "Projekt"} ${project.title}`}
            href={`/work/${project.slug}`}
          >
            <div className="absolute inset-0">
              {project.cover?.url ? (
                <LazyAnimation
                  className="h-full w-full"
                  fallback={
                    <div className="h-full w-full bg-[linear-gradient(135deg,rgba(198,90,46,0.25),rgba(21,21,20,0.1))]" />
                  }
                >
                  <ImageReveal
                    src={project.cover.url}
                    alt={project.cover.alt || project.title}
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
            <div className="relative flex items-start justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.35em] text-ink-soft">
                  {project.client ||
                    project.services[0] ||
                    project.type ||
                    "Projekt"}
                </p>
                <h3 className="font-display font-bold text-3xl uppercase tracking-[0.18em]">
                  {project.title}
                </h3>
              </div>
              {project.year && (
                <span className="text-xs uppercase tracking-[0.35em]">
                  {project.year}
                </span>
              )}
            </div>
            {project.summary && (
              <p className="relative mt-6 max-w-md text-sm text-ink-soft">
                {project.summary}
              </p>
            )}
            <div className="relative mt-10 flex items-center justify-between text-xs uppercase tracking-[0.35em]">
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
