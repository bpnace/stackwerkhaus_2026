export type PortfolioProject = {
  id: string;
  title: string;
  client?: string;
  slug: string;
  year?: string;
  services: string[];
  type?: "Projekt" | "Case Study";
  summary?: string;
  body?: string;
  website?: string;
  cover?: {
    url: string;
    alt: string;
  };
};

export const portfolioProjects: PortfolioProject[] = [
  {
    id: "immo-pal",
    title: "Immo Pal",
    client: "immo-pal",
    slug: "immo-pal",
    year: "2026",
    services: ["Full-Stack", "Design"],
    type: "Projekt",
    website: "https://www.immo-pal.de",
    summary:
      "Ihr vertrauensvoller Partner für Immobilien in Deutschland – mit persönlicher Beratung, kostenloser Bewertung und einem klaren digitalen Auftritt. Klare Wege zu Bewertung, Verkauf und Immobiliensuche sowie ein direkter Kontaktfokus sorgen für Vertrauen und schnelle Anfragen.",
    body:
      "Für immo-pal entstand eine Plattform, die Verkauf, Bewertung und Immobiliensuche klar strukturiert. Der Fokus liegt auf Vertrauen, transparenter Beratung und einer reibungslosen Lead-Generierung für Verkäufe und Suchaufträge.",
    cover: {
      url: "/images/projekte/immopal.webp",
      alt: "Immo Pal Website",
    },
  },
  {
    id: "bloom",
    title: "Bloom",
    client: "Bloom",
    slug: "bloom",
    year: "2025",
    services: ["Full Stack", "UI/UX Design"],
    type: "Projekt",
    website: "https://getbloom.work",
    summary:
      "Arbeitsschutz prüfungssicher organisieren – einfach und pragmatisch. Bloom verbindet OHS-Software mit gesetzlicher Grundbetreuung für weniger Aufwand und klare Prozesse.",
    body:
      "Für Bloom entstand ein Auftritt, der Arbeitsmedizin und Arbeitssicherheit verständlich und digital greifbar macht. Im Fokus stehen ein klarer Schritt-für-Schritt-Ansatz, smarte Automationen und ein All-in-One-Paket, das Zeit und Koordinationsaufwand spürbar reduziert.",
    cover: {
      url: "/images/projekte/bloom.webp",
      alt: "Bloom Website",
    },
  },
  {
    id: "codariq",
    title: "Codariq",
    client: "Codariq",
    slug: "codariq",
    year: "2025",
    services: ["Full Stack", "Branding", "UI/UX Design"],
    type: "Projekt",
    website: "https://www.codariq.de",
    summary:
      "Weniger Klickarbeit. Mehr Ergebnis: intelligente Automatisierungen, die E-Mails, Leads, Dokumente und Routineaufgaben sauber verbinden – DSGVO-konform, verständlich erklärt und in wenigen Wochen spürbar.",
    body:
      "Für Codariq entstand ein digitaler Auftritt, der den Nutzen intelligenter Automatisierungen klar auf den Punkt bringt. Im Fokus stehen Entlastung im Alltag, verbundene Workflows und eine DSGVO-konforme Umsetzung – verständlich, ohne neues IT-Team und schnell wirksam.",
    cover: {
      url: "/images/projekte/codariq.webp",
      alt: "Codariq Website",
    },
  },
  {
    id: "atelier-heimat",
    title: "Atelier Heimat",
    client: "Atelier Heimat",
    slug: "atelier-heimat",
    year: "2025",
    services: ["Branding", "Webdesign", "Fotokonzept"],
    type: "Case Study",
    summary:
      "Handwerk trifft auf digitale Wärme – eine Markenwelt, die lokale Geschichte spürbar macht.",
    body:
      "Für Atelier Heimat entstand eine ruhige, taktile Markenwelt mit starkem Fokus auf Materialität. Die Website bringt Werkstatt-Ästhetik und moderne Klarheit zusammen und führt Nutzer:innen intuitiv durch Kollektion, Story und Kontakt.",
    cover: {
      url: "/images/projekte/heimat.webp",
      alt: "Atelier Heimat Website",
    },
  },

  {
    id: "nordlicht-coffee",
    title: "Nordlicht Coffee",
    client: "Nordlicht Coffee",
    slug: "nordlicht-coffee",
    year: "2025",
    services: ["Branding", "Webdesign", "Launch"],
    type: "Case Study",
    summary:
      "Ein sympathischer Auftritt für ein neues Café – mit Fokus auf Community und Storytelling.",
    body:
      "Für Nordlicht Coffee wurde eine helle, einladende Markenidentität entwickelt. Die Website setzt auf kurze Wege zu Karte, Events und Reservierung und unterstützt den Aufbau der Community.",
    cover: {
      url: "/images/projekte/nordlicht.webp",
      alt: "Nordlicht Coffee Website",
    },
  },
  {
    id: "uncloud",
    title: "Uncloud",
    client: "Uncloud",
    slug: "uncloud",
    year: "2023",
    services: ["Strategie", "Webdesign", "Entwicklung"],
    summary:
      "Eine App, die mentale Gesundheit stärkt: KI-gestützte Gewohnheiten, regelmäßige Check-ins und klare Impulse helfen, den Kopf zu entlasten und negative Gedankenspiralen zu lösen.",
    body:
      "Uncloud ist eine digitale Gesundheits-App mit KI-gestützten Habit-Routinen, kurzen Tages-Check-ins und sanfter Begleitung, die Nutzer:innen hilft, Belastungen abzubauen und den Fokus auf positive, stabile Gewohnheiten zu lenken.",
    cover: {
      url: "/images/projekte/uncloud.webp",
      alt: "Uncloud Mental Health App",
    },
  },
  {
    id: "kiez-apotheke",
    title: "Kiez Apotheke",
    client: "Kiez Apotheke",
    slug: "kiez-apotheke",
    year: "2025",
    services: ["Webdesign", "UX", "Content"],
    type: "Case Study",
    summary:
      "Service-orientierte Website mit Fokus auf schnelle Information und Vertrauensaufbau.",
    body:
      "Die neue Präsenz bündelt Services wie Botendienst, Öffnungszeiten und Gesundheitsaktionen. Ein vereinfachter Aufbau sorgt für schnelle Orientierung – besonders auf Mobile.",
    cover: {
      url: "/images/projekte/apotheke.webp",
      alt: "Kiez Apotheke Case Study",
    },
  }
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
