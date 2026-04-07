import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "@/components/seo/JsonLd";
import { getPortfolioProjects } from "@/lib/projects";
import {
  buildCollectionPageSchema,
  buildItemListSchema,
  buildPageMetadata,
  buildWebPageSchema,
} from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Projekte und Case Studies",
  description:
    "Ausgewählte Projekte und Case Studies von STACKWERKHAUS. Beispiele für klare Websites, Relaunches und serviceorientierte digitale Auftritte.",
  path: "/work",
});

export default async function WorkIndexPage() {
  const projects = await getPortfolioProjects();
  const pageGraph = {
    "@context": "https://schema.org",
    "@graph": [
      buildWebPageSchema({
        title: "Projekte und Case Studies",
        description:
          "Ausgewählte Projekte und Case Studies von STACKWERKHAUS für Dienstleister, kleine Unternehmen und neue Marken.",
        path: "/work",
        dateModified: "2026-03-06",
      }),
      buildCollectionPageSchema({
        title: "Portfolio und Case Studies",
        description:
          "Portfolio mit Projekten und Case Studies von STACKWERKHAUS. Jede Seite zeigt, wie Struktur, Design und Nutzerführung zu einem tragfähigen digitalen Auftritt führen.",
        path: "/work",
        dateModified: "2026-03-06",
      }),
      buildItemListSchema({
        title: "Case Studies von STACKWERKHAUS",
        path: "/work",
        items: projects.map((project) => ({
          name: project.title,
          path: `/work/${project.slug}`,
        })),
      }),
    ],
  };

  return (
    <>
      <div className="mx-auto w-full max-w-6xl px-6 py-16 md:px-10">
        <header className="space-y-3">
          <p className="text-xs uppercase tracking-[0.35em] text-ink-soft">
            Portfolio
          </p>
          <h1 className="font-display text-4xl font-bold uppercase tracking-[0.2em] md:text-5xl">
            Projekte und Case Studies
          </h1>
          <p className="max-w-2xl text-sm text-ink-soft">
            Beispiele dafür, wie aus Angeboten mit Erklärungsbedarf klare,
            vertrauenswürdige Websites werden. Jede Detailseite zeigt, wie
            Struktur, Design und Nutzerführung zusammenspielen und welche
            Leistungen dahinterstehen.
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
      </div>
      <JsonLd data={pageGraph} />
    </>
  );
}
