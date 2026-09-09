"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { LogOut, Save } from "lucide-react";
import type { EditableContent, EditableDict, EditablePracticeArea } from "@/lib/content-store";
import { Field, TextArea, StringList, ParagraphList, Collapsible } from "./fields";

type Lang = "sv" | "en";

async function fetchJson<T>(url: string, init?: RequestInit): Promise<T> {
  const res = await fetch(url, init);
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.error ?? `Request failed (${res.status})`);
  return data as T;
}

export function AdminEditor() {
  const router = useRouter();
  const [content, setContent] = useState<EditableContent | null>(null);
  const [lang, setLang] = useState<Lang>("sv");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [savedAt, setSavedAt] = useState<number | null>(null);

  useEffect(() => {
    fetchJson<EditableContent>("/api/admin/content")
      .then(setContent)
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  async function handleSave() {
    if (!content) return;
    setSaving(true);
    setError(null);
    try {
      await fetchJson("/api/admin/content", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(content),
      });
      setSavedAt(Date.now());
    } catch (e) {
      setError(e instanceof Error ? e.message : "Kunde inte spara");
    } finally {
      setSaving(false);
    }
  }

  async function handleLogout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  }

  if (loading) {
    return <p className="text-mute">Laddar innehåll…</p>;
  }

  if (!content) {
    return <p className="text-red-300">Kunde inte läsa innehållet. {error}</p>;
  }

  const dict = content.dictionary[lang];

  function updateSite<K extends keyof EditableContent["site"]>(
    key: K,
    value: EditableContent["site"][K]
  ) {
    setContent((c) => (c ? { ...c, site: { ...c.site, [key]: value } } : c));
  }

  function updateDict<S extends keyof EditableDict>(
    section: S,
    patch: Partial<EditableDict[S]>
  ) {
    setContent((c) => {
      if (!c) return c;
      return {
        ...c,
        dictionary: {
          ...c.dictionary,
          [lang]: {
            ...c.dictionary[lang],
            [section]: { ...c.dictionary[lang][section], ...patch },
          },
        },
      };
    });
  }

  function updateArea(slug: string, patch: Partial<EditablePracticeArea>) {
    setContent((c) => {
      if (!c) return c;
      return {
        ...c,
        practiceAreas: {
          ...c.practiceAreas,
          [slug]: { ...c.practiceAreas[slug], ...patch },
        },
      };
    });
  }

  return (
    <div className="space-y-8 pb-32">
      {/* Header bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-steel/40 pb-6">
        <div>
          <h1 className="font-serif text-2xl font-medium text-white">Redigera webbplatsen</h1>
          <p className="mt-1 text-sm text-mute">
            Ändringar sparas direkt på webbplatsen — ingen ny driftsättning behövs.
          </p>
        </div>
        <button
          type="button"
          onClick={handleLogout}
          className="inline-flex items-center gap-1.5 text-sm text-mute hover:text-white"
        >
          <LogOut size={15} /> Logga ut
        </button>
      </div>

      {/* Contact / company info — language independent */}
      <Collapsible title="Kontakt & företagsinfo" defaultOpen>
        <div className="grid gap-5 sm:grid-cols-2">
          <Field label="Namn" value={content.site.name} onChange={(v) => updateSite("name", v)} />
          <Field
            label="Slogan"
            value={content.site.tagline}
            onChange={(v) => updateSite("tagline", v)}
          />
        </div>
        <TextArea
          label="Beskrivning (används i sökmotorer)"
          value={content.site.description}
          onChange={(v) => updateSite("description", v)}
        />
        <div className="grid gap-5 sm:grid-cols-2">
          <Field label="E-post" value={content.site.email} onChange={(v) => updateSite("email", v)} />
          <Field
            label="Telefonnummer (visas)"
            value={content.site.phone}
            onChange={(v) => updateSite("phone", v)}
          />
          <Field
            label="Telefonlänk (tel:-format, t.ex. tel:+46701234567)"
            value={content.site.phoneHref}
            onChange={(v) => updateSite("phoneHref", v)}
          />
          <div />
          <Field
            label="Adress, rad 1"
            value={content.site.address.line1}
            onChange={(v) => updateSite("address", { ...content.site.address, line1: v })}
          />
          <Field
            label="Adress, rad 2"
            value={content.site.address.line2}
            onChange={(v) => updateSite("address", { ...content.site.address, line2: v })}
          />
          <Field
            label="LinkedIn-URL"
            value={content.site.social.linkedin}
            onChange={(v) => updateSite("social", { ...content.site.social, linkedin: v })}
          />
          <Field
            label="X (Twitter)-URL"
            value={content.site.social.x}
            onChange={(v) => updateSite("social", { ...content.site.social, x: v })}
          />
        </div>
      </Collapsible>

      {/* Language toggle for everything below */}
      <div className="sticky top-20 z-20 flex items-center gap-3 rounded-full border border-steel/60 bg-ink/90 p-1.5 backdrop-blur">
        <span className="pl-3 text-xs text-mute">Redigerar språk:</span>
        {(["sv", "en"] as Lang[]).map((l) => (
          <button
            key={l}
            type="button"
            onClick={() => setLang(l)}
            className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
              lang === l ? "bg-bronze text-ink" : "text-mute hover:text-white"
            }`}
          >
            {l === "sv" ? "Svenska" : "Engelska"}
          </button>
        ))}
      </div>

      {/* Page text sections */}
      <div className="space-y-4">
        <Collapsible title="Hero (startsidans topp)">
          <Field label="Eyebrow" value={dict.hero.eyebrow} onChange={(v) => updateDict("hero", { eyebrow: v })} />
          <div className="grid gap-5 sm:grid-cols-2">
            <Field label="Rubrik, rad 1" value={dict.hero.line1} onChange={(v) => updateDict("hero", { line1: v })} />
            <Field label="Rubrik, rad 2" value={dict.hero.line2} onChange={(v) => updateDict("hero", { line2: v })} />
          </div>
          <TextArea label="Ingress" value={dict.hero.sub} onChange={(v) => updateDict("hero", { sub: v })} />
          <div className="grid gap-5 sm:grid-cols-2">
            <Field
              label="Primär knapptext"
              value={dict.hero.ctaPrimary}
              onChange={(v) => updateDict("hero", { ctaPrimary: v })}
            />
            <Field
              label="Sekundär knapptext"
              value={dict.hero.ctaSecondary}
              onChange={(v) => updateDict("hero", { ctaSecondary: v })}
            />
          </div>
        </Collapsible>

        <Collapsible title="Startsida — övriga sektioner">
          <div className="grid gap-5 sm:grid-cols-2">
            <Field
              label="Rättsområden — eyebrow"
              value={dict.home.practiceEyebrow}
              onChange={(v) => updateDict("home", { practiceEyebrow: v })}
            />
            <Field
              label="Rättsområden — rubrik"
              value={dict.home.practiceTitle}
              onChange={(v) => updateDict("home", { practiceTitle: v })}
            />
          </div>
          <TextArea
            label="Rättsområden — ingress"
            value={dict.home.practiceIntro}
            onChange={(v) => updateDict("home", { practiceIntro: v })}
          />
          <div className="grid gap-5 sm:grid-cols-2">
            <Field
              label="Varför oss — eyebrow"
              value={dict.home.whyEyebrow}
              onChange={(v) => updateDict("home", { whyEyebrow: v })}
            />
            <Field
              label="Varför oss — rubrik"
              value={dict.home.whyTitle}
              onChange={(v) => updateDict("home", { whyTitle: v })}
            />
          </div>
          <TextArea
            label="Varför oss — ingress"
            value={dict.home.whyIntro}
            onChange={(v) => updateDict("home", { whyIntro: v })}
          />
          <div className="grid gap-5 sm:grid-cols-2">
            <Field
              label="Kundomdömen — eyebrow"
              value={dict.home.testEyebrow}
              onChange={(v) => updateDict("home", { testEyebrow: v })}
            />
            <Field
              label="Kundomdömen — rubrik"
              value={dict.home.testTitle}
              onChange={(v) => updateDict("home", { testTitle: v })}
            />
          </div>
        </Collapsible>

        <Collapsible title="Bokningsbanner (visas på flera sidor)">
          <Field label="Rubrik" value={dict.cta.title} onChange={(v) => updateDict("cta", { title: v })} />
          <TextArea
            label="Undertext"
            value={dict.cta.subtitle}
            onChange={(v) => updateDict("cta", { subtitle: v })}
          />
          <Field label="Knapptext" value={dict.cta.button} onChange={(v) => updateDict("cta", { button: v })} />
        </Collapsible>

        <Collapsible title="Om oss">
          <div className="grid gap-5 sm:grid-cols-2">
            <Field label="Eyebrow" value={dict.about.eyebrow} onChange={(v) => updateDict("about", { eyebrow: v })} />
            <Field label="Rubrik" value={dict.about.title} onChange={(v) => updateDict("about", { title: v })} />
          </div>
          <TextArea label="Ingress" value={dict.about.intro} onChange={(v) => updateDict("about", { intro: v })} />

          <div className="space-y-4 rounded-xl border border-steel/40 p-4">
            <span className="text-xs font-medium text-mute">Textavsnitt</span>
            {dict.about.sections.map((section, i) => (
              <div key={i} className="space-y-3 border-b border-steel/40 pb-4 last:border-0 last:pb-0">
                <Field
                  label={`Avsnitt ${i + 1} — rubrik`}
                  value={section.heading}
                  onChange={(v) => {
                    const next = [...dict.about.sections];
                    next[i] = { ...next[i], heading: v };
                    updateDict("about", { sections: next });
                  }}
                />
                <ParagraphList
                  label={`Avsnitt ${i + 1} — stycken`}
                  values={[...section.paragraphs]}
                  onChange={(v) => {
                    const next = [...dict.about.sections];
                    next[i] = { ...next[i], paragraphs: v };
                    updateDict("about", { sections: next });
                  }}
                />
              </div>
            ))}
          </div>

          <TextArea label="Citat" value={dict.about.quote} onChange={(v) => updateDict("about", { quote: v })} />
          <TextArea
            label="Avslutande text"
            value={dict.about.closing}
            onChange={(v) => updateDict("about", { closing: v })}
          />
          <div className="grid gap-5 sm:grid-cols-2">
            <Field
              label="Ledord — eyebrow"
              value={dict.about.ledordEyebrow}
              onChange={(v) => updateDict("about", { ledordEyebrow: v })}
            />
            <Field
              label="Ledord — citat"
              value={dict.about.ledordQuote}
              onChange={(v) => updateDict("about", { ledordQuote: v })}
            />
          </div>
          <StringList
            label="Ledord (kort ordlista)"
            values={[...dict.about.ledord]}
            onChange={(v) => updateDict("about", { ledord: v })}
            itemLabel="ord"
          />
          <div className="grid gap-5 sm:grid-cols-2">
            <Field
              label="Knappsektion — rubrik"
              value={dict.about.ctaTitle}
              onChange={(v) => updateDict("about", { ctaTitle: v })}
            />
            <Field
              label="Knappsektion — undertext"
              value={dict.about.ctaSubtitle}
              onChange={(v) => updateDict("about", { ctaSubtitle: v })}
            />
          </div>
        </Collapsible>

        <Collapsible title="Våra rättsområden (sidans intro)">
          <div className="grid gap-5 sm:grid-cols-2">
            <Field
              label="Eyebrow"
              value={dict.services.eyebrow}
              onChange={(v) => updateDict("services", { eyebrow: v })}
            />
            <Field label="Rubrik" value={dict.services.title} onChange={(v) => updateDict("services", { title: v })} />
          </div>
          <TextArea label="Ingress" value={dict.services.intro} onChange={(v) => updateDict("services", { intro: v })} />
          <div className="grid gap-5 sm:grid-cols-2">
            <Field
              label="Knappsektion — rubrik"
              value={dict.services.ctaTitle}
              onChange={(v) => updateDict("services", { ctaTitle: v })}
            />
            <Field
              label="Knappsektion — undertext"
              value={dict.services.ctaSubtitle}
              onChange={(v) => updateDict("services", { ctaSubtitle: v })}
            />
          </div>
        </Collapsible>

        <Collapsible title="Priser">
          <div className="grid gap-5 sm:grid-cols-2">
            <Field label="Eyebrow" value={dict.priser.eyebrow} onChange={(v) => updateDict("priser", { eyebrow: v })} />
            <Field label="Rubrik" value={dict.priser.title} onChange={(v) => updateDict("priser", { title: v })} />
          </div>
          <TextArea label="Ingress" value={dict.priser.intro} onChange={(v) => updateDict("priser", { intro: v })} />
          <div className="grid gap-5 sm:grid-cols-2">
            <Field
              label="Taxa — eyebrow"
              value={dict.priser.rateEyebrow}
              onChange={(v) => updateDict("priser", { rateEyebrow: v })}
            />
            <Field
              label="Taxa — värde (t.ex. 2 032 kr)"
              value={dict.priser.rateValue}
              onChange={(v) => updateDict("priser", { rateValue: v })}
            />
            <Field
              label="Taxa — enhet (t.ex. / timme)"
              value={dict.priser.perHour}
              onChange={(v) => updateDict("priser", { perHour: v })}
            />
          </div>
          <TextArea
            label="Taxa — beskrivning"
            value={dict.priser.rateDesc}
            onChange={(v) => updateDict("priser", { rateDesc: v })}
          />
          <TextArea label="Ingressstycke" value={dict.priser.lead} onChange={(v) => updateDict("priser", { lead: v })} />
          <ParagraphList
            label="Brödtext (stycken)"
            values={[...dict.priser.paragraphs]}
            onChange={(v) => updateDict("priser", { paragraphs: v })}
          />
          <div className="grid gap-5 sm:grid-cols-2">
            <Field
              label="Knappsektion — rubrik"
              value={dict.priser.ctaTitle}
              onChange={(v) => updateDict("priser", { ctaTitle: v })}
            />
            <Field
              label="Knappsektion — undertext"
              value={dict.priser.ctaSubtitle}
              onChange={(v) => updateDict("priser", { ctaSubtitle: v })}
            />
          </div>
        </Collapsible>

        <Collapsible title="Konsultation (sidans intro)">
          <div className="grid gap-5 sm:grid-cols-2">
            <Field
              label="Eyebrow"
              value={dict.consultation.eyebrow}
              onChange={(v) => updateDict("consultation", { eyebrow: v })}
            />
            <Field
              label="Rubrik"
              value={dict.consultation.title}
              onChange={(v) => updateDict("consultation", { title: v })}
            />
          </div>
          <TextArea
            label="Ingress"
            value={dict.consultation.intro}
            onChange={(v) => updateDict("consultation", { intro: v })}
          />
        </Collapsible>

        <Collapsible title="Kontakt (sidtext)">
          <div className="grid gap-5 sm:grid-cols-2">
            <Field label="Eyebrow" value={dict.contact.eyebrow} onChange={(v) => updateDict("contact", { eyebrow: v })} />
            <Field label="Rubrik" value={dict.contact.title} onChange={(v) => updateDict("contact", { title: v })} />
          </div>
          <TextArea label="Ingress" value={dict.contact.intro} onChange={(v) => updateDict("contact", { intro: v })} />
          <div className="grid gap-5 sm:grid-cols-2">
            <Field
              label="”Hör av dig” — rubrik"
              value={dict.contact.getInTouch}
              onChange={(v) => updateDict("contact", { getInTouch: v })}
            />
            <Field
              label="Kontor — etikett"
              value={dict.contact.office}
              onChange={(v) => updateDict("contact", { office: v })}
            />
          </div>
          <TextArea
            label="”Hör av dig” — text"
            value={dict.contact.getInTouchDesc}
            onChange={(v) => updateDict("contact", { getInTouchDesc: v })}
          />
          <div className="grid gap-5 sm:grid-cols-2">
            <Field
              label="Telefon — etikett"
              value={dict.contact.phone}
              onChange={(v) => updateDict("contact", { phone: v })}
            />
            <Field
              label="E-post — etikett"
              value={dict.contact.email}
              onChange={(v) => updateDict("contact", { email: v })}
            />
            <Field
              label="Öppettider — etikett"
              value={dict.contact.hours}
              onChange={(v) => updateDict("contact", { hours: v })}
            />
            <Field
              label="Karta — alt-text"
              value={dict.contact.mapTitle}
              onChange={(v) => updateDict("contact", { mapTitle: v })}
            />
          </div>
          <StringList
            label="Öppettider (rader)"
            values={[...dict.contact.hoursVal]}
            onChange={(v) => updateDict("contact", { hoursVal: v })}
            itemLabel="rad"
          />
          <div className="grid gap-5 sm:grid-cols-2">
            <Field
              label="Formulär — namnfält"
              value={dict.contact.formName}
              onChange={(v) => updateDict("contact", { formName: v })}
            />
            <Field
              label="Formulär — telefonfält"
              value={dict.contact.formPhone}
              onChange={(v) => updateDict("contact", { formPhone: v })}
            />
            <Field
              label="Formulär — e-postfält"
              value={dict.contact.formEmail}
              onChange={(v) => updateDict("contact", { formEmail: v })}
            />
            <Field
              label="Formulär — meddelandefält"
              value={dict.contact.howCanWeHelp}
              onChange={(v) => updateDict("contact", { howCanWeHelp: v })}
            />
          </div>
          <Field
            label="Formulär — platshållartext"
            value={dict.contact.messagePlaceholder}
            onChange={(v) => updateDict("contact", { messagePlaceholder: v })}
          />
          <Field
            label="Formulär — skicka-knapp"
            value={dict.contact.sendMessage}
            onChange={(v) => updateDict("contact", { sendMessage: v })}
          />
        </Collapsible>

        <Collapsible title="Sidfot">
          <TextArea
            label="Sloganrad"
            value={dict.footer.tagline}
            onChange={(v) => updateDict("footer", { tagline: v })}
          />
          <TextArea
            label="Marknadsföringsdisclaimer"
            value={dict.footer.advertising}
            onChange={(v) => updateDict("footer", { advertising: v })}
          />
        </Collapsible>
      </div>

      {/* Practice areas */}
      <div>
        <h2 className="mb-4 font-serif text-xl font-medium text-white">Rättsområden</h2>
        <div className="space-y-4">
          {Object.entries(content.practiceAreas).map(([slug, area]) => (
            <Collapsible key={slug} title={area.title[lang]} subtitle={slug}>
              <Field
                label="Titel"
                value={area.title[lang]}
                onChange={(v) => updateArea(slug, { title: { ...area.title, [lang]: v } })}
              />
              <TextArea
                label="Kort beskrivning (visas på startsidan)"
                value={area.short[lang]}
                onChange={(v) => updateArea(slug, { short: { ...area.short, [lang]: v } })}
              />

              <div className="space-y-4 rounded-xl border border-steel/40 p-4">
                <span className="text-xs font-medium text-mute">Textavsnitt</span>
                {area.sections.map((section, i) => (
                  <div key={i} className="space-y-3 border-b border-steel/40 pb-4 last:border-0 last:pb-0">
                    <Field
                      label={`Avsnitt ${i + 1} — rubrik (valfritt)`}
                      value={section.heading?.[lang] ?? ""}
                      onChange={(v) => {
                        const nextSections = [...area.sections];
                        nextSections[i] = {
                          ...nextSections[i],
                          heading: { ...(nextSections[i].heading ?? { sv: "", en: "" }), [lang]: v },
                        };
                        updateArea(slug, { sections: nextSections });
                      }}
                    />
                    <ParagraphList
                      label={`Avsnitt ${i + 1} — stycken`}
                      values={section.paragraphs.map((p) => p[lang])}
                      onChange={(values) => {
                        const nextSections = [...area.sections];
                        const nextParagraphs = values.map((v, pi) => ({
                          ...(nextSections[i].paragraphs[pi] ?? { sv: "", en: "" }),
                          [lang]: v,
                        }));
                        nextSections[i] = { ...nextSections[i], paragraphs: nextParagraphs };
                        updateArea(slug, { sections: nextSections });
                      }}
                    />
                    {section.bullets && (
                      <StringList
                        label={`Avsnitt ${i + 1} — punktlista`}
                        values={section.bullets.map((b) => b[lang])}
                        onChange={(values) => {
                          const nextSections = [...area.sections];
                          const nextBullets = values.map((v, bi) => ({
                            ...(nextSections[i].bullets?.[bi] ?? { sv: "", en: "" }),
                            [lang]: v,
                          }));
                          nextSections[i] = { ...nextSections[i], bullets: nextBullets };
                          updateArea(slug, { sections: nextSections });
                        }}
                        itemLabel="punkt"
                      />
                    )}
                    {section.closing && (
                      <TextArea
                        label={`Avsnitt ${i + 1} — avslutande text`}
                        value={section.closing[lang]}
                        onChange={(v) => {
                          const nextSections = [...area.sections];
                          nextSections[i] = {
                            ...nextSections[i],
                            closing: { ...nextSections[i].closing!, [lang]: v },
                          };
                          updateArea(slug, { sections: nextSections });
                        }}
                      />
                    )}
                  </div>
                ))}
              </div>
            </Collapsible>
          ))}
        </div>
      </div>

      {/* Save bar */}
      <div className="fixed inset-x-0 bottom-0 z-30 border-t border-steel/60 bg-ink/95 backdrop-blur">
        <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-6 py-4">
          <div className="text-sm">
            {error && <span className="text-red-300">{error}</span>}
            {!error && savedAt && <span className="text-mute">Sparat.</span>}
          </div>
          <button
            type="button"
            onClick={handleSave}
            disabled={saving}
            className="inline-flex items-center gap-2 rounded-full bg-silver px-6 py-2.5 text-sm font-medium text-ink transition-colors hover:bg-white disabled:opacity-50"
          >
            <Save size={15} /> {saving ? "Sparar…" : "Spara ändringar"}
          </button>
        </div>
      </div>
    </div>
  );
}
