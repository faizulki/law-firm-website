import type { Metadata } from "next";
import { ContactView } from "@/components/views/ContactView";

export const metadata: Metadata = {
  title: "Kontakt",
  description:
    "Kontakta Invictus Law. Hör av dig med en fråga eller boka ett möte — vi svarar inom en arbetsdag.",
};

export default function ContactPage() {
  return <ContactView />;
}
