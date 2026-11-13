import {
  DEFAULT_DESCRIPTION,
  DEFAULT_TITLE,
  SITE_NAME,
  toPublicPath,
  type RouteMetadata,
} from "@/data/routes";
import { CONTACT } from "@/data/site";

export function normalizeSiteUrl(value?: string) {
  return (value || "https://example.invalid").replace(/\/+$/, "");
}

export function getCanonicalUrl(siteUrl: string, path: string) {
  const base = normalizeSiteUrl(siteUrl);
  return `${base}${toPublicPath(path)}`;
}

export function getStructuredData(route: RouteMetadata, siteUrl: string) {
  const base = normalizeSiteUrl(siteUrl);
  const canonical = getCanonicalUrl(base, route.path);
  const graph: Record<string, unknown>[] = [
    {
      "@type": "WebSite",
      "@id": `${base}/#website`,
      url: `${base}/`,
      name: SITE_NAME,
      description: DEFAULT_DESCRIPTION,
      inLanguage: "en-US",
    },
    {
      "@type": "ProfessionalService",
      "@id": `${base}/#organization`,
      name: SITE_NAME,
      url: `${base}/`,
      email: CONTACT.email,
      description: DEFAULT_DESCRIPTION,
      areaServed: ["United States", "Worldwide"],
      knowsAbout: [
        "Interior design",
        "Italian furniture",
        "Boiserie",
        "Lighting design",
        "Custom furnishings",
      ],
    },
    {
      "@type": "WebPage",
      "@id": `${canonical}#webpage`,
      url: canonical,
      name: route.title || DEFAULT_TITLE,
      description: route.description || DEFAULT_DESCRIPTION,
      isPartOf: { "@id": `${base}/#website` },
      about: { "@id": `${base}/#organization` },
      primaryImageOfPage: route.image,
      inLanguage: "en-US",
    },
  ];

  if (route.path !== "/" && route.kind !== "not-found") {
    graph.push({
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: `${base}/`,
        },
        {
          "@type": "ListItem",
          position: 2,
          name: route.label,
          item: canonical,
        },
      ],
    });
  }

  if (route.kind === "discipline") {
    graph.push({
      "@type": "Service",
      name: route.label,
      description: route.description,
      url: canonical,
      provider: { "@id": `${base}/#organization` },
      areaServed: ["United States", "Worldwide"],
    });
  }

  return { "@context": "https://schema.org", "@graph": graph };
}

function upsertMeta(selector: string, attributes: Record<string, string>) {
  let element = document.head.querySelector<HTMLMetaElement>(selector);
  if (!element) {
    element = document.createElement("meta");
    document.head.append(element);
  }
  Object.entries(attributes).forEach(([name, value]) => {
    element?.setAttribute(name, value);
  });
}

export function applyDocumentMetadata(route: RouteMetadata, siteUrl: string) {
  const canonical = getCanonicalUrl(siteUrl, route.path);
  document.title = route.title;
  upsertMeta('meta[name="description"]', {
    name: "description",
    content: route.description,
  });
  upsertMeta('meta[name="robots"]', {
    name: "robots",
    content: route.index ? "index, follow" : "noindex, nofollow",
  });
  upsertMeta('meta[property="og:title"]', { property: "og:title", content: route.title });
  upsertMeta('meta[property="og:description"]', {
    property: "og:description",
    content: route.description,
  });
  upsertMeta('meta[property="og:url"]', { property: "og:url", content: canonical });
  upsertMeta('meta[property="og:image"]', { property: "og:image", content: route.image });
  upsertMeta('meta[name="twitter:title"]', { name: "twitter:title", content: route.title });
  upsertMeta('meta[name="twitter:description"]', {
    name: "twitter:description",
    content: route.description,
  });
  upsertMeta('meta[name="twitter:image"]', { name: "twitter:image", content: route.image });

  let canonicalLink = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
  if (!canonicalLink) {
    canonicalLink = document.createElement("link");
    canonicalLink.rel = "canonical";
    document.head.append(canonicalLink);
  }
  canonicalLink.href = canonical;

  let structuredData = document.getElementById("structured-data");
  if (!structuredData) {
    structuredData = document.createElement("script");
    structuredData.id = "structured-data";
    structuredData.setAttribute("type", "application/ld+json");
    document.head.append(structuredData);
  }
  structuredData.textContent = JSON.stringify(getStructuredData(route, siteUrl));
}

