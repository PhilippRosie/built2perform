import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return ["", "/print", "/skanetaxen", "/integritet", "/cookies", "/villkor", "/tillganglighet"].map((path) => ({
    url: `${site.url}${path}`,
  }));
}
