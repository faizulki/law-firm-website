import type { Metadata } from "next";
import { LegalView } from "@/components/views/LegalView";

export const metadata: Metadata = {
  title: "Användarvillkor",
  description: "Villkoren som reglerar din användning av Invictus Laws webbplats.",
};

export default function TermsPage() {
  return <LegalView which="terms" />;
}
