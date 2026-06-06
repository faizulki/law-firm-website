import type { Metadata } from "next";
import { LegalView } from "@/components/views/LegalView";

export const metadata: Metadata = {
  title: "Integritetspolicy",
  description: "Hur Invictus Law samlar in, använder och skyddar dina uppgifter.",
};

export default function PrivacyPage() {
  return <LegalView which="privacy" />;
}
