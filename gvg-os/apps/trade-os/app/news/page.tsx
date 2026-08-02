import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/atoms/Container";
import { PageHero } from "@/components/organisms/PageHero";
import { newsArticles } from "@/frontend/data/mock/catalog";
import { formatDate } from "@/lib/utils";

export const metadata: Metadata = {
  title: "News",
  description: "Trade insights, customs updates, and GVG platform news.",
};

export default function NewsPage() {
  return (
    <>
      <PageHero
        eyebrow="Module 17"
        title="News"
        description="Market insights and platform updates for buyers, suppliers, and logistics partners."
      />
      <section className="py-16">
        <Container className="grid gap-10 lg:grid-cols-3">
          {newsArticles.map((article) => (
            <article key={article.id} className="border-t border-[var(--color-line)] pt-5">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--color-accent-strong)]">
                {article.category}
              </p>
              <h2 className="mt-3 font-[family-name:var(--font-display)] text-xl font-semibold">
                <Link href={`/news/${article.slug}`} className="hover:text-[var(--color-accent-strong)]">
                  {article.title}
                </Link>
              </h2>
              <p className="mt-3 text-sm text-[var(--color-muted)]">{article.excerpt}</p>
              <p className="mt-4 text-xs text-[var(--color-muted)]">
                {formatDate(article.publishedAt)}
              </p>
            </article>
          ))}
        </Container>
      </section>
    </>
  );
}
