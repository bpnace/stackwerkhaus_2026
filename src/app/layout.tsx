import type { Metadata } from "next";
import {
  Bodoni_Moda,
  IBM_Plex_Mono,
  IBM_Plex_Sans,
} from "next/font/google";
import Script from "next/script";
import { CustomCursor } from "@/components/animations/CustomCursor";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { SmoothScrollProvider } from "@/providers/SmoothScrollProvider";
import { TransitionProvider } from "@/providers/TransitionProvider";
import "./globals.css";

const displayFont = Bodoni_Moda({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const bodyFont = IBM_Plex_Sans({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const monoFont = IBM_Plex_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://stackwerkhaus.de"),
  title: {
    default:
      "Bezahlbare Website für Startups – sicher & direkt | STACKWERKHAUS",
    template: "%s | STACKWERKHAUS",
  },
  description:
    "Bezahlbare, sichere Startup-Websites in kurzer Zeit. Klarer Aufbau, SEO-Basis, DSGVO-Fokus – direkt aus Berlin.",
  openGraph: {
    type: "website",
    locale: "de_DE",
    url: "/",
    siteName: "STACKWERKHAUS",
    title:
      "Bezahlbare Website für Startups – sicher & direkt | STACKWERKHAUS",
    description:
      "Bezahlbare, sichere Startup-Websites in kurzer Zeit. Klarer Aufbau, SEO-Basis, DSGVO-Fokus – direkt aus Berlin.",
    images: [
      {
        url: "/images/og_image.webp",
        alt: "STACKWERKHAUS",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title:
      "Bezahlbare Website für Startups – sicher & direkt | STACKWERKHAUS",
    description:
      "Bezahlbare, sichere Startup-Websites in kurzer Zeit. Klarer Aufbau, SEO-Basis, DSGVO-Fokus – direkt aus Berlin.",
    images: ["/images/og_image.webp"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "STACKWERKHAUS",
  url: "https://stackwerkhaus.de",
  sameAs: [
    "https://www.instagram.com/stackwerkhaus",
    "https://www.linkedin.com/in/tarik-arthur-marshall-6112b2239",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de">
      <head>
        <link
          href="https://assets.calendly.com/assets/external/widget.css"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
      </head>
      <body
        className={`${displayFont.variable} ${bodyFont.variable} ${monoFont.variable} antialiased`}
      >
        <Script
          id="Cookiebot"
          src="https://consent.cookiebot.com/uc.js"
          data-cbid="f656ec61-fa34-4784-8702-a8e18483fd69"
          data-blockingmode="auto"
          strategy="beforeInteractive"
        />
        <SmoothScrollProvider>
          <TransitionProvider>
            <CustomCursor />
            <Header />
            <main>{children}</main>
            <Footer />
          </TransitionProvider>
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
