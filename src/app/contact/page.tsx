import type { Metadata } from "next";
import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { ContactForm } from "@/components/ContactForm";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with Invictus Law. Visit our New York office, call, or send us a message and we'll respond within one business day.",
};

const details = [
  {
    icon: MapPin,
    label: "Office",
    lines: [site.address.line1, site.address.line2],
  },
  {
    icon: Phone,
    label: "Phone",
    lines: [site.phone],
    href: site.phoneHref,
  },
  {
    icon: Mail,
    label: "Email",
    lines: [site.email],
    href: `mailto:${site.email}`,
  },
  {
    icon: Clock,
    label: "Hours",
    lines: ["Monday – Friday", "9:00 AM – 6:00 PM"],
  },
];

export default function ContactPage() {
  return (
    <>
      <PageHeader
        eyebrow="Contact"
        title="Let's start the conversation"
        intro="Whether you have a question or are ready to discuss your matter, our team is here to help."
      />

      <Section className="!pt-16">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
          {/* Details */}
          <Reveal>
            <h2 className="font-serif text-3xl font-medium text-white">
              Get in touch
            </h2>
            <p className="mt-4 max-w-md text-base leading-relaxed text-mute">
              Reach us directly or send a message using the form. We respond to
              every inquiry within one business day.
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
                      <dt className="text-sm font-medium text-white">
                        {item.label}
                      </dt>
                      <dd className="mt-1 text-sm leading-relaxed text-mute">
                        {item.href ? (
                          <a
                            href={item.href}
                            className="transition-colors hover:text-white"
                          >
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
                  title="Map showing Invictus Law office location"
                  src="https://www.openstreetmap.org/export/embed.html?bbox=-74.0100%2C40.7400%2C-73.9850%2C40.7550&layer=mapnik"
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
