# Projektidentität

**Projektname:** stackwerkhaus_portfolio_v2

Neues Portfolio für Stackwerkhaus mit Fokus auf Leistungen, Case Studies und Kontakt.
Optional ein kurzer Untertitel mit Nutzenversprechen.
Der Leser muss nach fünf Sekunden verstehen, worum es geht.

## Problem und Zweck

Stackwerkhaus braucht eine klare, moderne und schnelle Portfolio-Präsenz.
Das Projekt bündelt Referenzen, Leistungen und Kontakt an einem Ort.
Zielgruppe sind Startups, Selbstständige und Unternehmen, die eine hochwertige digitale Präsenz suchen.

Beispielgedanke:

> Dieses Projekt hilft potenziellen Kund:innen dabei, das Angebot schnell zu verstehen, indem Inhalte und Case Studies klar strukturiert dargestellt werden.

## Features auf High Level

- Portfolio-/Work-Grid mit Case Studies
- Detailseiten pro Projekt mit Leistungsüberblick
- Animierte UI-Elemente (GSAP, Scroll-Reveals, Micro-Interactions)
- Kontakt- und FAQ-Sektion
- SEO-optimierte Metadaten und strukturierte Inhalte

Was bewusst nicht drin ist:
- Kein CMS (Inhalte liegen im Code)
- Keine Datenbank oder Nutzerverwaltung

## Tech Stack

- Frontend: Next.js 16, React 19, TypeScript
- Styling: Tailwind CSS 4
- Animationen: GSAP, @gsap/react, Lenis
- Weitere Tools: ESLint

## Voraussetzungen

- Node.js (LTS empfohlen)
- pnpm

## Installation

```bash
# 1) Repository klonen
# 2) Dependencies installieren
pnpm install

# 3) Dev-Server starten
pnpm dev
```

## Konfiguration

Aktuell sind keine Environment-Variablen erforderlich.

```txt
# Keine .env erforderlich
```

## Nutzung

- Lokal starten: `pnpm dev`
- App läuft unter: `http://localhost:3000`

## Scripts

- `pnpm dev` – startet den Dev-Server
- `pnpm build` – erstellt den Production-Build
- `pnpm start` – startet den Production-Server
- `pnpm lint` – ESLint

## Testing

Derzeit keine automatisierten Tests.

## Deployment

- Standard Next.js Deployment
- Build: `pnpm build`
- Start: `pnpm start`
- Hosting möglich auf Vercel oder eigener Node-Server-Umgebung

## Projektstruktur

- `src/app` – App Router, Pages und Layouts
- `src/components` – UI/Sections/Animations
- `src/lib` – Daten und Utilities (z. B. Projekte)
- `src/providers` – Provider (z. B. Smooth Scroll)
- `public` – statische Assets (Images, Logos)

## Sicherheit und Datenschutz

- Keine sensiblen Daten im Repo
- Secrets gehören in Environment-Variablen (falls später ergänzt)
- DSGVO-relevante Inhalte aktuell nicht enthalten

## Roadmap oder Status

- Status: aktiv
- Geplant: weitere Case Studies, Copy-Optimierungen, Performance-Tuning
- Nicht geplant: CMS-Integration (vorerst)

## Contributing

- Interne Pflege durch das Stackwerkhaus-Team
- PRs nur nach Absprache
- Issues für Bugs/Änderungswünsche

## Lizenz

Proprietär – alle Rechte vorbehalten.

## Kontakt oder Maintainer

Stackwerkhaus – Kontakt über `stackwerkhaus.de`

## Mentales Modell zum Merken

Ein kuratiertes, animiertes Portfolio: Work-Grid → Detailseite → Kontakt.
