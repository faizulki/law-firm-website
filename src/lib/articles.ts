import fs from "node:fs";
import path from "node:path";
import sanitizeHtml from "sanitize-html";

/**
 * File-backed article store for content published by external tools (Soro
 * SEO's webhook). Deliberately not a database — write volume is low (a
 * handful of articles a day at most) and this keeps the deploy simple.
 * The data file must live on a persisted volume (see docker-compose.yml)
 * so it survives container rebuilds.
 */

export type Article = {
  slug: string;
  title: string;
  excerpt: string;
  contentHtml: string;
  coverImageUrl: string | null;
  tags: string[];
  publishedAt: string; // ISO timestamp
  updatedAt: string; // ISO timestamp
  source: string;
};

const DATA_PATH =
  process.env.ARTICLES_DATA_PATH ??
  path.join(/*turbopackIgnore: true*/ process.cwd(), "data", "articles.json");

function readAll(): Article[] {
  try {
    const raw = fs.readFileSync(DATA_PATH, "utf-8");
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function writeAll(articles: Article[]) {
  fs.mkdirSync(path.dirname(DATA_PATH), { recursive: true });
  fs.writeFileSync(DATA_PATH, JSON.stringify(articles, null, 2), "utf-8");
}

export function listArticles(): Article[] {
  return readAll().sort((a, b) => +new Date(b.publishedAt) - +new Date(a.publishedAt));
}

export function getArticle(slug: string): Article | undefined {
  return readAll().find((a) => a.slug === slug);
}

function slugify(input: string): string {
  return input
    .toLowerCase()
    .normalize("NFKD")
    .replace(new RegExp("[\\u0300-\\u036f]", "g"), "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 96) || "article";
}

const SANITIZE_OPTIONS: sanitizeHtml.IOptions = {
  allowedTags: sanitizeHtml.defaults.allowedTags.concat(["img", "h1", "h2", "figure", "figcaption"]),
  allowedAttributes: {
    ...sanitizeHtml.defaults.allowedAttributes,
    img: ["src", "alt", "title", "width", "height"],
    a: ["href", "name", "target", "rel"],
  },
  allowedSchemes: ["http", "https", "mailto"],
};

function str(value: unknown): string | undefined {
  return typeof value === "string" && value.trim() ? value.trim() : undefined;
}

function stringArray(value: unknown): string[] {
  return Array.isArray(value) ? value.filter((v): v is string => typeof v === "string") : [];
}

/**
 * Maps a loosely-shaped incoming webhook payload onto our Article model.
 * Soro SEO's exact field names aren't publicly documented, so this checks
 * several common aliases. If Soro's real payload uses different keys,
 * check the "[soro-webhook] received fields" log line and adjust here.
 */
export function mapIncomingPayload(body: Record<string, unknown>): Omit<Article, "source"> {
  const title = str(body.title) ?? str(body.headline) ?? str(body.name);
  if (!title) throw new Error("Payload is missing a title");

  const rawHtml =
    str(body.content) ??
    str(body.contentHtml) ??
    str(body.html) ??
    str(body.body) ??
    str(body.article_html) ??
    "";

  const slugSeed = str(body.slug) ?? str(body.url_slug) ?? title;
  const now = new Date().toISOString();

  return {
    slug: slugify(slugSeed),
    title,
    excerpt:
      str(body.excerpt) ??
      str(body.summary) ??
      str(body.meta_description) ??
      str(body.description) ??
      "",
    contentHtml: sanitizeHtml(rawHtml, SANITIZE_OPTIONS),
    coverImageUrl:
      str(body.coverImageUrl) ??
      str(body.cover_image) ??
      str(body.featured_image) ??
      str(body.image) ??
      null,
    tags: stringArray(body.tags).length ? stringArray(body.tags) : stringArray(body.keywords),
    publishedAt: str(body.publishedAt) ?? str(body.published_at) ?? str(body.date) ?? now,
    updatedAt: now,
  };
}

/** Upsert by slug — a republish/update from Soro overwrites the existing article. */
export function upsertArticle(body: Record<string, unknown>): Article {
  const mapped = mapIncomingPayload(body);
  const articles = readAll();
  const existingIndex = articles.findIndex((a) => a.slug === mapped.slug);
  const article: Article = { ...mapped, source: "soro" };

  if (existingIndex >= 0) {
    article.publishedAt = articles[existingIndex].publishedAt;
    articles[existingIndex] = article;
  } else {
    articles.push(article);
  }

  writeAll(articles);
  return article;
}
