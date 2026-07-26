import type { Metadata } from "next";
import { Container } from "@/components/atoms/Container";
import { PageHero } from "@/components/organisms/PageHero";

export const metadata: Metadata = {
  title: "CMS",
  description: "Content management for marketplace pages, news, and campaigns.",
};

const BLOCKS = [
  { title: "Landing pages", status: "Published", updated: "2026-07-20" },
  { title: "Category banners", status: "Draft", updated: "2026-07-22" },
  { title: "Newsroom templates", status: "Published", updated: "2026-07-18" },
  { title: "Supplier onboarding copy", status: "In review", updated: "2026-07-23" },
];

export default function CmsPage() {
  return (
    <>
      <PageHero
        eyebrow="Module 16"
        title="CMS"
        description="Manage marketing surfaces, newsroom content, and localized campaign blocks."
      />
      <section className="py-16">
        <Container className="grid gap-6 sm:grid-cols-2">
          {BLOCKS.map((block) => (
            <article key={block.title} className="border-t border-[var(--color-line)] pt-5">
              <h2 className="font-[family-name:var(--font-display)] text-xl font-semibold">
                {block.title}
              </h2>
              <p className="mt-2 text-sm text-[var(--color-muted)]">
                {block.status} · Updated {block.updated}
              </p>
            </article>
          ))}
        </Container>
      </section>
    </>
  );
}
