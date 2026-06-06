"use client";

import { useT } from "@/lib/i18n";
import { PageHeader } from "@/components/PageHeader";
import { Section } from "@/components/ui/Section";
import { BookingForm } from "@/components/booking/BookingForm";

export function ConsultationView() {
  const t = useT();
  return (
    <>
      <PageHeader
        eyebrow={t.consultation.eyebrow}
        title={t.consultation.title}
        intro={t.consultation.intro}
      />
      <Section className="!pt-14">
        <BookingForm />
      </Section>
    </>
  );
}
