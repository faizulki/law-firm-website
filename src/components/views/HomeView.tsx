"use client";

import { Quote, Star } from "lucide-react";
import { useLang } from "@/lib/i18n";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Reveal, Stagger, RevealItem } from "@/components/ui/Reveal";
import { PracticeAreaCard } from "@/components/PracticeAreaCard";
import { CTABanner } from "@/components/CTABanner";
import { Hero } from "@/components/Hero";
import {
  practiceAreas,
  stats,
  differentiators,
  testimonials,
  pick,
} from "@/lib/content";

export function HomeView() {
  const { t, lang } = useLang();

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

        {/* Statistics */}
        <Reveal className="mt-16 grid gap-px overflow-hidden rounded-2xl border border-steel/60 bg-steel/40 sm:grid-cols-3">
          {stats.map((stat) => (
            <div
              key={stat.value}
              className="flex flex-col items-center bg-ink-2 px-6 py-12 text-center"
            >
              <span className="font-serif text-5xl font-semibold text-gradient-silver sm:text-6xl">
                {stat.value}
              </span>
              <span className="mt-3 text-sm uppercase tracking-[0.18em] text-mute">
                {pick(stat.label, lang)}
              </span>
            </div>
          ))}
        </Reveal>
      </Section>

      {/* Testimonials */}
      <Section>
        <SectionHeading eyebrow={t.home.testEyebrow} title={t.home.testTitle} />
        <Stagger className="mt-14 grid gap-6 lg:grid-cols-3">
          {testimonials.map((tm) => (
            <RevealItem key={tm.name}>
              <figure className="surface surface-hover flex h-full flex-col rounded-2xl p-8">
                <Quote size={28} className="text-silver/40" />
                <blockquote className="mt-5 flex-1 text-base leading-relaxed text-white/90">
                  &ldquo;{pick(tm.quote, lang)}&rdquo;
                </blockquote>
                <div
                  className="mt-6 flex gap-0.5 text-silver"
                  aria-label="5/5"
                >
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} size={15} fill="currentColor" strokeWidth={0} />
                  ))}
                </div>
                <figcaption className="mt-4 border-t border-steel/60 pt-4">
                  <p className="font-medium text-white">{tm.name}</p>
                  <p className="text-sm text-mute">{pick(tm.role, lang)}</p>
                </figcaption>
              </figure>
            </RevealItem>
          ))}
        </Stagger>
      </Section>

      <CTABanner />
    </>
  );
}
