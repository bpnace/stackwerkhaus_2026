export const faqItems = [
  {
    question: "Was kostet eine Website für Startups?",
    answer:
      "Der Einstieg beginnt ab 999€ inklusive Konzeption, Design und Umsetzung. Der finale Preis hängt vom Umfang und den Funktionen ab - du bekommst ein klares Angebot nach dem Erstgespräch.",
  },
  {
    question: "Wie schnell kann ich eine Website erstellen lassen?",
    answer:
      "Je nach Umfang geht deine Website in wenigen Wochen live. Nach dem Kick-off bekommst du einen konkreten Zeitplan.",
  },
  {
    question: "Kann ich eine professionelle Website bekommen?",
    answer:
      "Ja. Du bekommst eine komplette Website inklusive Struktur, Design, Umsetzung und Launch.",
  },
  {
    question: "Was ist im Website-Paket enthalten?",
    answer:
      "Konzept, Struktur, Design, Umsetzung, responsive Optimierung, SEO-Basis und ein sauberer Launch.",
  },
  {
    question: "Ist die Website sicher und DSGVO-konform?",
    answer:
      "Ja. Wir achten auf sichere Umsetzung, DSGVO-Basis und eine saubere technische Struktur.",
  },
  {
    question: "Kann ich selbst Inhalte ändern lassen?",
    answer:
      "Ja. Auf Wunsch bekommst du eine einfache Content-Struktur und klare Übergabe, damit Updates schnell möglich sind.",
  },
  {
    question: "Wie erstelle ich eine Website für mein Startup mit wenig Budget?",
    answer:
      "Wir definieren gemeinsam den Fokus, priorisieren Inhalte und liefern eine bezahlbare Startup-Website mit klarer Struktur, schneller Umsetzung und sauberem Launch.",
  },
  {
    question: "Gibt es eine sichere Website für kleine Unternehmen mit DSGVO-Basis?",
    answer:
      "Ja. Wir setzen auf eine sichere technische Basis, DSGVO-orientierte Standards und transparente Prozesse - ideal für kleine Unternehmen.",
  },
  {
    question: "Kann eine professionelle Website in kurzer Zeit live gehen?",
    answer:
      "Ja. Abhängig vom Umfang bringen wir deine Website in wenigen Wochen live - inklusive Design, Struktur und SEO-Basics.",
  },
  {
    question: "Wie hilft SEO/AEO bei einer Startup-Website konkret?",
    answer:
      "SEO/AEO sorgt für bessere Sichtbarkeit in der Suche und AI Overviews, damit deine Website schneller gefunden wird und mehr qualifizierte Anfragen erhält.",
  },
];

export const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqItems.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: item.answer,
    },
  })),
};
