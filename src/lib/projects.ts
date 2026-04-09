export type PortfolioProject = {
  id: string;
  title: string;
  client?: string;
  slug: string;
  year?: string;
  sector?: string;
  services: string[];
  type?: "Projekt" | "Case Study";
  summary?: string;
  body?: string;
  problem?: string;
  approach?: string;
  outcomes?: string[];
  updatedAt?: string;
  website?: string;
  cover?: {
    url: string;
    alt: string;
  };
  coverSmall?: {
    url: string;
    alt: string;
  };
};

export const portfolioProjects: PortfolioProject[] = [
  {
    id: "zynapse",
    title: "Zynapse",
    client: "Zynapse",
    slug: "zynapse",
    year: "2026",
    sector: "KI-Marketing",
    services: ["Full Stack", "UI/UX Design", "Copywriting"],
    type: "Projekt",
    website: "https://zynapse.eu",
    summary:
      "Kampagnen-Setup für Brands und Spezialist:innen: Zynapse verbindet Briefing, Matching, Produktion und Review zu einem klaren Ablauf für Paid Social, Reels und weitere Short-Form-Formate.",
    body: "Für Zynapse entstand ein Auftritt, der KI-gestützte Kampagnenproduktion nicht als Tool, sondern als belastbares Setup erklärt. Die Website führt von der Brand-Anfrage über Matching und Produktion bis zum Handover und macht sichtbar, wie aus Briefings reviewfähige Varianten für echte Kampagnenarbeit werden.",
    problem:
      "Das Angebot musste eine neue Kategorie verständlich machen: kein loses Creator-Sourcing, kein klassisches Agenturmodell und kein reiner Tool-Zugang, sondern ein klar geführtes Setup zwischen Brand, Spezialist:innen und Review.",
    approach:
      "Die Struktur verdichtet Rollen, Guardrails, Freigaben und Kampagnenfluss zu einer klaren Geschichte für Brands und Kreative. So werden Nutzen, Ablauf und Verantwortlichkeiten schnell verständlich, ohne die operative Tiefe des Systems zu verlieren.",
    outcomes: [
      "Klarere Einordnung des Angebots zwischen Tool, Agentur und Netzwerk",
      "Stärkerer Fokus auf Ablauf, Verantwortlichkeiten und kampagnenfähigen Output",
      "Ein markanter Auftritt, der Brands und Kreative getrennt anspricht, ohne die gemeinsame Logik zu verlieren",
    ],
    updatedAt: "2026-04-01",
    cover: {
      url: "/images/projekte/zynapse.webp",
      alt: "Zynapse Kampagnenplattform Website",
    },
    coverSmall: {
      url: "/images/projekte/small/zynapseSmall.webp",
      alt: "Zynapse Kampagnenplattform Website",
    },
  },
  {
    id: "immo-pal",
    title: "Immo Pal",
    client: "immo-pal",
    slug: "immo-pal",
    year: "2026",
    sector: "Immobilien",
    services: ["Full-Stack", "Design"],
    type: "Projekt",
    website: "https://www.immo-pal.de",
    summary:
      "Dein vertrauensvoller Partner für Immobilien in Deutschland - mit persönlicher Beratung, kostenloser Bewertung und einem klaren digitalen Auftritt. Klare Wege zu Bewertung, Verkauf und Immobiliensuche sowie ein direkter Kontaktfokus sorgen für Vertrauen und schnelle Anfragen.",
    body: "Für immo-pal entstand eine Plattform, die Verkauf, Bewertung und Immobiliensuche klar strukturiert. Der Fokus liegt auf Vertrauen, transparenter Beratung und einer reibungslosen Lead-Generierung für Verkäufe und Suchaufträge.",
    problem:
      "Das Angebot musste Vertrauen, Bewertung und Kontakt in wenigen Sekunden verständlich machen, ohne wie ein generisches Immobilienportal zu wirken.",
    approach:
      "Die Website verbindet persönliche Beratung mit klaren Anfragepfaden für Bewertung, Verkauf und Immobiliensuche. Inhalte wurden so gegliedert, dass Interessenten schnell den passenden Einstieg finden.",
    outcomes: [
      "Klare Pfade für Bewertungsanfragen und Verkaufsinteresse",
      "Mehr Vertrauensaufbau durch ruhigere Struktur und präzisere Leistungskommunikation",
      "Mobile Darstellung, die Kontakt und Orientierung nicht voneinander trennt",
    ],
    updatedAt: "2026-03-06",
    cover: {
      url: "/images/projekte/immopal.webp",
      alt: "Immo Pal Website",
    },
    coverSmall: {
      url: "/images/projekte/small/immopalSmall.webp",
      alt: "Immo Pal Website",
    },
  },
  {
    id: "bloom",
    title: "Bloom",
    client: "Bloom",
    slug: "bloom",
    year: "2025",
    sector: "Arbeitsschutz",
    services: ["Full Stack", "UI/UX Design"],
    type: "Projekt",
    website: "https://getbloom.work",
    summary:
      "Arbeitsschutz prüfungssicher organisieren - einfach und pragmatisch. Bloom verbindet OHS-Software mit gesetzlicher Grundbetreuung für weniger Aufwand und klare Prozesse.",
    body: "Für Bloom entstand ein Auftritt, der Arbeitsmedizin und Arbeitssicherheit verständlich und digital greifbar macht. Im Fokus stehen ein klarer Schritt-für-Schritt-Ansatz, smarte Automationen und ein All-in-One-Paket, das Zeit und Koordinationsaufwand spürbar reduziert.",
    problem:
      "Die Leistung war erklärungsbedürftig und durfte weder zu technisch noch zu bürokratisch wirken.",
    approach:
      "Komplexe Pflichtinhalte wurden in eine ruhige, klare Produktgeschichte überführt. Der Fokus lag auf verständlicher Nutzenkommunikation und einer sauberen Schritt-für-Schritt-Führung.",
    outcomes: [
      "Weniger Erklärbedarf im Erstkontakt durch klarere Angebotslogik",
      "Stärkere Verbindung von Software-Nutzen und gesetzlicher Grundbetreuung",
      "Ein Auftritt, der Vertrauen für ein sensibles B2B-Thema schneller aufbaut",
    ],
    updatedAt: "2026-03-06",
    cover: {
      url: "/images/projekte/bloom.webp",
      alt: "Bloom Website",
    },
    coverSmall: {
      url: "/images/projekte/small/bloomSmall.webp",
      alt: "Bloom Website",
    },
  },
  {
    id: "codariq",
    title: "Codariq",
    client: "Codariq",
    slug: "codariq",
    year: "2025",
    sector: "Automatisierung",
    services: ["Full Stack", "Branding", "UI/UX Design"],
    type: "Projekt",
    website: "https://www.codariq.de",
    summary:
      "Weniger Klickarbeit. Mehr Ergebnis: intelligente Automatisierungen, die E-Mails, Leads, Dokumente und Routineaufgaben sauber verbinden - datenschutzbewusst, verständlich erklärt und in wenigen Wochen spürbar.",
    body: "Für Codariq entstand ein digitaler Auftritt, der den Nutzen intelligenter Automatisierungen klar auf den Punkt bringt. Im Fokus stehen Entlastung im Alltag, verbundene Workflows und eine datenschutzbewusste Umsetzung - verständlich, ohne neues IT-Team und schnell wirksam.",
    problem:
      "Automatisierungsleistungen klingen schnell abstrakt oder technisch überladen, obwohl Kunden vor allem Entlastung und Klarheit suchen.",
    approach:
      "Die Seite verbindet eine klare Positionierung mit verständlicher Nutzenkommunikation, ohne technische Substanz zu verstecken. DSGVO-Orientierung und konkrete Einsatzfelder wurden sichtbar gemacht.",
    outcomes: [
      "Präzisere Darstellung komplexer Leistungen in einfacher Sprache",
      "Mehr Vertrauen durch bessere Einordnung von Datenschutz und Umsetzung",
      "Ein strukturierter Auftritt, der sich für Sales-Gespräche direkt nutzen lässt",
    ],
    updatedAt: "2026-03-06",
    cover: {
      url: "/images/projekte/codariq.webp",
      alt: "Codariq Website",
    },
    coverSmall: {
      url: "/images/projekte/small/codariqSmall.webp",
      alt: "Codariq Website",
    },
  },
  {
    id: "atelier-heimat",
    title: "Atelier Heimat",
    client: "Atelier Heimat",
    slug: "atelier-heimat",
    year: "2025",
    sector: "Handwerk & Interior",
    services: ["Branding", "Webdesign", "Fotokonzept"],
    type: "Case Study",
    summary:
      "Handwerk trifft auf digitale Wärme  eine Markenwelt, die lokale Geschichte spürbar macht.",
    body: "Für Atelier Heimat entstand eine ruhige, taktile Markenwelt mit starkem Fokus auf Materialität. Die Website bringt Werkstatt-Ästhetik und moderne Klarheit zusammen und führt Nutzer:innen intuitiv durch Kollektion, Story und Kontakt.",
    problem:
      "Die Marke brauchte einen digitalen Auftritt, der Handwerk, Herkunft und hochwertige Gestaltung zugleich transportiert.",
    approach:
      "Materialität, Bildwelt und Seitenrhythmus wurden so gestaltet, dass die Website wie eine natürliche Erweiterung der Marke wirkt statt wie ein separater Vertriebskanal.",
    outcomes: [
      "Klarere Verbindung aus Marke, Geschichte und Kontaktaufnahme",
      "Ruhigerer Bildaufbau mit mehr Raum für Material und Atmosphäre",
      "Ein digitaler Auftritt, der Qualität vermittelt, ohne laut zu werden",
    ],
    updatedAt: "2026-03-06",
    cover: {
      url: "/images/projekte/heimat.webp",
      alt: "Atelier Heimat Website",
    },
    coverSmall: {
      url: "/images/projekte/small/heimatSmall.webp",
      alt: "Atelier Heimat Website",
    },
  },

  {
    id: "nordlicht-coffee",
    title: "Nordlicht Coffee",
    client: "Nordlicht Coffee",
    slug: "nordlicht-coffee",
    year: "2025",
    sector: "Gastronomie",
    services: ["Branding", "Webdesign", "Launch"],
    type: "Case Study",
    summary:
      "Ein sympathischer Auftritt für ein neues Café - mit klarem Fokus auf Community und Storytelling.",
    body: "Für Nordlicht Coffee wurde eine helle, einladende Markenidentität entwickelt. Die Website setzt auf kurze Wege zu Karte, Events und Reservierung und unterstützt den Aufbau der Community.",
    problem:
      "Der Auftritt sollte nicht nur hübsch wirken, sondern schnell zwischen Story, Besuchsinformationen und Community unterscheiden.",
    approach:
      "Der Relaunch priorisierte kurze Wege zu Karte, Events und Besuchsinfos und kombinierte diese mit einer wärmeren Markenatmosphäre.",
    outcomes: [
      "Schnellerer Zugang zu reservierungs- und besuchsrelevanten Informationen",
      "Stärkere Community-Wirkung durch bessere Event- und Story-Einstiege",
      "Ein sympathischer Markenauftritt mit klarerer Nutzerführung",
    ],
    updatedAt: "2026-03-06",
    cover: {
      url: "/images/projekte/nordlicht.webp",
      alt: "Nordlicht Coffee Website",
    },
    coverSmall: {
      url: "/images/projekte/small/nordlichtSmall.webp",
      alt: "Nordlicht Coffee Website",
    },
  },
  {
    id: "uncloud",
    title: "Uncloud",
    client: "Uncloud",
    slug: "uncloud",
    year: "2025",
    sector: "Mental Health",
    services: ["Strategie", "Webdesign", "Entwicklung"],
    summary:
      "Eine App, die mentale Gesundheit stärkt: KI-gestützte Gewohnheiten, regelmäßige Check-ins und klare Impulse helfen, den Kopf zu entlasten und negative Gedankenspiralen zu lösen.",
    body: "Uncloud ist eine digitale Gesundheits-App mit KI-gestützten Habit-Routinen, kurzen Tages-Check-ins und sanfter Begleitung, die Nutzer:innen hilft, Belastungen abzubauen und den Fokus auf positive, stabile Gewohnheiten zu lenken.",
    problem:
      "Das Produkt musste sensibel kommuniziert werden: technisch genug, um glaubwürdig zu wirken, aber ruhig genug, um Vertrauen zu schaffen.",
    approach:
      "Die Seite verdichtet Funktionsweise, Nutzen und Tonalität so, dass mentale Entlastung und digitale Begleitung gleichzeitig verständlich werden.",
    outcomes: [
      "Bessere Balance zwischen Technologie, Nutzen und emotionaler Ansprache",
      "Klarere Erklärung der App-Logik für neue Nutzer:innen",
      "Ein ruhigeres Interface, das sensible Inhalte unterstützt statt überlagert",
    ],
    updatedAt: "2026-03-06",
    cover: {
      url: "/images/projekte/uncloud.webp",
      alt: "Uncloud Mental Health App",
    },
    coverSmall: {
      url: "/images/projekte/small/uncloudSmall.webp",
      alt: "Uncloud Mental Health App",
    },
  },
];

export async function getPortfolioProjects(): Promise<PortfolioProject[]> {
  return portfolioProjects;
}

export async function getPortfolioProjectBySlug(
  slug: string,
): Promise<PortfolioProject | null> {
  const normalized = decodeURIComponent(slug).trim().toLowerCase();
  return (
    portfolioProjects.find(
      (project) =>
        project.slug.toLowerCase() === normalized ||
        project.id.toLowerCase() === normalized,
    ) ?? null
  );
}
