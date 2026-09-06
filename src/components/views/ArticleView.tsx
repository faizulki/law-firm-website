"use client";

import Link from "next/link";
import { useLang } from "@/lib/i18n";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import type { Article } from "@/lib/articles";

function formatDate(iso: string, locale: string) {
  try {
    return new Intl.DateTimeFormat(locale, { dateStyle: "long" }).format(new Date(iso));
  } catch {
    return iso;
  }
}

export function ArticleView({ article }: { article: Article }) {
  const { t } = useLang();

  return (
    <Section className="pt-36 sm:pt-44">
      <Reveal className="mx-auto max-w-3xl">
        <Link href="/blog" className="text-sm text-silver transition-colors hover:text-white">
          &larr; {t.blog.back}
        </Link>

        <span className="mt-8 block text-xs uppercase tracking-[0.18em] text-mute">
          {formatDate(article.publishedAt, t.locale)}
        </span>
        <h1 className="mt-3 font-serif text-3xl font-medium leading-tight text-white sm:text-4xl">
          {article.title}
        </h1>

        {article.coverImageUrl && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={article.coverImageUrl}
            alt=""
            className="mt-8 w-full rounded-2xl object-cover"
          />
        )}

        <div
          className="mt-8 space-y-5 text-base leading-relaxed text-mute [&_a]:text-silver [&_a:hover]:text-white [&_h2]:mt-8 [&_h2]:font-serif [&_h2]:text-2xl [&_h2]:font-medium [&_h2]:text-white [&_h3]:mt-6 [&_h3]:font-serif [&_h3]:text-xl [&_h3]:font-medium [&_h3]:text-white [&_img]:rounded-xl [&_ol]:list-decimal [&_ol]:pl-5 [&_strong]:text-white [&_ul]:list-disc [&_ul]:pl-5"
          dangerouslySetInnerHTML={{ __html: article.contentHtml }}
        />
      </Reveal>
    </Section>
  );
}
