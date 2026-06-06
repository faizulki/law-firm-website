import type { Metadata } from "next";
import { ConsultationView } from "@/components/views/ConsultationView";

export const metadata: Metadata = {
  title: "Konsultation",
  description:
    "Boka din kostnadsfria 30-minuterskonsultation. Välj rättsområde, välj en tid som passar dig och dela några detaljer.",
};

export default function ConsultationPage() {
  return <ConsultationView />;
}
