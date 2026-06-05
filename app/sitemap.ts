import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://celebuzzz.com",
      lastModified: new Date(),
    },
    {
      url: "https://celebuzzz.com/about",
      lastModified: new Date(),
    },
    {
      url: "https://celebuzzz.com/contact",
      lastModified: new Date(),
    },
    {
      url: "https://celebuzzz.com/privacy-policy",
      lastModified: new Date(),
    },
    {
      url: "https://celebuzzz.com/disclaimer",
      lastModified: new Date(),
    },
    {
      url: "https://celebuzzz.com/dmca",
      lastModified: new Date(),
    },
  ];
}