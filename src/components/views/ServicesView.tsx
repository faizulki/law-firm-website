"use client";

import { useLang } from "@/lib/i18n";
import { PageHeader } from "@/components/PageHeader";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { CTABanner } from "@/components/CTABanner";
import { practiceAreas, pick } from "@/lib/content";

export function ServicesView() {
  const { t, lang } = useLang();

  return (
    <>
      <PageHeader
        eyebrow={t.services.eyebrow}
        title={t.services.title}
        intro={t.services.intro}
      />

      {/* Quick nav */}
      <div className="sticky top-20 z-30 border-b border-steel/40 bg-ink/80 backdrop-blur">
        <div className="no-scrollbar mx-auto flex max-w-7xl flex-nowrap gap-2 overflow-x-auto px-6 py-4 lg:px-8 lg:flex-wrap lg:overflow-visible">
          {practiceAreas.map((area) => (
            <a
              key={area.slug}
              href={`#${area.slug}`}
              className="shrink-0 whitespace-nowrap rounded-full border border-steel/60 px-4 py-1.5 text-sm text-mute transition-colors hover:border-silver/40 hover:text-white"
            >
              {pick(area.title, lang)}
            </a>
          ))}
        </div>
      </div>

      {practiceAreas.map((area, index) => {
        const Icon = area.icon;
        return (
          <Section
            key={area.slug}
            id={area.slug}
            className={`scroll-mt-36 ${index % 2 === 1 ? "bg-ink-2 border-y border-steel/40" : ""}`}
          >
            <Reveal className="mx-auto max-w-3xl">
              <span className="inline-flex h-14 w-14 items-center justify-center rounded-2xl border border-silver/15 bg-white/[0.03] text-silver">
                <Icon size={26} strokeWidth={1.5} />
              </span>
              <h2 className="mt-6 font-serif text-3xl font-medium leading-tight text-white sm:text-4xl">
                {pick(area.title, lang)}
              </h2>

              <div className="mt-8 space-y-8">
                {area.sections.map((section, si) => (
                  <div key={si}>
                    {section.heading && (
                      <h3 className="font-serif text-xl font-medium text-silver">
                        {pick(section.heading, lang)}
                      </h3>
                    )}
                    <div className="mt-3 space-y-5 text-base leading-relaxed text-mute">
                      {section.paragraphs.map((p, pi) => (
                        <p key={pi}>{pick(p, lang)}</p>
                      ))}
                    </div>
                    {section.bullets && section.bullets.length > 0 && (
                      <ul className="mt-5 space-y-2 text-base leading-relaxed text-mute">
                        {section.bullets.map((b, bi) => (
                          <li key={bi} className="flex gap-3">
                            <span
                              aria-hidden="true"
                              className="mt-2 inline-block h-1 w-1 shrink-0 rounded-full bg-bronze"
                            />
                            <span>{pick(b, lang)}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                    {section.closing && (
                      <p className="mt-5 text-base leading-relaxed text-mute">
                        {pick(section.closing, lang)}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </Reveal>
          </Section>
        );
      })}

      <CTABanner
        title={t.services.ctaTitle}
        subtitle={t.services.ctaSubtitle}
        buttonLabel={t.common.bookConsultation}
      />
    </>
  );
}
