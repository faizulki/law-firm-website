"use client";

import Image from "next/image";
import { Scale } from "lucide-react";
import { useT } from "@/lib/i18n";
import { PageHeader } from "@/components/PageHeader";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { CTABanner } from "@/components/CTABanner";

export function AboutView() {
  const t = useT();
  return (
    <>
      <PageHeader eyebrow={t.about.eyebrow} title={t.about.title} intro={t.about.intro} />

      <Section>
        <div className="grid items-center gap-14 lg:grid-cols-2">
          <Reveal>
            <div className="space-y-5 text-base leading-relaxed text-mute">
              <p>{t.about.p1}</p>
              <p>{t.about.p2}</p>
              <p>{t.about.p3}</p>
            </div>
            <div className="mt-8">
              <Button href="/consultation">{t.common.bookConsultation}</Button>
            </div>
          </Reveal>

          <Reveal delay={0.1} className="relative">
            <div className="relative aspect-[4/5] overflow-hidden rounded-3xl border border-silver/10">
              <Image
                src="https://images.unsplash.com/photo-1505664194779-8beaceb93744?auto=format&fit=crop&w=1000&q=80"
                alt=""
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/60 to-transparent" />
            </div>
          </Reveal>
        </div>
      </Section>

      {/* Ledord */}
      <Section className="border-y border-steel/40 bg-ink-2">
        <Reveal className="mx-auto max-w-3xl text-center">
          <span className="mx-auto mb-8 inline-flex h-14 w-14 items-center justify-center rounded-2xl border border-silver/15 bg-white/[0.03] text-silver">
            <Scale size={26} strokeWidth={1.5} />
          </span>
          <p className="eyebrow mb-6 text-xs font-medium text-silver/80">
            {t.about.ledordEyebrow}
          </p>
          <p className="font-serif text-2xl font-medium leading-snug text-white sm:text-3xl">
            {t.about.ledordQuote}
          </p>
        </Reveal>

        <div className="mx-auto mt-12 grid max-w-4xl gap-6 sm:grid-cols-3">
          {t.about.ledord.map((word, i) => (
            <Reveal key={word} delay={i * 0.08}>
              <div className="surface surface-hover h-full rounded-2xl p-7 text-center">
                <span className="font-serif text-2xl text-silver/50">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-3 font-serif text-xl font-medium text-white">
                  {word}
                </h3>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      <CTABanner title={t.about.ctaTitle} subtitle={t.about.ctaSubtitle} />
    </>
  );
}
