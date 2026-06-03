import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { Section } from "@/components/ui/Section";
import { BookingForm } from "@/components/booking/BookingForm";

export const metadata: Metadata = {
  title: "Book a Consultation",
  description:
    "Schedule your free 30-minute consultation with Invictus Law. Choose a practice area, pick a time, and tell us about your matter.",
};

export default function ConsultationPage() {
  return (
    <>
      <PageHeader
        eyebrow="Book a Consultation"
        title="Schedule your free 30-minute consultation"
        intro="Three quick steps. Choose your service, pick a time that suits you, and share a few details — we'll take it from there."
      />
      <Section className="!pt-14">
        <BookingForm />
      </Section>
    </>
  );
}
