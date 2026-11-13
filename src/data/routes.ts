import { disciplines, images, projects } from "@/data/site";

export const SITE_NAME = "Milano Villa";
export const DEFAULT_TITLE =
  "Milano Villa — Italian Design & Furnishings | Washington, DC";
export const DEFAULT_DESCRIPTION =
  "Milano Villa is an Italian interiors house in the Washington, DC area. Handcrafted furniture, boiserie, lighting and complete interior commissions, sourced from Italy's finest workshops and delivered worldwide.";

const deploymentBase = `/${import.meta.env.BASE_URL.replace(/^\/+|\/+$/g, "")}`;
export const BASE_PATH = deploymentBase === "/" ? "/" : `${deploymentBase}/`;

export type RouteMetadata = {
  path: string;
  title: string;
  description: string;
  image: string;
  index: boolean;
  kind: "page" | "discipline" | "commission" | "not-found";
  label: string;
};

const staticRoutes: RouteMetadata[] = [
  {
    path: "/",
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
    image: images.hero,
    index: true,
    kind: "page",
    label: "Home",
  },
  {
    path: "/atelier",
    title: "The Atelier — Milano Villa",
    description:
      "Meet Milano Villa's Italian atelier and the workshops, materials and disciplines behind each private interior commission.",
    image: images.artisan,
    index: true,
    kind: "page",
    label: "The Atelier",
  },
  {
    path: "/disciplines",
    title: "Interior Design Disciplines — Milano Villa",
    description:
      "Explore Milano Villa's eight interior design disciplines, from complete project assignments and furniture to flooring, boiserie, lighting and art.",
    image: images.living,
    index: true,
    kind: "page",
    label: "Disciplines",
  },
  {
    path: "/commissions",
    title: "Private Interior Commissions — Milano Villa",
    description:
      "View selected Milano Villa room studies and private commissions in furniture, lighting, flooring, joinery and complete interiors.",
    image: images.salon,
    index: true,
    kind: "page",
    label: "Commissions",
  },
  {
    path: "/realization",
    title: "The Realization Steps — Milano Villa",
    description:
      "Learn how a Milano Villa commission moves from consultation and measured drawings through Italian workshop production, delivery and placement.",
    image: images.hands,
    index: true,
    kind: "page",
    label: "Realization",
  },
  {
    path: "/contact",
    title: "Private Consultation — Milano Villa",
    description:
      "Request a private consultation with Milano Villa for an interior, furniture, lighting, boiserie or complete residence commission.",
    image: images.villa,
    index: true,
    kind: "page",
    label: "Contact",
  },
];

const disciplineRoutes: RouteMetadata[] = disciplines.map((discipline) => ({
  path: `/disciplines/${discipline.id}`,
  title: `${discipline.title} — Milano Villa`,
  description: discipline.description,
  image: discipline.image,
  index: true,
  kind: "discipline",
  label: discipline.title,
}));

const commissionRoutes: RouteMetadata[] = projects.map((project) => ({
  path: `/commissions/${project.slug}`,
  title: `${project.title} — Milano Villa`,
  description: project.excerpt,
  image: project.image,
  index: true,
  kind: "commission",
  label: project.title,
}));

export const publicRoutes = [
  ...staticRoutes,
  ...disciplineRoutes,
  ...commissionRoutes,
];

export const notFoundMetadata: RouteMetadata = {
  path: "/404",
  title: "Page Not Found — Milano Villa",
  description: "The requested page could not be found.",
  image: images.hero,
  index: false,
  kind: "not-found",
  label: "Page Not Found",
};

export function normalizePath(pathname: string) {
  const withoutQuery = pathname.split(/[?#]/, 1)[0] || "/";
  if (withoutQuery === "/") return "/";
  return `/${withoutQuery.replace(/^\/+|\/+$/g, "")}`;
}

export function toPublicPath(pathname: string) {
  const path = normalizePath(pathname);
  return path === "/" ? "/" : `${path}/`;
}

export function stripBasePath(pathname: string) {
  if (BASE_PATH === "/") return normalizePath(pathname);
  const baseWithoutSlash = BASE_PATH.replace(/\/$/, "");
  if (pathname === baseWithoutSlash || pathname === BASE_PATH) return "/";
  return normalizePath(pathname.startsWith(BASE_PATH) ? pathname.slice(BASE_PATH.length - 1) : pathname);
}

export function toBrowserPath(pathname: string) {
  const publicPath = toPublicPath(pathname);
  if (BASE_PATH === "/") return publicPath;
  return publicPath === "/" ? BASE_PATH : `${BASE_PATH}${publicPath.replace(/^\//, "")}`;
}

export function getRouteMetadata(pathname: string) {
  const path = normalizePath(pathname);
  return publicRoutes.find((route) => route.path === path) ?? notFoundMetadata;
}

