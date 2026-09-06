import type { MetadataRoute } from "next";
import { site } from "@/lib/site";
import { listArticles } from "@/lib/articles";

// Articles can be added by the Soro webhook between deploys, so keep this
// dynamic rather than baking it in at build time.
export const dynamic = "force-dynamic";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ["", "/about", "/services", "/consultation", "/priser", "/blog", "/contact", "/privacy", "/terms"];
  const now = new Date();

  const staticEntries: MetadataRoute.Sitemap = routes.map((path) => ({
    url: `${site.url}${path}`,
    lastModified: now,
    changeFrequency: path === "" ? "monthly" : "yearly",
    priority: path === "" ? 1 : 0.7,
  }));

  const articleEntries: MetadataRoute.Sitemap = listArticles().map((article) => ({
    url: `${site.url}/blog/${article.slug}`,
    lastModified: new Date(article.updatedAt),
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [...staticEntries, ...articleEntries];
}
