import type { Metadata } from "next";
import { PriserView } from "@/components/views/PriserView";

export const metadata: Metadata = {
  title: "Priser",
  description:
    "Vad kostar juridisk rådgivning? Rättshjälpstaxan, rättshjälp och rättsskydd samt kostnadsfritt offentligt biträde i LVU- och LVM-ärenden.",
};

export default function PriserPage() {
  return <PriserView />;
}
