import { NextDrupal, type DrupalFile, type DrupalNode } from "next-drupal";

const baseUrl =
  process.env.NEXT_PUBLIC_DRUPAL_BASE_URL || "https://cms.codariq.de";

export const drupal = new NextDrupal(baseUrl);

type FormattedText = {
  processed?: string;
  value?: string;
  summary?: string;
};

type DrupalTimestamp = {
  value?: string;
};

export type PortfolioProject = {
  id: string;
  title: string;
  client?: string;
  slug?: string;
  year?: string;
  services: string[];
  summary?: string;
  cover?: {
    url: string;
    alt: string;
  };
};

type PortfolioNode = DrupalNode & {
  field_title?: string;
  field_client?: string;
  field_cover?: DrupalFile | DrupalFile[] | null;
  field_datum?: DrupalTimestamp | string;
  field_service?: string[];
  field_short_description?: FormattedText;
  field_slug?: string;
  body?: FormattedText;
};

const stripHtml = (value?: string) => {
  if (!value) return "";
  return value.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
};

const getYear = (field?: DrupalTimestamp | string) => {
  const value = typeof field === "string" ? field : field?.value;
  if (!value) return undefined;
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return undefined;
  return String(date.getFullYear());
};

const getCover = (cover?: DrupalFile | DrupalFile[] | null) => {
  if (!cover) return undefined;
  const file = Array.isArray(cover) ? cover[0] : cover;
  const url = file?.uri?.url;
  if (!url) return undefined;
  const alt = file?.resourceIdObjMeta?.alt || file?.filename || "";
  return { url, alt };
};

export async function getPortfolioProjects(): Promise<PortfolioProject[]> {
  const nodes = await drupal.getResourceCollection<PortfolioNode[]>(
    "node--portfolio",
    {
      params: {
        "fields[node--portfolio]":
          "field_title,field_client,field_cover,field_datum,field_service,field_short_description,field_slug",
        include: "field_cover",
        sort: "-field_datum",
      },
      next: { revalidate: 60 },
    }
  );

  return nodes
    .map((node) => {
      const summary = stripHtml(
        node.field_short_description?.processed ||
          node.field_short_description?.value
      );

      return {
        id: node.id,
        title: node.field_title || node.title || "",
        client: node.field_client,
        slug: node.field_slug,
        year: getYear(node.field_datum),
        services: node.field_service ?? [],
        summary: summary || undefined,
        cover: getCover(node.field_cover),
      };
    })
    .filter((project) => project.title);
}
