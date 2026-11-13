import { mkdir, readFile, rm, writeFile } from "node:fs/promises";
import path from "node:path";
import { pathToFileURL } from "node:url";
import { loadEnv } from "vite";

const root = process.cwd();
const distDirectory = path.join(root, "dist");
const serverEntry = path.join(root, "dist-server", "entry-server.js");
const template = await readFile(path.join(distDirectory, "index.html"), "utf8");
const { getPublicRoutes, renderPage } = await import(pathToFileURL(serverEntry).href);
const env = loadEnv("production", root, "");
const siteUrl = (process.env.VITE_SITE_URL || env.VITE_SITE_URL || "https://example.invalid").replace(
  /\/+$/,
  ""
);
const siteOrigin = new URL(`${siteUrl}/`).origin;

if (siteUrl === "https://example.invalid") {
  process.stderr.write(
    "Warning: VITE_SITE_URL is not set; canonical URLs use https://example.invalid.\n"
  );
}

const escapeAttribute = (value) =>
  String(value)
    .replaceAll("&", "&amp;")
    .replaceAll('"', "&quot;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");

const escapeJson = (value) => JSON.stringify(value).replaceAll("<", "\\u003c");

function createHead(metadata, structuredData) {
  const canonical =
    metadata.path === "/" ? `${siteUrl}/` : `${siteUrl}${metadata.path}/`;
  const robots = metadata.index ? "index, follow" : "noindex, nofollow";
  const image = /^https?:\/\//i.test(metadata.image)
    ? metadata.image
    : new URL(metadata.image.replace(/^\//, ""), `${siteOrigin}/`).href;
  return [
    `<title>${escapeAttribute(metadata.title)}</title>`,
    `<meta name="description" content="${escapeAttribute(metadata.description)}" />`,
    `<meta name="robots" content="${robots}" />`,
    `<link rel="canonical" href="${escapeAttribute(canonical)}" />`,
    `<meta property="og:type" content="website" />`,
    `<meta property="og:site_name" content="Milano Villa" />`,
    `<meta property="og:title" content="${escapeAttribute(metadata.title)}" />`,
    `<meta property="og:description" content="${escapeAttribute(metadata.description)}" />`,
    `<meta property="og:url" content="${escapeAttribute(canonical)}" />`,
    `<meta property="og:image" content="${escapeAttribute(image)}" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${escapeAttribute(metadata.title)}" />`,
    `<meta name="twitter:description" content="${escapeAttribute(metadata.description)}" />`,
    `<meta name="twitter:image" content="${escapeAttribute(image)}" />`,
    `<script id="structured-data" type="application/ld+json">${escapeJson(structuredData)}</script>`,
  ].join("\n    ");
}

async function writeRoute(routePath, outputPath = routePath) {
  const { appHtml, metadata, structuredData } = renderPage(routePath, siteUrl);
  const html = template
    .replace(
      /<!--app-head-start-->[\s\S]*?<!--app-head-end-->/,
      `<!--app-head-start-->\n    ${createHead(metadata, structuredData)}\n    <!--app-head-end-->`
    )
    .replace("<!--app-html-->", appHtml);
  const destination =
    outputPath === "/"
      ? path.join(distDirectory, "index.html")
      : path.join(distDirectory, outputPath.replace(/^\//, ""), "index.html");
  await mkdir(path.dirname(destination), { recursive: true });
  await writeFile(destination, html);
}

const routes = getPublicRoutes();
for (const route of routes) await writeRoute(route.path);
await writeRoute("/404", "/not-found");

const { appHtml, metadata, structuredData } = renderPage("/404", siteUrl);
const notFoundHtml = template
  .replace(
    /<!--app-head-start-->[\s\S]*?<!--app-head-end-->/,
    `<!--app-head-start-->\n    ${createHead(metadata, structuredData)}\n    <!--app-head-end-->`
  )
  .replace("<!--app-html-->", appHtml);
await writeFile(path.join(distDirectory, "404.html"), notFoundHtml);

const indexedRoutes = routes.filter((route) => route.index);
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${indexedRoutes
  .map((route) => {
    const location = route.path === "/" ? `${siteUrl}/` : `${siteUrl}${route.path}/`;
    return `  <url><loc>${escapeAttribute(location)}</loc></url>`;
  })
  .join("\n")}
</urlset>
`;
await writeFile(path.join(distDirectory, "sitemap.xml"), sitemap);
await writeFile(
  path.join(distDirectory, "robots.txt"),
  `User-agent: *\nAllow: /\n\nSitemap: ${siteUrl}/sitemap.xml\n`
);
await rm(path.join(root, "dist-server"), { recursive: true, force: true });
process.stdout.write(`Prerendered ${routes.length + 1} routes for ${siteUrl}.\n`);

