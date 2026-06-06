import type { Metadata } from "next";
import { AboutView } from "@/components/views/AboutView";

export const metadata: Metadata = {
  title: "Om oss",
  description:
    "Vi är specialiserade på juridiken kring personlig assistans, assistansersättning, socialförsäkringsrätt, socialrätt och offentlig rätt.",
};

export default function AboutPage() {
  return <AboutView />;
}
