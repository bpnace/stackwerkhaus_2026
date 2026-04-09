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

export type ServiceOffer = {
  price: string;
  priceCurrency: string;
  priceDisplay: string;
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
  offer?: ServiceOffer;
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
    kicker: "Mehr qualifizierte Anfragen",
    summary:
      "Webdesign in Berlin für Dienstleister, die mit einer klaren Website mehr passende Anfragen gewinnen wollen.",
    audience:
      "Selbstständige, Inhaber:innen und kleine Teams aus Beratung, Praxen, Agenturen und lokalen Servicebetrieben.",
    intro:
      "Viele Dienstleister-Websites sehen ordentlich aus, beantworten aber die wichtigste Frage nicht schnell genug: Was genau bietet ihr an und warum sollte ich euch kontaktieren? Wir entwickeln eine Website, die Leistung, Vertrauen und nächsten Schritt klar zusammenführt.",
    serviceType: "Webdesign Berlin für Dienstleistungsunternehmen",
    timeline: "Meist 3 bis 6 Wochen bis zum Livegang",
    pricingHint:
      "Für fokussierte Projekte in der Regel ab 899 €, abhängig von Seitenumfang, Inhalten und Integrationen",
    offer: {
      price: "899",
      priceCurrency: "EUR",
      priceDisplay: "899 €",
    },
    updatedAt: "2026-03-06",
    situations: [
      "Interessenten verstehen auf den ersten Blick nicht, welche Leistungen ihr anbietet und für wen sie gedacht sind.",
      "Startseite und Leistungsseiten wirken zu allgemein, sodass Vertrauen und Kontaktabsicht zu spät entstehen.",
      "Ihr wollt lokal besser gefunden werden, aber die Website hat keine klare Struktur und keine präzisen Leistungsbegriffe.",
    ],
    idealFor: [
      "Beratungen, Kanzleien, Praxen, Agenturen und Servicefirmen mit kleinem bis mittlerem Leistungsportfolio.",
      "Teams, die keine große Markenplattform brauchen, sondern eine Website, die zuverlässig Anfragen erzeugt.",
      "Unternehmen, die in Berlin oder im DACH-Raum für konkrete Leistungen sichtbar werden möchten.",
    ],
    notFor: [
      "Wenn ihr einen Shop, ein Portal oder eine komplexe Produktplattform plant.",
      "Wenn euer Angebot noch nicht klar definiert ist und erst strategisch geschärft werden muss.",
      "Wenn nur ein neues Farbschema gewünscht ist, ohne Inhalte, Struktur und CTA-Pfade zu verbessern.",
    ],
    benefits: [
      {
        title: "Angebot sofort verständlich",
        copy:
          "Besucher erkennen in wenigen Sekunden, worauf ihr spezialisiert seid, für wen euer Angebot passt und was sie als Nächstes tun sollen.",
      },
      {
        title: "Mehr Sichtbarkeit für lokale Suchanfragen",
        copy:
          "Klare Leistungsseiten, präzise Begriffe und eine saubere interne Verlinkung verbessern eure Chancen bei lokaler SEO und KI-Antworten.",
      },
      {
        title: "Mehr Anfragen über klare Kontaktpfade",
        copy:
          "Vertrauenselemente, CTAs und Seitenreihenfolge werden so aufgebaut, dass Interessenten schnell entscheiden und direkt Kontakt aufnehmen.",
      },
    ],
    deliverables: [
      {
        title: "Informationsarchitektur für Start, Leistung und Kontakt",
        copy:
          "Wir definieren, welche Seiten ihr wirklich braucht und wie Angebot, Vertrauen und CTA logisch aufeinander folgen.",
      },
      {
        title: "SEO- und AEO-optimierte Copy",
        copy:
          "Texte werden natürlich formuliert, auf Suchintention ausgerichtet und so strukturiert, dass sie in KI-Antworten leichter zitiert werden können.",
      },
      {
        title: "Responsives Frontend mit technischer SEO-Basis",
        copy:
          "Die Umsetzung ist schnell, wartbar und technisch sauber, inklusive Metadaten, sauberer interner Verlinkung und datenschutzbewusster Grundeinstellungen.",
      },
    ],
    process: [
      {
        title: "Positionierung und Anfrageziel schärfen",
        description:
          "Wir definieren, welche Leistung im Fokus steht, welche Anfragen ihr gewinnen wollt und welche Botschaft sofort klar sein muss.",
      },
      {
        title: "Seitenstruktur und Inhalte planen",
        description:
          "Leistungsseiten, Vertrauensbeweise und CTA-Pfade werden so angeordnet, dass Nutzer ohne Umwege zur richtigen Entscheidung kommen.",
      },
      {
        title: "Design und Frontend umsetzen",
        description:
          "Wir setzen die Website responsiv und performant um, damit Design, Ladezeit und Verständlichkeit zusammenpassen.",
      },
      {
        title: "Launch und Übergabe vorbereiten",
        description:
          "Vor dem Livegang prüfen wir alle Kernpunkte und übergeben eine pflegbare Grundlage, mit der ihr langfristig arbeiten könnt.",
      },
    ],
    faqs: [
      {
        question: "Für welche Unternehmen ist dieses Webdesign in Berlin geeignet?",
        answer:
          "Die Leistung passt besonders für Beratungen, Praxen, Kanzleien, Agenturen und lokale Servicebetriebe, die online klarer kommunizieren und mehr qualifizierte Anfragen erhalten möchten.",
      },
      {
        question: "Was kostet eine Dienstleister-Website bei euch?",
        answer:
          "Je nach Umfang starten Projekte meist ab 899 €. Den genauen Rahmen bestimmen wir nach Seitenanzahl, Inhaltslage und gewünschten Funktionen im Erstgespräch.",
      },
      {
        question: "Hilft ihr auch bei SEO und KI-Sichtbarkeit?",
        answer:
          "Ja. Wir arbeiten mit klaren Leistungsbegriffen, sauberer Seitenstruktur und präzisen Antworten, damit Inhalte besser für lokale Suchanfragen und KI-Ergebnisse nutzbar sind.",
      },
      {
        question: "Müssen alle Texte und Bilder schon fertig sein?",
        answer:
          "Nein. Bestehende Inhalte können wir übernehmen, straffen und gezielt ergänzen. Ihr müsst nicht vorab alles neu produzieren.",
      },
    ],
    relatedProjectSlugs: ["immo-pal"],
    ctaTitle: "Ihr wollt als Dienstleister online klarer überzeugen?",
    ctaCopy:
      "Im Erstgespräch klären wir, welche Seitenstruktur, Texte und CTA-Pfade auf eurer Website den größten Hebel für mehr Anfragen haben.",
  },
  {
    slug: "dsgvo-website-agentur",
    title: "DSGVO-orientierte Website-Umsetzung",
    shortTitle: "DSGVO-orientierte Websites",
    kicker: "Datenschutz, der verständlich wirkt",
    summary:
      "Für Unternehmen, die eine datenschutzbewusste Website brauchen: technisch sauber, transparent und überzeugend im Vertrieb.",
    audience:
      "Unternehmen mit erhöhtem Vertrauensanspruch, sensiblen Daten oder komplexen digitalen Prozessen.",
    intro:
      "Datenschutz ist für viele Kund:innen ein Entscheidungskriterium. Deshalb bauen wir Websites so, dass Consent, Tracking, Hosting und technische Entscheidungen nachvollziehbar kommuniziert und sauber umgesetzt sind.",
    serviceType: "DSGVO-orientierte Website-Umsetzung",
    timeline: "Je nach Umfang meist 3 bis 5 Wochen bis zum Livegang",
    pricingHint:
      "Sinnvoll für Teams, die Datenschutz und technische Verantwortung als Teil ihrer Markenwirkung sichtbar machen möchten",
    updatedAt: "2026-03-06",
    situations: [
      "Die bestehende Website nutzt viele Drittanbieter-Tools, aber intern ist unklar, was davon wirklich nötig ist.",
      "Datenschutz spielt in Gesprächen eine wichtige Rolle, ist auf der Website aber nur als Pflichttext sichtbar.",
      "Ihr braucht eine technische Basis, die Vertrauen schafft, ohne Performance und Wartbarkeit zu verschlechtern.",
    ],
    idealFor: [
      "Unternehmen aus B2B, Gesundheit, Beratung, Software und anderen sensiblen Branchen.",
      "Teams, die Tracking, Consent und externe Tools bewusst steuern statt historisch mitlaufen lassen wollen.",
      "Marken, bei denen technische Seriosität aktiv zum Vertrauen und zur Conversion beitragen soll.",
    ],
    notFor: [
      "Wenn nur ein neues Cookie-Banner gewünscht ist, ohne Tracking- und Tool-Setup insgesamt zu prüfen.",
      "Wenn eine rein juristische Spezialberatung erwartet wird.",
      "Wenn maximale Marketing-Tool-Dichte wichtiger ist als Transparenz, Performance und Stabilität.",
    ],
    benefits: [
      {
        title: "Datenschutz wird sichtbar und verständlich",
        copy:
          "Besucher sehen nicht nur Pflichttexte, sondern eine Website, bei der technische Entscheidungen, Consent und Vertrauenssignale zusammenpassen.",
      },
      {
        title: "Weniger unnötige Komplexität",
        copy:
          "Wir reduzieren überflüssige Abhängigkeiten und schaffen ein Setup, das intern nachvollziehbar und wartbar bleibt.",
      },
      {
        title: "Saubere Technik unterstützt den Vertrieb",
        copy:
          "Performance, Stabilität und eine dokumentierte Grundstruktur erhöhen das Vertrauen, besonders bei sensiblen Daten und größeren Budgets.",
      },
    ],
    deliverables: [
      {
        title: "Audit von Tools, Tracking und Risiken",
        copy:
          "Wir prüfen, welche Drittanbieter und Tracking-Setups wirklich erforderlich sind und wo sich Risiken pragmatisch reduzieren lassen.",
      },
      {
        title: "Consent- und Vertrauensarchitektur",
        copy:
          "Hinweise, Einwilligungen und technische Entscheidungen werden so eingebunden, dass Datenschutz nicht versteckt, sondern klar nachvollziehbar ist.",
      },
      {
        title: "Umsetzung mit Hosting-, Performance- und Wartungsbasis",
        copy:
          "Die Website wird so gebaut, dass Ladezeit, Transparenz und langfristige Pflege sinnvoll zusammenarbeiten.",
      },
    ],
    process: [
      {
        title: "Ist-Zustand und Tools prüfen",
        description:
          "Wir analysieren Drittanbieter, Tracking-Logik und Integrationen, bevor Design oder Umsetzung starten.",
      },
      {
        title: "Vertrauensarchitektur planen",
        description:
          "Texte, Hinweise und Kontaktblöcke werden so aufgebaut, dass technische Sorgfalt auch für Nicht-Techniker verständlich ist.",
      },
      {
        title: "Frontend sauber umsetzen",
        description:
          "Die technische Umsetzung priorisiert Ladezeit, stabile Auslieferung und ein Setup, das intern langfristig erklärbar bleibt.",
      },
      {
        title: "Vor dem Launch absichern",
        description:
          "Vor dem Livegang prüfen wir Consent, Metadaten, interne Verlinkung und die wichtigsten technischen Signale.",
      },
    ],
    faqs: [
      {
        question: "Ist das eine rechtliche DSGVO-Beratung?",
        answer:
          "Nein. Wir liefern die technische und kommunikative Umsetzung. Juristische Spezialfragen sollten weiterhin mit einer Rechtsberatung geklärt werden.",
      },
      {
        question: "Was bedeutet DSGVO-orientiert bei euch konkret?",
        answer:
          "Das bedeutet: klare Consent-Flows, nachvollziehbare Tool-Landschaft, transparente Hinweise und eine technische Umsetzung, die unnötige Risiken reduziert.",
      },
      {
        question: "Können bestehende Tools übernommen werden?",
        answer:
          "Ja, sofern sie sinnvoll sind. Wenn ein Tool Performance, Transparenz oder Wartbarkeit schwächt, empfehlen wir eine pragmatische Alternative.",
      },
      {
        question: "Für welche Branchen lohnt sich das besonders?",
        answer:
          "Besonders für B2B, Gesundheit, Beratung und Software mit erklärungsbedürftigen Prozessen. Grundsätzlich profitieren aber alle Unternehmen, die Vertrauen aktiv aufbauen müssen.",
      },
    ],
    relatedProjectSlugs: ["codariq", "bloom"],
    ctaTitle: "Ihr wollt Datenschutz auf eurer Website klar und vertrauenswürdig lösen?",
    ctaCopy:
      "Im Erstgespräch prüfen wir, wo euer Auftritt aktuell Vertrauen verliert und welche technische Basis wirklich nötig ist.",
  },
  {
    slug: "website-relaunch-kmu",
    title: "Website-Relaunch für kleine Unternehmen",
    shortTitle: "Website-Relaunch",
    kicker: "Bestehendes verbessern statt neu anfangen",
    summary:
      "Website-Relaunch für KMU, die ihre bestehende Website modernisieren und dabei Sichtbarkeit, Vertrauen und Anfragen verbessern möchten.",
    audience:
      "Kleine und mittlere Unternehmen mit gewachsener Website, veralteten Inhalten und unklarer Nutzerführung.",
    intro:
      "Ein Website-Relaunch lohnt sich, wenn eure bestehende Seite fachlich noch Substanz hat, aber nicht mehr überzeugt. Wir modernisieren Struktur, Inhalte und Design so, dass eure Website wieder als verlässlicher Vertriebskanal arbeitet.",
    serviceType: "Website-Relaunch",
    timeline: "Je nach Ausgangslage meist 4 bis 6 Wochen",
    pricingHint:
      "Geeignet für Teams, die bestehende Inhalte, Rankings und Markenbekanntheit gezielt weiterentwickeln möchten",
    updatedAt: "2026-03-06",
    situations: [
      "Die Website ist über Jahre gewachsen und enthält doppelte, veraltete oder widersprüchliche Inhalte.",
      "Es gibt bereits Sichtbarkeit und Bekanntheit, aber Struktur und Nutzerführung bremsen Anfragen.",
      "Ihr wollt modernisieren, ohne Rankings, wertvolle URLs und bestehende SEO-Signale zu verlieren.",
    ],
    idealFor: [
      "KMU mit bestehender Website, deren Angebot sich verändert hat, die Seite aber nicht mitgewachsen ist.",
      "Teams, die vorhandene Inhalte und Rankings weiter nutzen wollen, statt alles neu aufzusetzen.",
      "Unternehmen, bei denen SEO, Weiterleitungen und Vertrauensaufbau im Relaunch sauber mitgedacht werden müssen.",
    ],
    notFor: [
      "Wenn kaum verwertbare Substanz vorhanden ist und ein kompletter Neubau sinnvoller wäre.",
      "Wenn nur ein visuelles Update gewünscht ist, ohne Struktur, Inhalte und Conversion-Pfade zu verbessern.",
      "Wenn intern keine Entscheidungen zu Prioritäten, Altinhalten und Weiterleitungen getroffen werden können.",
    ],
    benefits: [
      {
        title: "Bestehende Stärken bleiben erhalten",
        copy:
          "Bestehende Inhalte, Rankings und starke Seiten werden gezielt bewertet, statt pauschal gelöscht oder blind übernommen.",
      },
      {
        title: "Klarere Navigation und Botschaften",
        copy:
          "Der Relaunch ordnet Seitenstruktur, Leistungsdarstellung und Vertrauenselemente neu, damit Besucher schneller verstehen, warum sie bei euch richtig sind.",
      },
      {
        title: "Sauberer Go-live ohne SEO-Verluste",
        copy:
          "Weiterleitungen, Metadaten und Kernsignale werden sauber vorbereitet, damit der Relaunch nicht nur besser aussieht, sondern stabil performt.",
      },
    ],
    deliverables: [
      {
        title: "Audit des bestehenden Auftritts",
        copy:
          "Wir identifizieren, was erhalten bleiben kann, wo Reibung entsteht und welche Seiten den größten Hebel haben.",
      },
      {
        title: "Neue Seitenstruktur und Content-Führung",
        copy:
          "Startseite, Leistungsblöcke, Beweiselemente und CTA-Pfade werden neu geordnet, damit die Website wieder klar verkauft.",
      },
      {
        title: "Neuimplementierung mit Relaunch-Plan",
        copy:
          "Design, Frontend, Weiterleitungen und technische Grundeinstellungen werden so vorbereitet, dass der Übergang kontrolliert und sicher bleibt.",
      },
    ],
    process: [
      {
        title: "Ist-Zustand analysieren",
        description:
          "Wir prüfen Struktur, Inhalte, Vertrauenssignale und technische Altlasten, bevor wir über Erhalt oder Neubau einzelner Bereiche entscheiden.",
      },
      {
        title: "Neuen Aufbau definieren",
        description:
          "Der Relaunch fokussiert auf Klarheit: bessere Reihenfolge, präzisere Aussagen und weniger Reibung bis zur Kontaktaufnahme.",
      },
      {
        title: "Design und Inhalte überführen",
        description:
          "Bestehende Inhalte werden gestrafft, neue Beweiselemente ergänzt und in ein ruhiges, zeitgemäßes Interface überführt.",
      },
      {
        title: "Go-live sauber vorbereiten",
        description:
          "Vor dem Launch sichern wir Weiterleitungen, Metadaten, interne Links und zentrale SEO-Signale gezielt ab.",
      },
    ],
    faqs: [
      {
        question: "Wann lohnt sich ein Website-Relaunch für KMU?",
        answer:
          "Ein Relaunch lohnt sich, wenn eure Website nicht mehr zu eurem aktuellen Angebot passt, Inhalte unklar sind oder die Conversion trotz Traffic zu niedrig bleibt.",
      },
      {
        question: "Bleiben unsere Google-Rankings beim Relaunch erhalten?",
        answer:
          "Ja, wenn der Relaunch sauber geplant ist. Wichtige URLs, Inhalte und Weiterleitungen behandeln wir von Anfang an, nicht erst kurz vor dem Livegang.",
      },
      {
        question: "Müssen wir alle Inhalte komplett neu schreiben?",
        answer:
          "Nein. In vielen Fällen können bestehende Inhalte überarbeitet, neu priorisiert und gezielt ergänzt werden.",
      },
      {
        question: "Wie lange dauert ein Relaunch in der Regel?",
        answer:
          "Je nach Ausgangslage meist 4 bis 6 Wochen. Bei vielen Altseiten, komplexen Weiterleitungen oder neuen Inhalten kann es länger dauern.",
      },
    ],
    relatedProjectSlugs: ["atelier-heimat", "nordlicht-coffee", "uncloud"],
    ctaTitle: "Eure Website soll wieder klar und zeitgemäß wirken?",
    ctaCopy:
      "Im Erstgespräch klären wir, welche Substanz erhalten bleibt und wo ein Relaunch den größten Effekt auf Sichtbarkeit, Vertrauen und Anfragen hat.",
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
