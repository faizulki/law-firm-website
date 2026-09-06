"use client";

import Link from "next/link";
import { useLang } from "@/lib/i18n";
import { PageHeader } from "@/components/PageHeader";
import { Section } from "@/components/ui/Section";
import { Stagger, RevealItem } from "@/components/ui/Reveal";
import type { Article } from "@/lib/articles";

function formatDate(iso: string, locale: string) {
  try {
    return new Intl.DateTimeFormat(locale, { dateStyle: "long" }).format(new Date(iso));
  } catch {
    return iso;
  }
}

export function BlogView({ articles }: { articles: Article[] }) {
  const { t } = useLang();

  return (
    <>
      <PageHeader eyebrow={t.blog.eyebrow} title={t.blog.title} intro={t.blog.intro} />

      <Section>
        {articles.length === 0 ? (
          <p className="text-center text-mute">{t.blog.empty}</p>
        ) : (
          <Stagger className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {articles.map((article) => (
              <RevealItem key={article.slug} className="h-full">
                <Link
                  href={`/blog/${article.slug}`}
                  className="surface surface-hover group flex h-full flex-col overflow-hidden rounded-2xl"
                >
                  {article.coverImageUrl && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={article.coverImageUrl}
                      alt=""
                      className="h-44 w-full object-cover"
                    />
                  )}
                  <div className="flex flex-1 flex-col p-6">
                    <span className="text-xs uppercase tracking-[0.18em] text-mute">
                      {formatDate(article.publishedAt, t.locale)}
                    </span>
                    <h3 className="mt-3 font-serif text-xl font-medium text-white">
                      {article.title}
                    </h3>
                    {article.excerpt && (
                      <p className="mt-2 flex-1 text-sm leading-relaxed text-mute">
                        {article.excerpt}
                      </p>
                    )}
                    <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-silver transition-colors group-hover:text-white">
                      {t.common.readMore}
                    </span>
                  </div>
                </Link>
              </RevealItem>
            ))}
          </Stagger>
        )}
      </Section>
    </>
  );
}
