"use client";

import { useT } from "@/lib/i18n";
import { PageHeader } from "@/components/PageHeader";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { CTABanner } from "@/components/CTABanner";

export function PriserView() {
  const t = useT();
  return (
    <>
      <PageHeader eyebrow={t.priser.eyebrow} title={t.priser.title} intro={t.priser.intro} />

      <Section>
        <div className="mx-auto max-w-3xl">
          <Reveal>
            <div className="surface flex flex-col items-start gap-4 rounded-2xl p-8 sm:flex-row sm:items-center sm:justify-between sm:gap-8">
              <div>
                <h2 className="font-serif text-2xl font-medium leading-tight text-white sm:text-3xl">
                  {t.priser.rateEyebrow}
                </h2>
                <p className="mt-3 text-base text-mute">{t.priser.rateDesc}</p>
              </div>
              <p className="shrink-0 font-serif text-3xl font-semibold text-gradient-silver">
                {t.priser.rateValue}
                <span className="text-lg text-mute"> {t.priser.perHour}</span>
              </p>
            </div>
            <p className="mt-6 text-base leading-relaxed text-mute">{t.priser.lead}</p>
          </Reveal>

          <Reveal delay={0.1} className="mt-8 space-y-5 text-base leading-relaxed text-mute">
            {t.priser.paragraphs.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </Reveal>
        </div>
      </Section>

      <CTABanner
        title={t.priser.ctaTitle}
        subtitle={t.priser.ctaSubtitle}
        buttonLabel={t.common.bookConsultation}
      />
    </>
  );
}
