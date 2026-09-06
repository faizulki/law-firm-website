import type { Metadata } from "next";
import { BlogView } from "@/components/views/BlogView";
import { listArticles } from "@/lib/articles";

// Articles are published independently of deploys (via the Soro webhook),
// so this page must read fresh data on every request rather than being
// statically cached at build time.
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Blogg",
  description: "Nyheter, guider och juridiska insikter från Invictus Law.",
};

export default function BlogPage() {
  const articles = listArticles();
  return <BlogView articles={articles} />;
}
