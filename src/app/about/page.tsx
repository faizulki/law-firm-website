import type { Metadata } from "next";
import Image from "next/image";
import { Scale } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Om oss",
  description:
    "Vi är specialiserade på juridiken kring personlig assistans, assistansersättning samt övrig socialförsäkringsrätt, socialrätt och offentlig rätt.",
};

const ledord = ["Kvalitet", "Personligt engagemang", "Trygghet"];

export default function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="Om oss"
        title="Vi sätter människan i centrum för juridiken"
        intro="Vi är specialiserade på juridiken kring personlig assistans, assistansersättning och övrig socialförsäkringsrätt, socialrätt och offentlig rätt."
      />

      <Section>
        <div className="grid items-center gap-14 lg:grid-cols-2">
          <Reveal>
            <div className="space-y-5 text-base leading-relaxed text-mute">
              <p>
                Vi är specialiserade på juridiken kring personlig assistans,
                assistansersättning samt övrig socialförsäkringsrätt, socialrätt
                och offentlig rätt. Indragningar, minskningar och återkrav av
                tidigare beviljade myndighetsbeslut är ärenden vi arbetar mycket
                med. Vi arbetar även med socialrätt i form av beslut om stöd
                enligt Socialtjänstlagen, SoL.
              </p>
              <p>
                Vi har stor vana av att överklaga Försäkringskassans beslut och
                andra myndighetsbeslut.
              </p>
              <p>
                Vi sätter människan i centrum för juridiken och vi finner stor
                tillfredsställelse i att arbeta med juridiska frågor som berör.
              </p>
            </div>

            <div className="mt-8">
              <Button href="/consultation">Boka konsultation</Button>
            </div>
          </Reveal>

          <Reveal delay={0.1} className="relative">
            <div className="relative aspect-[4/5] overflow-hidden rounded-3xl border border-silver/10">
              <Image
                src="https://images.unsplash.com/photo-1505664194779-8beaceb93744?auto=format&fit=crop&w=1000&q=80"
                alt="Vårt kontor"
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
            Våra ledord
          </p>
          <p className="font-serif text-2xl font-medium leading-snug text-white sm:text-3xl">
            Våra ledord är kvalitet, personligt engagemang och trygghet.
          </p>
        </Reveal>

        <div className="mx-auto mt-12 grid max-w-4xl gap-6 sm:grid-cols-3">
          {ledord.map((word, i) => (
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
    </>
  );
}
