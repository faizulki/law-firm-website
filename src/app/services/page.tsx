import type { Metadata } from "next";
import { ServicesView } from "@/components/views/ServicesView";

export const metadata: Metadata = {
  title: "Våra rättsområden",
  description:
    "Serveringstillstånd, personlig assistans och assistansersättning, socialförsäkringsrätt, socialrätt (SoL & LSS) samt överklagande av myndighetsbeslut.",
};

export default function ServicesPage() {
  return <ServicesView />;
}
