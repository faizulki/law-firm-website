"use client";

import { createContext, useContext, useMemo, type ReactNode } from "react";
import type { site as SiteConfigValue } from "./site";
import { practiceAreas as staticPracticeAreas, type PracticeArea } from "./content";
import type { EditablePracticeArea } from "./content-store";

export type SiteConfig = typeof SiteConfigValue;

type ContextValue = {
  site: SiteConfig;
  practiceAreaOverrides: Record<string, EditablePracticeArea>;
};

const SiteDataContext = createContext<ContextValue | null>(null);

/**
 * Provides site config + practice-area text that may include owner edits
 * made via /admin. Populated server-side (see layout.tsx) so client
 * components that need this data (Footer, Logo, ContactView, BookingForm,
 * HomeView, ServicesView) read from context instead of the static
 * content.ts/site.ts exports directly.
 *
 * Practice-area icons (LucideIcon components) can't cross the Server ->
 * Client Component boundary, so only text overrides are passed through
 * context; icons are merged back in client-side from the static import.
 */
export function SiteDataProvider({
  site,
  practiceAreaOverrides,
  children,
}: ContextValue & { children: ReactNode }) {
  return (
    <SiteDataContext.Provider value={{ site, practiceAreaOverrides }}>
      {children}
    </SiteDataContext.Provider>
  );
}

export function useSiteData(): { site: SiteConfig; practiceAreas: PracticeArea[] } {
  const ctx = useContext(SiteDataContext);
  if (!ctx) throw new Error("useSiteData must be used within SiteDataProvider");

  const practiceAreas = useMemo(
    () =>
      staticPracticeAreas.map((area) => {
        const text = ctx.practiceAreaOverrides[area.slug];
        if (!text) return area;
        return { ...area, title: text.title, short: text.short, sections: text.sections };
      }),
    [ctx.practiceAreaOverrides]
  );

  return { site: ctx.site, practiceAreas };
}
