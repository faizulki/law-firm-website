import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { Section } from "@/components/ui/Section";
import { BookingForm } from "@/components/booking/BookingForm";

export const metadata: Metadata = {
  title: "Konsultation",
  description:
    "Boka din kostnadsfria 30-minuterskonsultation. Välj rättsområde, välj en tid som passar dig och dela några detaljer.",
};

export default function ConsultationPage() {
  return (
    <>
      <PageHeader
        eyebrow="Boka en konsultation"
        title="Boka din kostnadsfria 30-minuterskonsultation"
        intro="Tre snabba steg. Välj din tjänst, välj en tid som passar dig och dela några detaljer – vi tar det därifrån."
      />
      <Section className="!pt-14">
        <BookingForm />
      </Section>
    </>
  );
}
