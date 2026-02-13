import type { Metadata } from "next";
import Link from "next/link";
import { getPortfolioProjects } from "@/lib/projects";

export const metadata: Metadata = {
  title: "Projekte",
  description: "Projektuebersicht von STACKWERKHAUS mit direkten Links zu allen Referenzen.",
  alternates: {
    canonical: "/work",
  },
};

export default async function WorkIndexPage() {
  const projects = await getPortfolioProjects();

  return (
    <main className="mx-auto w-full max-w-6xl px-6 py-16 md:px-10">
      <header className="space-y-3">
        <p className="text-xs uppercase tracking-[0.35em] text-ink-soft">Portfolio</p>
        <h1 className="font-display text-4xl font-bold uppercase tracking-[0.2em] md:text-5xl">
          Projekte
        </h1>
        <p className="max-w-2xl text-sm text-ink-soft">
          Alle Referenzen von STACKWERKHAUS mit direkten Detailseiten.
        </p>
      </header>

      <ul className="mt-10 grid gap-4 md:grid-cols-2">
        {projects.map((project) => (
          <li key={project.id}>
            <Link
              href={`/work/${project.slug}`}
              className="block border border-black/10 bg-white/60 px-5 py-4 text-sm uppercase tracking-[0.25em] transition-colors hover:bg-white"
            >
              {project.title}
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
