export type ServiceStep = {
  title: string;
  description: string;
};

export type ServiceFaqItem = {
  question: string;
  answer: string;
};

export type ServiceBenefit = {
  title: string;
  copy: string;
};

export type ServiceDeliverable = {
  title: string;
  copy: string;
};

export type ServicePage = {
  slug: string;
  title: string;
  shortTitle: string;
  kicker: string;
  summary: string;
  audience: string;
  intro: string;
  serviceType: string;
  timeline: string;
  pricingHint: string;
  updatedAt: string;
  situations: string[];
  idealFor: string[];
  notFor: string[];
  benefits: ServiceBenefit[];
  deliverables: ServiceDeliverable[];
  process: ServiceStep[];
  faqs: ServiceFaqItem[];
  relatedProjectSlugs: string[];
  ctaTitle: string;
  ctaCopy: string;
};

export const services: ServicePage[] = [
  {
    slug: "webdesign-dienstleister-berlin",
    title: "Webdesign für Dienstleister in Berlin",
    shortTitle: "Webdesign für Dienstleister",
    kicker: "Lokale Sichtbarkeit",
    summary:
      "Für Beratungen, Praxen und Servicefirmen, die online sofort verständlich wirken und schneller passende Anfragen gewinnen wollen.",
    audience:
      "Gründer:innen, Inhaber:innen und kleine Teams aus Beratung, Praxis, Service und lokaler Dienstleistung.",
    intro:
      "Wenn deine Website heute nur grob beschreibt, was du machst, aber nicht sauber erklärt, warum genau du die richtige Wahl bist, verliert sie Anfragen. Diese Leistung baut einen Auftritt, der Spezialisierung, Vertrauen und nächsten Schritt in wenigen Sekunden verständlich macht.",
    serviceType: "Webdesign für Dienstleistungsunternehmen",
    timeline: "In der Regel 3 bis 6 Wochen bis zum Launch",
    pricingHint: "Sinnvoll für fokussierte Projekte ab 1.500 EUR, abhängig von Umfang und Inhalt",
    updatedAt: "2026-03-06",
    situations: [
      "Interessenten verstehen im Erstkontakt nicht schnell genug, welche Leistung du konkret anbietest und für wen sie gedacht ist.",
      "Die Startseite wirkt allgemein, während wichtige Vertrauenselemente, Leistungsseiten oder Kontaktpfade zu spät oder gar nicht auftauchen.",
      "Du willst lokal oder regional besser gefunden werden, aber die Website liefert dafür weder klare Leistungsbegriffe noch eine saubere Seitenlogik.",
    ],
    idealFor: [
      "Beratungen, Kanzleien, Praxen, Agenturen und Servicefirmen mit kleinem bis mittlerem Leistungsportfolio.",
      "Teams, die keine große Markenplattform brauchen, sondern eine Website, die Anfragen wahrscheinlicher macht.",
      "Unternehmen, die in Berlin, regional oder im DACH-Raum sichtbar sein wollen und dafür klare Leistungsseiten benötigen.",
    ],
    notFor: [
      "Wenn du eigentlich einen Shop, ein Portal oder ein komplexes Produkt-Dashboard planst.",
      "Wenn das Angebot selbst noch unklar ist und zuerst grundlegend geschärft werden muss.",
      "Wenn nur eine optische Auffrischung gesucht ist, ohne Struktur, Copy und Kontaktpfade zu überarbeiten.",
    ],
    benefits: [
      {
        title: "Leistung in Sekunden verständlich",
        copy:
          "Besucher sehen schneller, worauf du spezialisiert bist, für wen dein Angebot gedacht ist und welcher nächste Schritt sinnvoll ist.",
      },
      {
        title: "Mehr lokale Relevanz",
        copy:
          "Saubere Leistungsseiten, klare Begriffe und interne Logik stärken die Grundlage für lokale Suchanfragen und AI-gestützte Antworten.",
      },
      {
        title: "Kontaktpfade ohne Reibung",
        copy:
          "Vertrauenselemente, CTA-Platzierung und Seitenreihenfolge werden so gebaut, dass Interessenten nicht erst nach Kontakt oder Einordnung suchen müssen.",
      },
    ],
    deliverables: [
      {
        title: "Seitenlogik für Start, Leistung und Kontakt",
        copy:
          "Wir definieren, welche Kernseiten wirklich gebraucht werden und in welcher Reihenfolge Angebot, Vertrauen und CTA auftauchen müssen.",
      },
      {
        title: "Copy-Führung für Nutzen und Einwände",
        copy:
          "Texte werden nicht nur schöner formuliert, sondern auf Verständnis, Positionierung und konkrete Anfragewahrscheinlichkeit ausgelegt.",
      },
      {
        title: "Responsives Frontend mit SEO-Basis",
        copy:
          "Die Umsetzung ist schnell, wartbar und technisch sauber aufgebaut, inklusive Metadaten, interner Verlinkung und DSGVO-orientierter Basis.",
      },
    ],
    process: [
      {
        title: "Angebot und Anfrageziel schärfen",
        description:
          "Wir legen fest, welche Leistung im Mittelpunkt steht, welche Anfragen du wirklich willst und was Besucher in den ersten Sekunden verstehen müssen.",
      },
      {
        title: "Seitenstruktur und Copy ordnen",
        description:
          "Leistungsseiten, Vertrauensbeweise und CTA-Pfade werden so angeordnet, dass Orientierung ohne zusätzliche Erklärung funktioniert.",
      },
      {
        title: "Design und Frontend umsetzen",
        description:
          "Die Website wird visuell klar, responsiv und technisch sauber gebaut, damit Design, Geschwindigkeit und Verständlichkeit zusammenarbeiten.",
      },
      {
        title: "Launch und Übergabe vorbereiten",
        description:
          "Zum Abschluss richten wir Livegang, Grundsettings und eine pflegbare Übergabe ein, damit die Seite nicht nur startet, sondern im Alltag nutzbar bleibt.",
      },
    ],
    faqs: [
      {
        question: "Für welche Dienstleister ist diese Leistung besonders geeignet?",
        answer:
          "Besonders gut passt sie für Beratungen, Praxen, Agenturen, Kanzleien und lokale Servicefirmen, die Expertise sichtbar machen und Anfragen planbarer gewinnen wollen.",
      },
      {
        question: "Brauche ich schon fertige Texte und Bilder?",
        answer:
          "Nein. Vorhandene Inhalte können übernommen und gestrafft werden. Fehlende Inhalte strukturieren wir gemeinsam so, dass nur das produziert wird, was für Klarheit und Vertrauen wirklich nötig ist.",
      },
      {
        question: "Hilft die Website auch bei lokaler Sichtbarkeit?",
        answer:
          "Ja. Die Leistung setzt bewusst auf klare Leistungsbegriffe, saubere Seitenstruktur, technische SEO-Basis und besser zitierbare Inhalte für lokale Suche und AI-Antworten.",
      },
      {
        question: "Wie viel Abstimmung ist im Projekt nötig?",
        answer:
          "Der Prozess ist so aufgebaut, dass Entscheidungen gebündelt werden. Du bekommst klare Zwischenstände statt dauernder Mikroschleifen.",
      },
    ],
    relatedProjectSlugs: ["immo-pal", "kiez-apotheke"],
    ctaTitle: "Du willst online schneller verständlich wirken?",
    ctaCopy:
      "Im Erstgespräch klären wir, welche Leistungsseiten, Vertrauensblöcke und CTA-Pfade auf deiner Website den größten Hebel haben.",
  },
  {
    slug: "dsgvo-website-agentur",
    title: "DSGVO-orientierte Website-Umsetzung",
    shortTitle: "DSGVO-orientierte Websites",
    kicker: "Vertrauen + Umsetzung",
    summary:
      "Für Teams, die nicht nur schön aussehen wollen, sondern eine technisch saubere, nachvollziehbare und datenschutzbewusste Website brauchen.",
    audience:
      "Unternehmen mit erhöhtem Vertrauensanspruch, sensiblen Daten oder erklärungsbedürftigen Tools und Prozessen.",
    intro:
      "Diese Leistung ist für Unternehmen gedacht, bei denen Datenschutz, Hosting, Consent und technische Sauberkeit Teil der Kaufentscheidung sind. Ziel ist keine juristische Fassade, sondern eine Website, deren technische Grundlage nachvollziehbar und vertrauenswürdig wirkt.",
    serviceType: "DSGVO-orientierte Website-Umsetzung",
    timeline: "Je nach Umfang meist 3 bis 5 Wochen",
    pricingHint:
      "Sinnvoll für Teams, die technische Sauberkeit und klare Verantwortung sichtbar machen wollen",
    updatedAt: "2026-03-06",
    situations: [
      "Deine aktuelle Seite nutzt zu viele Drittanbieter oder Tracking-Tools, ohne dass ihr intern noch sauber erklären könnt, was davon wirklich gebraucht wird.",
      "Datenschutz ist im Verkaufsgespräch relevant, aber auf der Website kaum sichtbar oder nur als Pflichttext im Footer vorhanden.",
      "Die technische Basis soll vertrauenswürdig wirken, ohne dass Performance, Design oder Wartbarkeit darunter leiden.",
    ],
    idealFor: [
      "Unternehmen aus B2B, Gesundheit, Beratung, Software oder sensiblen Servicebereichen mit erhöhtem Vertrauensbedarf.",
      "Teams, die Hosting, Consent, Tracking und externe Tools nicht dem Zufall überlassen wollen.",
      "Auftritte, bei denen technische Nachvollziehbarkeit ein echter Teil der Markenwirkung ist.",
    ],
    notFor: [
      "Wenn du eigentlich nur ein Cookie-Banner austauschen willst, ohne die restliche Tool-Landschaft zu hinterfragen.",
      "Wenn rechtliche Spezialberatung erwartet wird, die über technische und kommunikative Umsetzung hinausgeht.",
      "Wenn maximale Marketing-Tool-Dichte wichtiger ist als Klarheit, Performance und Vertrauenswirkung.",
    ],
    benefits: [
      {
        title: "Datenschutz wird nachvollziehbar",
        copy:
          "Besucher sehen nicht nur Pflichttexte, sondern einen Auftritt, bei dem technische Entscheidungen, Consent und Vertrauenssignale zusammenpassen.",
      },
      {
        title: "Weniger unnötige Tool-Komplexität",
        copy:
          "Wir reduzieren, wo möglich, überflüssige Abhängigkeiten und priorisieren eine Setup-Logik, die intern wartbar bleibt.",
      },
      {
        title: "Saubere Technik wirkt verkaufsstärker",
        copy:
          "Performance, Stabilität und dokumentierte Grundstruktur stärken Vertrauen gerade dort, wo sensible Daten oder größere Budgets im Spiel sind.",
      },
    ],
    deliverables: [
      {
        title: "Prüfung der bestehenden Tools und Risiken",
        copy:
          "Wir schauen zuerst, welche Drittanbieter, Tracking-Setups und Einbindungen wirklich nötig sind und wo unnötige Risiken reduziert werden können.",
      },
      {
        title: "Consent- und Vertrauensarchitektur",
        copy:
          "Hinweise, Einwilligungen und technische Entscheidungen werden so eingebunden, dass Datenschutz nicht versteckt, sondern nachvollziehbar erscheint.",
      },
      {
        title: "Umsetzung mit Hosting-, Performance- und Wartungsbasis",
        copy:
          "Die Website wird so aufgebaut, dass Geschwindigkeit, Transparenz und saubere Betreuung nicht gegeneinander ausgespielt werden.",
      },
    ],
    process: [
      {
        title: "Status quo und Tools prüfen",
        description:
          "Wir analysieren vorhandene Drittanbieter, Tracking-Logik und Integrationen, bevor Design oder Seitenbau überhaupt starten.",
      },
      {
        title: "Vertrauensarchitektur planen",
        description:
          "Texte, Hinweispunkte, Kontaktblöcke und Vertrauenselemente werden so gesetzt, dass technische Sorgfalt auch für Nicht-Techniker sichtbar wird.",
      },
      {
        title: "Frontend sauber umsetzen",
        description:
          "Die technische Umsetzung priorisiert Ladezeit, stabile Auslieferung und eine Tool-Landschaft, die intern noch erklärbar bleibt.",
      },
      {
        title: "Vor dem Launch absichern",
        description:
          "Consent, Metadaten, interne Links und die wichtigsten technischen Signale werden vor dem Livegang noch einmal gezielt geprüft.",
      },
    ],
    faqs: [
      {
        question: "Ersetzt diese Leistung eine rechtliche Beratung?",
        answer:
          "Nein. Sie schafft eine saubere technische und kommunikative Basis. Juristische Spezialfragen bleiben bei Bedarf ein Fall für spezialisierte Beratung.",
      },
      {
        question: "Können bestehende Tools übernommen werden?",
        answer:
          "Ja, sofern sie sinnvoll sind. Wo ein Tool Vertrauen, Performance oder Nachvollziehbarkeit schwächt, schlagen wir eine pragmatische Alternative vor.",
      },
      {
        question: "Was heißt DSGVO-orientiert konkret?",
        answer:
          "Gemeint sind eine nachvollziehbare Tool-Landschaft, saubere Consent-Flows, transparente Hinweise und eine Umsetzung, die unnötige Risiken vermeidet.",
      },
      {
        question: "Ist das nur für stark regulierte Branchen relevant?",
        answer:
          "Nein. Auch in vielen normalen B2B-Situationen wirkt eine technisch saubere, vertrauenswürdige Website professioneller und reduziert Rückfragen im Vertrieb.",
      },
    ],
    relatedProjectSlugs: ["codariq", "bloom"],
    ctaTitle: "Datenschutz soll kein Unsicherheitsfaktor auf der Website sein?",
    ctaCopy:
      "Wir prüfen im Erstgespräch, wo dein aktueller Auftritt Vertrauen verliert und welche technische oder kommunikative Basis wirklich nötig ist.",
  },
  {
    slug: "website-relaunch-kmu",
    title: "Website-Relaunch für kleine Unternehmen",
    shortTitle: "Website-Relaunch",
    kicker: "Bestehendes modernisieren",
    summary:
      "Für kleine Unternehmen, deren Website noch funktioniert, aber zu langsam, unklar oder nicht mehr überzeugend wirkt.",
    audience:
      "Kleine und mittlere Unternehmen mit bestehender Website, gewachsenen Inhalten und unklarer Nutzerführung.",
    intro:
      "Ein Relaunch lohnt sich dann, wenn die Website Leistung und Vertrauen nicht mehr sauber transportiert. Statt bei null zu starten, wird der bestehende Auftritt strukturell, inhaltlich und visuell so modernisiert, dass er wieder als Verkaufswerkzeug arbeitet.",
    serviceType: "Website-Relaunch",
    timeline: "Je nach Ausgangslage meist 4 bis 6 Wochen",
    pricingHint:
      "Geeignet für Teams, die vorhandene Inhalte, Rankings und Bekanntheit besser nutzen möchten",
    updatedAt: "2026-03-06",
    situations: [
      "Die Website ist über Jahre gewachsen, enthält doppelte Aussagen oder alte Inhalte und wirkt heute eher historisch als überzeugend.",
      "Es gibt bereits Sichtbarkeit, Inhalte oder Bekanntheit, aber die Struktur bremst Verständnis, Vertrauen oder Kontaktaufnahme.",
      "Du willst modernisieren, ohne bestehende Substanz, Weiterleitungen und Suchsignale unkontrolliert zu verlieren.",
    ],
    idealFor: [
      "Kleine Unternehmen mit bestehender Website, deren Angebot sich weiterentwickelt hat, die Seite aber nicht mitgewachsen ist.",
      "Teams, die vorhandene Inhalte weiter nutzen wollen, statt alles neu zu produzieren.",
      "Unternehmen, für die Relaunch auch SEO-, Weiterleitungs- und Vertrauenslogik sauber mitdenken muss.",
    ],
    notFor: [
      "Wenn es noch keine verwertbare Website-Substanz gibt und ein kompletter Neubau sinnvoller ist.",
      "Wenn nur Farben oder einzelne Oberflächen ausgetauscht werden sollen, ohne den eigentlichen Aufbau zu hinterfragen.",
      "Wenn niemand intern Entscheidungen zu Prioritäten, alten Inhalten oder Weiterleitungen treffen kann.",
    ],
    benefits: [
      {
        title: "Bestehende Substanz bleibt nutzbar",
        copy:
          "Inhalte, Rankings und bekannte Seiten werden gezielt bewertet, statt pauschal gelöscht oder blind übernommen zu werden.",
      },
      {
        title: "Klarere Navigation und Aussagen",
        copy:
          "Der Relaunch ordnet Reihenfolge, Leistungsdarstellung und Vertrauenselemente neu, damit Besucher schneller verstehen, was relevant ist.",
      },
      {
        title: "Sauberer Go-live statt hektischer Umstellung",
        copy:
          "Weiterleitungen, Metadaten und wichtige SEO-Signale werden mitgedacht, damit der Relaunch nicht nur schöner, sondern auch stabiler wird.",
      },
    ],
    deliverables: [
      {
        title: "Analyse des bestehenden Auftritts",
        copy:
          "Wir identifizieren, was bleiben kann, wo Reibung entsteht und welche Seiten oder Inhalte aktuell den größten Hebel haben.",
      },
      {
        title: "Neue Seitenstruktur und Content-Führung",
        copy:
          "Startseite, Leistungsblöcke, Beweiselemente und Kontaktpfade werden neu sortiert, damit der Auftritt wieder präzise verkauft.",
      },
      {
        title: "Neuimplementierung mit Launch-Plan",
        copy:
          "Designsystem, Frontend, Weiterleitungen und technische Grundeinstellungen werden so vorbereitet, dass der Übergang sauber bleibt.",
      },
    ],
    process: [
      {
        title: "Ist-Zustand analysieren",
        description:
          "Wir prüfen Struktur, Inhalte, Vertrauenssignale und technische Altlasten, bevor entschieden wird, was erhalten oder neu gebaut wird.",
      },
      {
        title: "Neuen Aufbau definieren",
        description:
          "Der Relaunch fokussiert auf Klarheit: bessere Reihenfolge, präzisere Aussagen und weniger Reibung bis zur Kontaktaufnahme.",
      },
      {
        title: "Design und Inhalte überführen",
        description:
          "Bestehende Inhalte werden gestrafft, neue Beweiselemente ergänzt und in ein modernes, ruhigeres Interface übertragen.",
      },
      {
        title: "Go-live sauber vorbereiten",
        description:
          "Weiterleitungen, Metadaten, interne Links und die wichtigsten SEO-Signale werden vor dem Launch gezielt abgesichert.",
      },
    ],
    faqs: [
      {
        question: "Muss bei einem Relaunch alles neu geschrieben werden?",
        answer:
          "Nein. Häufig ist die größere Schwäche nicht fehlender Inhalt, sondern eine unklare Reihenfolge, schwache Priorisierung oder das Fehlen von Beweisen und klaren CTA-Pfaden.",
      },
      {
        question: "Können bestehende Rankings erhalten bleiben?",
        answer:
          "Ja, wenn der Relaunch sauber geplant wird. Wichtige URLs, Inhalte und Weiterleitungen werden deshalb bewusst behandelt statt erst kurz vor dem Livegang improvisiert.",
      },
      {
        question: "Eignet sich das auch für ältere kleine Unternehmensseiten?",
        answer:
          "Genau dafür ist die Leistung gedacht. Ein Relaunch ist besonders sinnvoll, wenn die Website historisch gewachsen ist und heute nicht mehr zu deinem Angebot passt.",
      },
      {
        question: "Wann ist ein kompletter Neubau sinnvoller als ein Relaunch?",
        answer:
          "Wenn kaum verwertbare Inhalte, keine funktionierende Struktur und keine wertvollen Suchsignale vorhanden sind, ist ein Neubau oft effizienter. Das klären wir im Erstgespräch offen.",
      },
    ],
    relatedProjectSlugs: ["atelier-heimat", "nordlicht-coffee", "uncloud"],
    ctaTitle: "Deine Website soll wieder wie ein aktuelles Unternehmen wirken?",
    ctaCopy:
      "Im Erstgespräch schauen wir, welche bestehende Substanz erhalten bleiben sollte und wo ein Relaunch den größten Klarheitsgewinn bringt.",
  },
];

export async function getServices(): Promise<ServicePage[]> {
  return services;
}

export async function getServiceBySlug(
  slug: string,
): Promise<ServicePage | null> {
  const normalized = decodeURIComponent(slug).trim().toLowerCase();
  return services.find((service) => service.slug === normalized) ?? null;
}
