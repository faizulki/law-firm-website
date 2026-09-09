"use client";

import { Clock, Mail, MapPin, Phone, type LucideIcon } from "lucide-react";
import { useT } from "@/lib/i18n";
import { PageHeader } from "@/components/PageHeader";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { ContactForm } from "@/components/ContactForm";
import { useSiteData } from "@/lib/site-data";

export function ContactView() {
  const t = useT();
  const { site } = useSiteData();

  const details: {
    icon: LucideIcon;
    label: string;
    lines: string[];
    href?: string;
  }[] = [
    { icon: MapPin, label: t.contact.office, lines: [site.address.line1, site.address.line2] },
    { icon: Phone, label: t.contact.phone, lines: [site.phone], href: site.phoneHref },
    { icon: Mail, label: t.contact.email, lines: [site.email], href: `mailto:${site.email}` },
    { icon: Clock, label: t.contact.hours, lines: [...t.contact.hoursVal] },
  ];

  return (
    <>
      <PageHeader eyebrow={t.contact.eyebrow} title={t.contact.title} intro={t.contact.intro} />

      <Section className="!pt-16">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
          {/* Details */}
          <Reveal>
            <h2 className="font-serif text-3xl font-medium text-white">
              {t.contact.getInTouch}
            </h2>
            <p className="mt-4 max-w-md text-base leading-relaxed text-mute">
              {t.contact.getInTouchDesc}
            </p>

            <dl className="mt-10 grid gap-6 sm:grid-cols-2">
              {details.map((item) => {
                const Icon = item.icon;
                return (
                  <div key={item.label} className="flex gap-4">
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-silver/15 bg-white/[0.03] text-silver">
                      <Icon size={18} strokeWidth={1.5} />
                    </span>
                    <div>
                      <dt className="text-sm font-medium text-white">{item.label}</dt>
                      <dd className="mt-1 text-sm leading-relaxed text-mute">
                        {item.href ? (
                          <a href={item.href} className="transition-colors hover:text-white">
                            {item.lines.join(" ")}
                          </a>
                        ) : (
                          item.lines.map((line) => <div key={line}>{line}</div>)
                        )}
                      </dd>
                    </div>
                  </div>
                );
              })}
            </dl>

            {/* Map placeholder */}
            <div className="mt-10 overflow-hidden rounded-2xl border border-steel/60">
              <div className="relative aspect-[16/10] w-full">
                <iframe
                  title={t.contact.mapTitle}
                  src="https://www.openstreetmap.org/export/embed.html?bbox=12.9780%2C55.6125%2C12.9870%2C55.6165&layer=mapnik&marker=55.6143%2C12.9817"
                  className="absolute inset-0 h-full w-full opacity-80 [filter:grayscale(1)_invert(0.92)_contrast(0.9)]"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
                <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-steel/60" />
              </div>
            </div>
          </Reveal>

          {/* Form */}
          <Reveal delay={0.1}>
            <ContactForm />
          </Reveal>
        </div>
      </Section>
    </>
  );
}
