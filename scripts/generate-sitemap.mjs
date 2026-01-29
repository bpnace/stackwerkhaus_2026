import fs from "node:fs/promises";
import path from "node:path";

const siteUrl = "https://stackwerkhaus.de";
const rootDir = process.cwd();
const projectsPath = path.join(rootDir, "src", "lib", "projects.ts");
const publicDir = path.join(rootDir, "public");

const staticRoutes = [
  "/",
  "/impressum",
  "/datenschutz",
  "/cookie-richtlinien",
];

const readProjectSlugs = async () => {
  const content = await fs.readFile(projectsPath, "utf8");
  const slugs = new Set();
  const regex = /slug:\s*"([^"]+)"/g;
  let match;
  while ((match = regex.exec(content)) !== null) {
    slugs.add(match[1]);
  }
  return Array.from(slugs);
};

const buildSitemap = (urls) => {
  const today = new Date().toISOString().split("T")[0];
  const entries = urls
    .map(
      (url) =>
        `  <url>\n    <loc>${url}</loc>\n    <lastmod>${today}</lastmod>\n  </url>`
    )
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>\n` +
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
    `${entries}\n` +
    `</urlset>\n`;
};

const ensurePublicDir = async () => {
  await fs.mkdir(publicDir, { recursive: true });
};

const main = async () => {
  const slugs = await readProjectSlugs();
  const workRoutes = slugs.map((slug) => `/work/${slug}`);
  const urls = [...staticRoutes, ...workRoutes].map(
    (route) => `${siteUrl}${route}`
  );

  await ensurePublicDir();
  const sitemap = buildSitemap(urls);
  await fs.writeFile(path.join(publicDir, "sitemap.xml"), sitemap, "utf8");
};

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
