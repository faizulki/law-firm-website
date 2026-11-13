"use client";

import { useLang } from "@/lib/i18n";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Stagger, RevealItem } from "@/components/ui/Reveal";
import { PracticeAreaCard } from "@/components/PracticeAreaCard";
import { CTABanner } from "@/components/CTABanner";
import { Hero } from "@/components/Hero";
import { differentiators, pick } from "@/lib/content";
import { useSiteData } from "@/lib/site-data";

export function HomeView() {
  const { t, lang } = useLang();
  const { practiceAreas } = useSiteData();

  return (
    <>
      <Hero />

      {/* Practice Areas Preview */}
      <Section>
        <SectionHeading
          eyebrow={t.home.practiceEyebrow}
          title={t.home.practiceTitle}
          intro={t.home.practiceIntro}
        />
        <Stagger className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {practiceAreas.map((area) => (
            <RevealItem key={area.slug} className="h-full">
              <PracticeAreaCard
                slug={area.slug}
                icon={area.icon}
                title={pick(area.title, lang)}
                short={pick(area.short, lang)}
                learnMore={t.common.learnMore}
              />
            </RevealItem>
          ))}
        </Stagger>
      </Section>

      {/* Why Choose Invictus Law */}
      <Section className="border-y border-steel/40 bg-ink-2">
        <SectionHeading
          eyebrow={t.home.whyEyebrow}
          title={t.home.whyTitle}
          intro={t.home.whyIntro}
        />

        <Stagger className="mt-14 grid gap-8 lg:grid-cols-3">
          {differentiators.map((item) => {
            const Icon = item.icon;
            return (
              <RevealItem key={pick(item.title, lang)}>
                <div className="surface surface-hover h-full rounded-2xl p-8">
                  <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl border border-silver/15 bg-white/[0.03] text-silver">
                    <Icon size={22} strokeWidth={1.5} />
                  </span>
                  <h3 className="mt-6 font-serif text-2xl font-medium text-white">
                    {pick(item.title, lang)}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-mute">
                    {pick(item.description, lang)}
                  </p>
                </div>
              </RevealItem>
            );
          })}
        </Stagger>
      </Section>

      <CTABanner />
    </>
  );
}
