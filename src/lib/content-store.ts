import fs from "node:fs";
import path from "node:path";
import { site } from "./site";
import { dictionary, type Dict } from "./dictionary";
import { practiceAreas, type PracticeArea } from "./content";

/**
 * Owner-editable site content, stored as a JSON overlay on top of the code
 * defaults (site.ts / i18n.tsx / content.ts). Only the fields listed here
 * can be changed from /admin — things like nav hrefs, icons, and slugs stay
 * fixed in code since editing them wrong could break the site's structure.
 *
 * Same pattern as articles.ts: a file on the persisted Docker volume, not a
 * database — this is single-owner, low-write-volume content.
 */

export type EditableSite = {
  name: string;
  tagline: string;
  description: string;
  email: string;
  phone: string;
  phoneHref: string;
  address: { line1: string; line2: string };
  social: { linkedin: string; x: string };
};

export type EditableDict = Pick<
  Dict,
  "hero" | "home" | "cta" | "about" | "services" | "priser" | "consultation" | "contact" | "footer"
>;

export type EditablePracticeArea = Omit<PracticeArea, "slug" | "icon">;

export type EditableContent = {
  site: EditableSite;
  dictionary: { sv: EditableDict; en: EditableDict };
  practiceAreas: Record<string, EditablePracticeArea>;
};

const OVERRIDES_PATH =
  process.env.CONTENT_OVERRIDES_PATH ??
  path.join(/*turbopackIgnore: true*/ process.cwd(), "data", "content-overrides.json");

function pickDictSection(dict: Dict): EditableDict {
  const { hero, home, cta, about, services, priser, consultation, contact, footer } = dict;
  return { hero, home, cta, about, services, priser, consultation, contact, footer };
}

function getDefaultEditableContent(): EditableContent {
  const areas: Record<string, EditablePracticeArea> = {};
  for (const area of practiceAreas) {
    areas[area.slug] = { title: area.title, short: area.short, sections: area.sections };
  }

  return {
    site: {
      name: site.name,
      tagline: site.tagline,
      description: site.description,
      email: site.email,
      phone: site.phone,
      phoneHref: site.phoneHref,
      address: { ...site.address },
      social: { ...site.social },
    },
    dictionary: {
      sv: pickDictSection(dictionary.sv as Dict),
      en: pickDictSection(dictionary.en as Dict),
    },
    practiceAreas: areas,
  };
}

/** Deep-merges `override` onto `base`. Arrays are replaced wholesale, not index-merged. */
function deepMerge<T>(base: T, override: unknown): T {
  if (override === null || override === undefined) return base;
  if (Array.isArray(base) || Array.isArray(override)) {
    return (override as T) ?? base;
  }
  if (typeof base === "object" && base !== null && typeof override === "object") {
    const result: Record<string, unknown> = { ...(base as Record<string, unknown>) };
    for (const key of Object.keys(override as Record<string, unknown>)) {
      result[key] = deepMerge(
        (base as Record<string, unknown>)[key],
        (override as Record<string, unknown>)[key]
      );
    }
    return result as T;
  }
  return (override as T) ?? base;
}

function readOverrides(): Partial<EditableContent> | null {
  try {
    const raw = fs.readFileSync(OVERRIDES_PATH, "utf-8");
    const parsed = JSON.parse(raw);
    return typeof parsed === "object" && parsed !== null ? parsed : null;
  } catch {
    return null;
  }
}

function writeOverrides(overrides: EditableContent) {
  fs.mkdirSync(path.dirname(OVERRIDES_PATH), { recursive: true });
  fs.writeFileSync(OVERRIDES_PATH, JSON.stringify(overrides, null, 2), "utf-8");
}

/** Current effective editable content (overrides merged onto defaults) — what the admin form loads. */
export function getEditableContent(): EditableContent {
  return deepMerge(getDefaultEditableContent(), readOverrides());
}

function isPlainObject(v: unknown): v is Record<string, unknown> {
  return typeof v === "object" && v !== null && !Array.isArray(v);
}

/** Validates the shape well enough to avoid corrupting the store; not exhaustive. */
export function saveEditableContent(input: unknown): EditableContent {
  if (!isPlainObject(input)) throw new Error("Expected a JSON object");
  const { site: siteInput, dictionary: dictInput, practiceAreas: areasInput } = input;

  if (!isPlainObject(siteInput)) throw new Error("Missing site info");
  if (!isPlainObject(dictInput) || !isPlainObject(dictInput.sv) || !isPlainObject(dictInput.en)) {
    throw new Error("Missing dictionary.sv / dictionary.en");
  }
  if (!isPlainObject(areasInput)) throw new Error("Missing practiceAreas");

  const validSlugs = new Set(practiceAreas.map((a) => a.slug));
  for (const slug of Object.keys(areasInput)) {
    if (!validSlugs.has(slug)) {
      throw new Error(`Unknown practice area slug: ${slug}`);
    }
  }

  const content = input as EditableContent;
  writeOverrides(content);
  return content;
}

/** Effective site config for rendering — code defaults with any owner edits applied. */
export function getEffectiveSite(): typeof site {
  const overrides = readOverrides();
  return deepMerge(site, overrides?.site);
}

/** Effective bilingual dictionary for rendering — code defaults with any owner edits applied. */
export function getEffectiveDictionary(): typeof dictionary {
  const overrides = readOverrides();
  return {
    sv: deepMerge(dictionary.sv, overrides?.dictionary?.sv),
    en: deepMerge(dictionary.en, overrides?.dictionary?.en),
  };
}

/**
 * Effective practice-area TEXT only (no icon component) — merged defaults +
 * owner edits, keyed by slug. Icons are LucideIcon components and can't be
 * passed from a Server Component into a Client Component context, so
 * callers that need the full PracticeArea (with icon) should merge this
 * onto the statically-imported `practiceAreas` client-side (see site-data.tsx).
 */
export function getEffectivePracticeAreaText(): Record<string, EditablePracticeArea> {
  const overrides = readOverrides();
  const result: Record<string, EditablePracticeArea> = {};
  for (const area of practiceAreas) {
    const override = overrides?.practiceAreas?.[area.slug];
    result[area.slug] = {
      title: deepMerge(area.title, override?.title),
      short: deepMerge(area.short, override?.short),
      sections: override?.sections ?? area.sections,
    };
  }
  return result;
}
