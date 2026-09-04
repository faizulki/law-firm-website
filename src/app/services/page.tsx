import type { Metadata } from "next";
import { ServicesView } from "@/components/views/ServicesView";

export const metadata: Metadata = {
  title: "Våra rättsområden",
  description:
    "Serveringstillstånd, personlig assistans (LSS) och socialförsäkringsrätt, socialrätt, tillståndsärenden, migrationsrätt, förvaltningsrätt, medicinalrätt och familjerätt.",
};

export default function ServicesPage() {
  return <ServicesView />;
}
