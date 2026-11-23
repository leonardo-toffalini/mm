import type { MetadataRoute } from "next";
import { gowns } from "@/data/gowns";
import { routes, siteUrl } from "@/lib/routes";

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = [routes.home, routes.collection, routes.booking, routes.privacy, ...gowns.map((g) => routes.gown(g.slug))];
  return paths.map((path) => ({ url: siteUrl + (path === "/" ? "" : path) }));
}
