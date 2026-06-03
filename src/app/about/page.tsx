import type { Metadata } from "next";
import Image from "next/image";
import { Scale } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Reveal, Stagger, RevealItem } from "@/components/ui/Reveal";
import { CTABanner } from "@/components/CTABanner";
import { attorneys, coreValues, stats } from "@/lib/content";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Meet the attorneys behind Invictus Law — a firm founded on integrity, excellence, and unwavering advocacy for our clients.",
};

export default function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="About the Firm"
        title="A modern firm, a timeless standard"
        intro="Invictus Law was founded to prove that elite legal counsel can be strategic, accessible, and deeply personal. We represent clients who refuse to settle for less."
      />

      {/* Firm Overview */}
      <Section>
        <div className="grid items-center gap-14 lg:grid-cols-2">
          <Reveal>
            <p className="eyebrow mb-4 text-xs font-medium text-silver/80">
              Firm Overview
            </p>
            <h2 className="font-serif text-3xl font-medium leading-tight text-white sm:text-4xl">
              Counsel forged in the courtroom and the boardroom
            </h2>
            <div className="mt-6 space-y-5 text-base leading-relaxed text-mute">
              <p>
                For more than fifteen years, Invictus Law has guided individuals
                and businesses through their most consequential legal matters.
                From boardroom negotiations to high-stakes litigation, our
                attorneys bring the rare combination of technical mastery and
                genuine advocacy that complex matters demand.
              </p>
              <p>
                We built this firm on a single conviction: that clients deserve
                a lawyer who is both a trusted advisor and a relentless
                champion. That philosophy shapes everything — how we listen, how
                we strategize, and how we fight for the outcomes that matter to
                you.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.1} className="relative">
            <div className="relative aspect-[4/5] overflow-hidden rounded-3xl border border-silver/10">
              <Image
                src="https://images.unsplash.com/photo-1505664194779-8beaceb93744?auto=format&fit=crop&w=1000&q=80"
                alt="The Invictus Law office library"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/60 to-transparent" />
            </div>
          </Reveal>
        </div>

        {/* Stats strip */}
        <Reveal className="mt-16 grid gap-px overflow-hidden rounded-2xl border border-steel/60 bg-steel/40 sm:grid-cols-3">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="flex flex-col items-center bg-ink px-6 py-10 text-center"
            >
              <span className="font-serif text-4xl font-semibold text-gradient-silver sm:text-5xl">
                {stat.value}
              </span>
              <span className="mt-2 text-xs uppercase tracking-[0.18em] text-mute">
                {stat.label}
              </span>
            </div>
          ))}
        </Reveal>
      </Section>

      {/* Mission Statement */}
      <Section className="border-y border-steel/40 bg-ink-2">
        <Reveal className="mx-auto max-w-4xl text-center">
          <span className="mx-auto mb-8 inline-flex h-14 w-14 items-center justify-center rounded-2xl border border-silver/15 bg-white/[0.03] text-silver">
            <Scale size={26} strokeWidth={1.5} />
          </span>
          <p className="eyebrow mb-6 text-xs font-medium text-silver/80">
            Our Mission
          </p>
          <p className="font-serif text-2xl font-medium leading-snug text-white sm:text-3xl lg:text-4xl">
            To deliver legal representation of the highest caliber — strategic,
            principled, and unwavering — so that every client we serve can move
            forward with clarity, confidence, and the full weight of the law
            behind them.
          </p>
        </Reveal>
      </Section>

      {/* Core Values */}
      <Section>
        <SectionHeading
          eyebrow="Core Values"
          title="The principles that define us"
          intro="They are not words on a wall. They are the standard we hold ourselves to in every matter we accept."
        />
        <Stagger className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {coreValues.map((value, i) => (
            <RevealItem key={value.title}>
              <div className="surface surface-hover h-full rounded-2xl p-7">
                <span className="font-serif text-2xl text-silver/50">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-4 font-serif text-xl font-medium text-white">
                  {value.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-mute">
                  {value.description}
                </p>
              </div>
            </RevealItem>
          ))}
        </Stagger>
      </Section>

      {/* Attorney Profiles */}
      <Section className="border-t border-steel/40 bg-ink-2">
        <SectionHeading
          eyebrow="Our Attorneys"
          title="Meet the people behind the practice"
          intro="Accomplished advocates who treat your objectives as their own."
        />
        <Stagger className="mt-14 grid gap-8 lg:grid-cols-3">
          {attorneys.map((attorney) => (
            <RevealItem key={attorney.name}>
              <article className="surface surface-hover group h-full overflow-hidden rounded-2xl">
                <div className="relative aspect-[4/5] overflow-hidden">
                  <Image
                    src={attorney.image}
                    alt={`Portrait of ${attorney.name}`}
                    fill
                    sizes="(max-width: 1024px) 100vw, 33vw"
                    className="object-cover grayscale transition-all duration-700 group-hover:grayscale-0"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink-2 via-transparent to-transparent" />
                </div>
                <div className="p-7">
                  <h3 className="font-serif text-2xl font-medium text-white">
                    {attorney.name}
                  </h3>
                  <p className="mt-1 text-sm font-medium text-silver">
                    {attorney.role}
                  </p>
                  <p className="text-sm text-mute">{attorney.focus}</p>
                  <p className="mt-4 text-sm leading-relaxed text-mute">
                    {attorney.bio}
                  </p>
                  <p className="mt-5 border-t border-steel/60 pt-4 text-xs uppercase tracking-wider text-mute/80">
                    {attorney.bar}
                  </p>
                </div>
              </article>
            </RevealItem>
          ))}
        </Stagger>
      </Section>

      <CTABanner
        title="Let's discuss your matter"
        subtitle="Schedule a confidential consultation with one of our attorneys today."
      />
    </>
  );
}
