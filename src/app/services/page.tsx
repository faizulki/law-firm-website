import type { Metadata } from "next";
import { Check, CircleHelp } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { CTABanner } from "@/components/CTABanner";
import { practiceAreas } from "@/lib/content";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Explore Invictus Law's practice areas — corporate law, family law, real estate law, and litigation — with the depth of counsel each matter deserves.",
};

export default function ServicesPage() {
  return (
    <>
      <PageHeader
        eyebrow="Our Services"
        title="Comprehensive counsel, tailored to you"
        intro="Each practice area is led by attorneys with deep, focused experience. Explore how we can help you move forward."
      />

      {/* Quick nav */}
      <div className="border-b border-steel/40 bg-ink-2/60 backdrop-blur">
        <div className="mx-auto flex max-w-7xl flex-wrap gap-2 px-6 py-5 lg:px-8">
          {practiceAreas.map((area) => (
            <a
              key={area.slug}
              href={`#${area.slug}`}
              className="rounded-full border border-steel/60 px-4 py-1.5 text-sm text-mute transition-colors hover:border-silver/40 hover:text-white"
            >
              {area.title}
            </a>
          ))}
        </div>
      </div>

      {practiceAreas.map((area, index) => {
        const Icon = area.icon;
        const reversed = index % 2 === 1;
        return (
          <Section
            key={area.slug}
            id={area.slug}
            className={`scroll-mt-24 ${reversed ? "bg-ink-2 border-y border-steel/40" : ""}`}
          >
            <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
              {/* Intro column */}
              <Reveal className={reversed ? "lg:order-2" : ""}>
                <span className="inline-flex h-14 w-14 items-center justify-center rounded-2xl border border-silver/15 bg-white/[0.03] text-silver">
                  <Icon size={26} strokeWidth={1.5} />
                </span>
                <h2 className="mt-6 font-serif text-3xl font-medium text-white sm:text-4xl">
                  {area.title}
                </h2>
                <p className="mt-5 text-base leading-relaxed text-mute">
                  {area.description}
                </p>
                <div className="mt-8">
                  <Button href="/consultation" variant="secondary">
                    Discuss your matter
                  </Button>
                </div>
              </Reveal>

              {/* Detail column */}
              <Reveal delay={0.1} className={reversed ? "lg:order-1" : ""}>
                <div className="surface rounded-2xl p-8">
                  <h3 className="eyebrow text-xs font-medium text-silver/80">
                    How we help
                  </h3>
                  <ul className="mt-5 space-y-3">
                    {area.benefits.map((benefit) => (
                      <li key={benefit} className="flex gap-3 text-sm text-white/90">
                        <Check
                          size={18}
                          className="mt-0.5 shrink-0 text-silver"
                          strokeWidth={2}
                        />
                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>

                  <h3 className="eyebrow mt-8 text-xs font-medium text-silver/80">
                    Common client situations
                  </h3>
                  <ul className="mt-5 space-y-3">
                    {area.situations.map((situation) => (
                      <li key={situation} className="flex gap-3 text-sm text-mute">
                        <CircleHelp
                          size={18}
                          className="mt-0.5 shrink-0 text-silver/60"
                          strokeWidth={1.5}
                        />
                        <span>{situation}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            </div>
          </Section>
        );
      })}

      <CTABanner />
    </>
  );
}
