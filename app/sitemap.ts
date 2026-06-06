import type { MetadataRoute } from "next";
import { articles } from "@/lib/articles";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://celebuzzz.com";

  const staticPages = [
    "",
    "/about",
    "/contact",
    "/privacy-policy",
    "/disclaimer",
    "/dmca",
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
  }));

  const articlePages = articles.map((article) => ({
    url: `${baseUrl}/article/${article.id}`,
    lastModified: new Date(article.date),
  }));

  return [...staticPages, ...articlePages];
}