import type { Metadata } from "next";
import Script from "next/script";
import {
  Bodoni_Moda,
  IBM_Plex_Mono,
  IBM_Plex_Sans,
} from "next/font/google";
import dynamic from "next/dynamic";
import { JsonLd } from "@/components/seo/JsonLd";

const CustomCursor = dynamic(() =>
  import("@/components/animations/CustomCursor").then((m) => ({
    default: m.CustomCursor,
  })),
);
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { buildSiteGraph, siteConfig } from "@/lib/seo";
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
  metadataBase: new URL(siteConfig.url),
  alternates: {
    canonical: "/",
  },
  title: {
    default: siteConfig.defaultTitle,
    template: "%s | STACKWERKHAUS",
  },
  description: siteConfig.defaultDescription,
  openGraph: {
    type: "website",
    locale: siteConfig.locale,
    url: "/",
    siteName: siteConfig.name,
    title: siteConfig.defaultTitle,
    description: siteConfig.defaultDescription,
    images: [
      {
        url: siteConfig.ogImage,
        alt: siteConfig.name,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.defaultTitle,
    description: siteConfig.defaultDescription,
    images: [siteConfig.ogImage],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de" suppressHydrationWarning>
      <head>
        <Script
          id="Cookiebot"
          src="https://consent.cookiebot.com/uc.js"
          data-cbid="f656ec61-fa34-4784-8702-a8e18483fd69"
          strategy="beforeInteractive"
        />
        <JsonLd data={buildSiteGraph()} />
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
