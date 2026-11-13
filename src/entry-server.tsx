import { renderToString } from "react-dom/server";
import App from "./App";
import { getRouteMetadata, publicRoutes } from "./data/routes";
import { getStructuredData } from "./lib/metadata";

export function renderPage(path: string, siteUrl: string) {
  const metadata = getRouteMetadata(path);
  return {
    appHtml: renderToString(<App initialPath={path} />),
    metadata,
    structuredData: getStructuredData(metadata, siteUrl),
  };
}

export function getPublicRoutes() {
  return publicRoutes;
}

