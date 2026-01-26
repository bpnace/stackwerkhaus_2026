export type PortfolioProject = {
  id: string;
  title: string;
  client?: string;
  slug: string;
  year?: string;
  services: string[];
  summary?: string;
  body?: string;
  cover?: {
    url: string;
    alt: string;
  };
};

export const portfolioProjects: PortfolioProject[] = [
  {
    id: "atelier-heimat",
    title: "Atelier Heimat",
    client: "Atelier Heimat",
    slug: "atelier-heimat",
    year: "2025",
    services: ["Branding", "Webdesign", "Fotokonzept"],
    summary:
      "Handwerk trifft auf digitale Wärme – eine Markenwelt, die lokale Geschichte spürbar macht.",
    body:
      "Für Atelier Heimat entstand eine ruhige, taktile Markenwelt mit starkem Fokus auf Materialität. Die Website bringt Werkstatt-Ästhetik und moderne Klarheit zusammen und führt Nutzer:innen intuitiv durch Kollektion, Story und Kontakt.",
  },
  {
    id: "studio-klinker",
    title: "Studio Klinker",
    client: "Studio Klinker",
    slug: "studio-klinker",
    year: "2024",
    services: ["Webdesign", "Content", "SEO"],
    summary:
      "Ein klares Portfolio für ein Architekturstudio, das über Struktur und Bildsprache verkauft.",
    body:
      "Die neue Website strukturiert Projekte nach Typologie und zeigt großformatige Bildstrecken. Durch klare SEO-Strukturen und schlanke Texte wird das Studio in regionalen Suchanfragen sichtbarer.",
  },
  {
    id: "nordlicht-coffee",
    title: "Nordlicht Coffee",
    client: "Nordlicht Coffee",
    slug: "nordlicht-coffee",
    year: "2025",
    services: ["Branding", "Webdesign", "Launch"],
    summary:
      "Ein sympathischer Auftritt für ein neues Café – mit Fokus auf Community und Storytelling.",
    body:
      "Für Nordlicht Coffee wurde eine helle, einladende Markenidentität entwickelt. Die Website setzt auf kurze Wege zu Karte, Events und Reservierung und unterstützt den Aufbau der Community.",
  },
  {
    id: "baukollektiv-47",
    title: "Baukollektiv 47",
    client: "Baukollektiv 47",
    slug: "baukollektiv-47",
    year: "2023",
    services: ["Strategie", "Webdesign", "Entwicklung"],
    summary:
      "Ein robustes, präzises Erscheinungsbild für ein Bau- und Handwerksnetzwerk.",
    body:
      "Das Projekt übersetzt komplexe Leistungen in klare Service-Layer. Die Plattform zeigt Referenzen, Prozesse und Ansprechpartner so, dass Anfragen schnell und zielgerichtet entstehen.",
  },
  {
    id: "kiez-apotheke",
    title: "Kiez Apotheke",
    client: "Kiez Apotheke",
    slug: "kiez-apotheke",
    year: "2024",
    services: ["Webdesign", "UX", "Content"],
    summary:
      "Service-orientierte Website mit Fokus auf schnelle Information und Vertrauensaufbau.",
    body:
      "Die neue Präsenz bündelt Services wie Botendienst, Öffnungszeiten und Gesundheitsaktionen. Ein vereinfachter Aufbau sorgt für schnelle Orientierung – besonders auf Mobile.",
  },
  {
    id: "sera-mobility",
    title: "Sera Mobility",
    client: "Sera Mobility",
    slug: "sera-mobility",
    year: "2025",
    services: ["Branding", "Webdesign", "UI Systems"],
    summary:
      "Ein zukunftsorientierter Auftritt für urbane Mobilität mit klarer Produkterzählung.",
    body:
      "Sera Mobility benötigt eine Bühne für erklärungsbedürftige Services. Die Lösung: modulare UI-Bausteine, die Features, Benefits und Use-Cases visuell klar gliedern.",
  },
  {
    id: "flora-lab",
    title: "Flora Lab",
    client: "Flora Lab",
    slug: "flora-lab",
    year: "2024",
    services: ["Branding", "UX", "Webdesign"],
    summary:
      "Ein wissenschaftlicher Look, der Vertrauen schafft – klar, modern und freundlich.",
    body:
      "Flora Lab brauchte eine Plattform für Beratungen und Services. Wir haben eine ruhige Typografie, strukturierte Leistungsbereiche und eine präzise CTA-Führung umgesetzt.",
  },
  {
    id: "monument-studio",
    title: "Monument Studio",
    client: "Monument Studio",
    slug: "monument-studio",
    year: "2023",
    services: ["Art Direction", "Webdesign", "Content"],
    summary:
      "Ein Portfolio, das Räume, Licht und Architektur in Szene setzt.",
    body:
      "Großformatige Bildstrecken und reduzierte Texte führen Besucher:innen durch Projekte und Philosophie des Studios.",
  },
  {
    id: "northline-events",
    title: "Northline Events",
    client: "Northline Events",
    slug: "northline-events",
    year: "2025",
    services: ["Marke", "Webdesign", "Launch"],
    summary:
      "Ein klarer Auftritt für Premium-Events – modern, urban, greifbar.",
    body:
      "Die neue Website kombiniert Storytelling mit schnellen Kontaktwegen und integriert klare Event-Formate sowie Referenzen.",
  },
  {
    id: "atelier-volt",
    title: "Atelier Volt",
    client: "Atelier Volt",
    slug: "atelier-volt",
    year: "2024",
    services: ["Branding", "Webdesign", "Strategie"],
    summary:
      "Elektrisierende Markenführung für ein junges Designstudio.",
    body:
      "Das Design spielt mit Kontrasten und klaren Layouts, um die avantgardistische Ausrichtung von Atelier Volt sichtbar zu machen.",
  },
];

export async function getPortfolioProjects(): Promise<PortfolioProject[]> {
  return portfolioProjects;
}

export async function getPortfolioProjectBySlug(
  slug: string
): Promise<PortfolioProject | null> {
  const normalized = decodeURIComponent(slug).trim().toLowerCase();
  return (
    portfolioProjects.find(
      (project) =>
        project.slug.toLowerCase() === normalized ||
        project.id.toLowerCase() === normalized
    ) ?? null
  );
}
