import fs from "node:fs/promises";
import path from "node:path";

const OUT_DIR = path.join(process.cwd(), "out");

async function* walk(dirPath) {
  const entries = await fs.readdir(dirPath, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dirPath, entry.name);
    if (entry.isDirectory()) {
      yield* walk(fullPath);
      continue;
    }
    yield fullPath;
  }
}

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function extractCcm19Url(html) {
  // Prefer the link preload URL if present; it's stable and unambiguous.
  const match =
    html.match(
      /https:\/\/cloud\.ccm19\.de\/app\.js\?apiKey=[^"'&<> ]+(?:&amp;|&)(?:domain|d)=[^"'&<> ]+/i,
    ) ?? html.match(/https:\/\/cloud\.ccm19\.de\/app\.js\?[^"'<> ]+/i);

  if (!match) return null;
  return match[0].replace(/&amp;/g, "&");
}

function removeExistingCcm19Scripts(html) {
  return html.replace(
    /<script[^>]*\bid=(?:"|')CCM19(?:"|')[^>]*>[\s\S]*?<\/script>/gi,
    "",
  );
}

function removeCcm19PreloadLinks(html) {
  return html.replace(/<link\b[^>]*>/gi, (tag) => {
    if (!/rel=(?:"|')preload(?:"|')/i.test(tag)) return tag;
    if (!/as=(?:"|')script(?:"|')/i.test(tag)) return tag;
    if (!/href=(?:"|')https:\/\/cloud\.ccm19\.de\/app\.js\?/i.test(tag)) return tag;
    return "";
  });
}

function removeNextScriptQueueLoader(html, ccm19Url) {
  // Remove the `next/script` beforeInteractive loader to avoid double-loading:
  // (self.__next_s=self.__next_s||[]).push(["<url>",{...}])
  const urlEscaped = escapeRegExp(ccm19Url);
  const loaderRe = new RegExp(
    `<script[^>]*>\\(self\\.__next_s=self\\.__next_s\\|\\|\\[\\]\\)\\.push\\(\\[\\\"${urlEscaped}\\\",[\\s\\S]*?\\]\\s*\\)\\s*;?\\s*<\\/script>`,
    "gi",
  );
  return html.replace(loaderRe, "");
}

function injectAsFirstScriptInHead(html, ccm19Url) {
  const headOpenIndex = html.indexOf("<head>");
  if (headOpenIndex === -1) return html;

  const headCloseIndex = html.indexOf("</head>", headOpenIndex);
  if (headCloseIndex === -1) return html;

  const headContentStart = headOpenIndex + "<head>".length;
  const headContent = html.slice(headContentStart, headCloseIndex);

  const firstScriptRel = headContent.indexOf("<script");
  const insertAt =
    firstScriptRel === -1 ? headContentStart : headContentStart + firstScriptRel;

  const scriptTag = `<script id="CCM19" src="${ccm19Url}" referrerpolicy="origin"></script>`;

  return html.slice(0, insertAt) + scriptTag + html.slice(insertAt);
}

async function main() {
  try {
    await fs.access(OUT_DIR);
  } catch {
    console.warn(`[postbuild-ccm19] out/ not found at ${OUT_DIR}; skipping`);
    return;
  }

  let updatedFiles = 0;

  for await (const filePath of walk(OUT_DIR)) {
    if (!filePath.endsWith(".html")) continue;

    const original = await fs.readFile(filePath, "utf8");
    const ccm19Url = extractCcm19Url(original);
    if (!ccm19Url) continue;

    let next = original;
    next = removeExistingCcm19Scripts(next);
    next = removeCcm19PreloadLinks(next);
    next = removeNextScriptQueueLoader(next, ccm19Url);
    next = injectAsFirstScriptInHead(next, ccm19Url);

    if (next !== original) {
      await fs.writeFile(filePath, next, "utf8");
      updatedFiles += 1;
    }
  }

  if (updatedFiles > 0) {
    console.log(`[postbuild-ccm19] updated ${updatedFiles} HTML file(s)`);
  }
}

await main();
