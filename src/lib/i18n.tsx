"use client";

/**
 * Swedish / English internationalization for Invictus Law.
 *
 * LanguageProvider keeps the active language in React state (persisted to
 * localStorage, default Swedish) and sets <html lang>. Components read
 * strings with useT(). The dictionary data itself lives in dictionary.ts
 * (plain data, no "use client") so server code (content-store.ts) can read
 * it too; list content with its own { sv, en } fields lives in content.ts.
 */

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { dictionary, type Dict, type Lang } from "./dictionary";

export { dictionary, fmt } from "./dictionary";
export type { Dict, Lang };

type Ctx = { lang: Lang; setLang: (l: Lang) => void; t: Dict };

const LanguageContext = createContext<Ctx | null>(null);

export function LanguageProvider({
  children,
  dictionary: dictionaryProp,
}: {
  children: ReactNode;
  /** Merged dictionary (code defaults + any owner edits from /admin). Falls back to the static one. */
  dictionary?: typeof dictionary;
}) {
  const [lang, setLangState] = useState<Lang>("sv");
  const activeDictionary = dictionaryProp ?? dictionary;

  // One-time hydration of the saved language after mount.
  useEffect(() => {
    const saved = window.localStorage.getItem("invictus_lang") as Lang | null;
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (saved === "sv" || saved === "en") setLangState(saved);
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const setLang = useCallback((l: Lang) => {
    setLangState(l);
    window.localStorage.setItem("invictus_lang", l);
  }, []);

  const value: Ctx = { lang, setLang, t: activeDictionary[lang] as Dict };
  return (
    <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
  );
}

export function useLang(): Ctx {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLang must be used within LanguageProvider");
  return ctx;
}

export function useT(): Dict {
  return useLang().t;
}
