import type { Metadata } from "next";

export const siteConfig = {
  name: "STACKWERKHAUS",
  url: "https://stackwerkhaus.de",
  locale: "de_DE",
  language: "de-DE",
  defaultTitle: "STACKWERKHAUS | Klare Websites für Dienstleister und KMU",
  defaultDescription:
    "STACKWERKHAUS entwickelt schnelle, klare Websites für Dienstleister, kleine Unternehmen und neue Marken in DACH. Struktur, Design, SEO-Basis und saubere Umsetzung aus Berlin.",
  ogImage: "/images/og_image.webp",
  contactEmail: "info@stackwerkhaus.de",
  phone: "+4917631378294",
  sameAs: [
    "https://www.instagram.com/stackwerkhaus",
    "https://www.linkedin.com/in/tarik-arthur-marshall-6112b2239",
  ],
};

export type BreadcrumbItem = {
  name: string;
  path: string;
};

type OpenGraphType = "website" | "article";

type PageMetadataOptions = {
  title: string;
  description: string;
  path: string;
  type?: OpenGraphType;
  image?: string;
  noindex?: boolean;
};

type WebPageSchemaOptions = {
  title: string;
  description: string;
  path: string;
  dateModified?: string;
  breadcrumbItems?: BreadcrumbItem[];
};

type ServiceSchemaOptions = {
  title: string;
  description: string;
  path: string;
  serviceType: string;
  audience: string;
  offer?: {
    price: string;
    priceCurrency: string;
  };
};

type ItemListOptions = {
  title: string;
  path: string;
  items: Array<{ name: string; path: string }>;
};

type CollectionPageSchemaOptions = {
  title: string;
  description: string;
  path: string;
  dateModified?: string;
};

export function absoluteUrl(path: string) {
  return new URL(path, siteConfig.url).toString();
}

export function clampDescription(text: string, maxLength = 160) {
  const normalized = text.replace(/\s+/g, " ").trim();
  if (normalized.length <= maxLength) {
    return normalized;
  }

  const trimmed = normalized.slice(0, maxLength - 1);
  const lastSpace = trimmed.lastIndexOf(" ");
  const safeTrimmed = lastSpace > 100 ? trimmed.slice(0, lastSpace) : trimmed;
  return `${safeTrimmed}…`;
}

export function formatGermanDate(date: string) {
  return new Intl.DateTimeFormat("de-DE", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(new Date(date));
}

export function buildPageMetadata({
  title,
  description,
  path,
  type = "website",
  image = siteConfig.ogImage,
  noindex = false,
}: PageMetadataOptions): Metadata {
  const safeDescription = clampDescription(description);

  return {
    title,
    description: safeDescription,
    alternates: {
      canonical: path,
    },
    openGraph: {
      type,
      locale: siteConfig.locale,
      url: path,
      siteName: siteConfig.name,
      title,
      description: safeDescription,
      images: [
        {
          url: image,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: safeDescription,
      images: [image],
    },
    robots: noindex
      ? {
          index: false,
          follow: true,
        }
      : undefined,
  };
}

export const personSchema = {
  "@type": "Person",
  name: "Tarik Marshall",
  jobTitle: "Founder",
  url: siteConfig.url,
  sameAs: siteConfig.sameAs,
};

export const organizationSchema = {
  "@type": "Organization",
  name: siteConfig.name,
  url: siteConfig.url,
  email: siteConfig.contactEmail,
  telephone: siteConfig.phone,
  sameAs: siteConfig.sameAs,
  founder: personSchema,
};

export const websiteSchema = {
  "@type": "WebSite",
  name: siteConfig.name,
  url: siteConfig.url,
  inLanguage: siteConfig.language,
};

export const professionalServiceSchema = {
  "@type": "ProfessionalService",
  name: siteConfig.name,
  url: siteConfig.url,
  email: siteConfig.contactEmail,
  telephone: siteConfig.phone,
  areaServed: ["Berlin", "Deutschland", "DACH"],
  serviceType: [
    "Webdesign",
    "Website-Relaunch",
    "Technisches SEO",
    "DSGVO-orientierte Website-Umsetzung",
  ],
  founder: personSchema,
};

export function buildSiteGraph() {
  return {
    "@context": "https://schema.org",
    "@graph": [organizationSchema, websiteSchema, professionalServiceSchema],
  };
}

export function buildCollectionPageSchema({
  title,
  description,
  path,
  dateModified,
}: CollectionPageSchemaOptions) {
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: title,
    description: clampDescription(description),
    url: absoluteUrl(path),
    inLanguage: siteConfig.language,
    isPartOf: {
      "@type": "WebSite",
      name: siteConfig.name,
      url: siteConfig.url,
    },
    about: organizationSchema,
    dateModified,
    primaryImageOfPage: absoluteUrl(siteConfig.ogImage),
  };
}

export function buildBreadcrumbSchema(items: BreadcrumbItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export function buildFaqSchema(
  items: Array<{ question: string; answer: string }>,
) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}

export function buildWebPageSchema({
  title,
  description,
  path,
  dateModified,
  breadcrumbItems = [],
}: WebPageSchemaOptions) {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: title,
    description: clampDescription(description),
    url: absoluteUrl(path),
    inLanguage: siteConfig.language,
    isPartOf: {
      "@type": "WebSite",
      name: siteConfig.name,
      url: siteConfig.url,
    },
    author: personSchema,
    dateModified,
    breadcrumb:
      breadcrumbItems.length > 0 ? buildBreadcrumbSchema(breadcrumbItems) : undefined,
    primaryImageOfPage: absoluteUrl(siteConfig.ogImage),
  };
}

export function buildServiceSchema({
  title,
  description,
  path,
  serviceType,
  audience,
  offer,
}: ServiceSchemaOptions) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: title,
    description: clampDescription(description),
    serviceType,
    areaServed: ["Berlin", "Deutschland", "DACH"],
    audience: {
      "@type": "Audience",
      audienceType: audience,
    },
    offers: offer
      ? {
          "@type": "Offer",
          price: offer.price,
          priceCurrency: offer.priceCurrency,
          availability: "https://schema.org/InStock",
          url: absoluteUrl(path),
        }
      : undefined,
    provider: organizationSchema,
    url: absoluteUrl(path),
  };
}

export function buildItemListSchema({ title, path, items }: ItemListOptions) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: title,
    url: absoluteUrl(path),
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      url: absoluteUrl(item.path),
    })),
  };
}
