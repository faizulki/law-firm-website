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
        <div className="grid items-start gap-14 lg:grid-cols-[1.05fr_1fr] lg:gap-16">
          <Reveal>
            <div className="space-y-10">
              {t.about.sections.map((s, i) => (
                <div key={i}>
                  <h2 className="font-serif text-2xl font-medium leading-snug text-white sm:text-3xl">
                    {s.heading}
                  </h2>
                  <div className="mt-4 space-y-4 text-base leading-relaxed text-mute">
                    {s.paragraphs.map((p, pi) => (
                      <p key={pi}>{p}</p>
                    ))}
                  </div>
                </div>
              ))}

              <blockquote className="surface relative rounded-2xl p-7 sm:p-8">
                <span
                  aria-hidden="true"
                  className="absolute left-5 top-2 font-serif text-5xl leading-none text-bronze/40"
                >
                  &ldquo;
                </span>
                <p className="font-serif text-xl italic leading-snug text-white sm:text-2xl">
                  {t.about.quote}
                </p>
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute bottom-0 right-5 font-serif text-5xl leading-none text-bronze/40"
                >
                  &rdquo;
                </span>
              </blockquote>

              <p className="text-base leading-relaxed text-mute">
                {t.about.closing}
              </p>

              <div>
                <Button href="/consultation">{t.common.bookConsultation}</Button>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.1} className="relative">
            <div className="relative aspect-[4/5] overflow-hidden rounded-3xl border border-silver/10 lg:sticky lg:top-28">
              <Image
                src="/gabriella-levin.jpg"
                alt="Gabriella Levin"
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
