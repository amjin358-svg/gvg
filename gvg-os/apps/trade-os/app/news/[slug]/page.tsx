import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Container } from "@/components/atoms/Container";
import { PageHero } from "@/components/organisms/PageHero";
import { newsArticles } from "@/frontend/data/mock/catalog";
import { formatDate } from "@/lib/utils";

interface NewsDetailProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return newsArticles.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({ params }: NewsDetailProps): Promise<Metadata> {
  const { slug } = await params;
  const article = newsArticles.find((item) => item.slug === slug);
  if (!article) return { title: "News" };
  return { title: article.title, description: article.excerpt };
}

export default async function NewsDetailPage({ params }: NewsDetailProps) {
  const { slug } = await params;
  const article = newsArticles.find((item) => item.slug === slug);
  if (!article) notFound();

  return (
    <>
      <PageHero
        compact
        eyebrow={article.category}
        title={article.title}
        description={article.excerpt}
      />
      <section className="py-16">
        <Container className="max-w-3xl">
          <p className="text-sm text-[var(--color-muted)]">
            Published {formatDate(article.publishedAt)}
          </p>
          <div className="mt-6 space-y-4 text-base leading-relaxed text-[var(--color-ink)]">
            <p>
              {article.excerpt} GVG Global Trade OS connects procurement, logistics, and
              customs workflows so teams can act on market signals without leaving the
              platform.
            </p>
            <p>
              This article is part of the CMS-managed newsroom. In production, content is
              authored in the CMS module with SEO metadata, localization, and GEO-ready
              structured data.
            </p>
          </div>
        </Container>
      </section>
    </>
  );
}
