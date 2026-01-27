import type { Metadata } from "next";
import {
  Bodoni_Moda,
  IBM_Plex_Mono,
  IBM_Plex_Sans,
} from "next/font/google";
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
    default: "STACKWERKHAUS - Webdesign für Startups und Selbstständige",
    template: "%s – STACKWERKHAUS",
  },
  description:
    "Webdesign, Branding, Full-Stack Lösungen und KI-Integration aus Berlin. STACKWERKHAUS baut moderne Websites für Startups und Selbstständige.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "de_DE",
    url: "/",
    siteName: "STACKWERKHAUS",
    title: "STACKWERKHAUS - Webdesign für Startups und Selbstständige",
    description:
      "Webdesign, Branding, Full-Stack Lösungen und KI-Integration aus Berlin. STACKWERKHAUS baut moderne Websites für Startups und Selbstständige.",
    images: [
      {
        url: "/images/og_image.webp",
        alt: "STACKWERKHAUS",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "STACKWERKHAUS - Webdesign für Startups und Selbstständige",
    description:
      "Webdesign, Branding, Full-Stack Lösungen und KI-Integration aus Berlin. STACKWERKHAUS baut moderne Websites für Startups und Selbstständige.",
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
      </head>
      <body
        className={`${displayFont.variable} ${bodyFont.variable} ${monoFont.variable} antialiased`}
      >
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
