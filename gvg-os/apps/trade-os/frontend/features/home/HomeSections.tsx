import Link from "next/link";
import { FadeIn } from "@/components/atoms/FadeIn";
import { SectionHeading } from "@/components/atoms/SectionHeading";
import { Container } from "@/components/atoms/Container";
import { ProductCard } from "@/components/molecules/ProductCard";
import { TRADE_SERVICES } from "@/lib/constants";
import { categories, newsArticles, products } from "@/frontend/data/mock/catalog";

export function HomeServices() {
  return (
    <section className="bg-[var(--color-surface)] py-20 sm:py-24">
      <Container>
        <FadeIn>
          <SectionHeading
            eyebrow="Core modules"
            title="Trade operations in one OS"
            description="International trading, OEM/ODM, US purchasing, logistics, and AI procurement — unified for every role."
          />
        </FadeIn>
        <div className="grid gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
          {TRADE_SERVICES.map((service, index) => (
            <FadeIn key={service.id} delay={index * 0.05}>
              <article>
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--color-accent-strong)]">
                  {String(index + 1).padStart(2, "0")}
                </p>
                <h3 className="mt-3 font-[family-name:var(--font-display)] text-xl font-semibold text-[var(--color-ink)]">
                  {service.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-[var(--color-muted)]">
                  {service.description}
                </p>
              </article>
            </FadeIn>
          ))}
        </div>
      </Container>
    </section>
  );
}

export function HomeCategories() {
  return (
    <section className="py-20 sm:py-24">
      <Container>
        <FadeIn>
          <SectionHeading
            eyebrow="Categories"
            title="Verticals built for global sourcing"
            description="Health supplements, packaged foods, household goods, hardware, apparel, and more."
            href="/categories"
            linkLabel="Browse categories"
          />
        </FadeIn>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((category, index) => (
            <FadeIn key={category.id} delay={index * 0.04}>
              <Link
                href={`/categories/${category.slug}`}
                className="group block border-b border-[var(--color-line)] pb-5 transition-colors hover:border-[var(--color-accent)]"
              >
                <h3 className="font-[family-name:var(--font-display)] text-lg font-semibold text-[var(--color-ink)] group-hover:text-[var(--color-accent-strong)]">
                  {category.name}
                </h3>
                <p className="mt-2 text-sm text-[var(--color-muted)]">{category.description}</p>
                <p className="mt-4 text-xs font-medium uppercase tracking-[0.14em] text-[var(--color-muted)]">
                  {category.productCount} SKUs
                </p>
              </Link>
            </FadeIn>
          ))}
        </div>
      </Container>
    </section>
  );
}

export function HomeFeaturedProducts() {
  return (
    <section className="bg-[var(--color-mist)] py-20 sm:py-24">
      <Container>
        <FadeIn>
          <SectionHeading
            eyebrow="Catalog"
            title="Featured products ready to quote"
            description="MOQ, lead time, origin, and landed-cost workflows start from every SKU."
            href="/products"
            linkLabel="View all products"
          />
        </FadeIn>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {products.slice(0, 6).map((product, index) => (
            <FadeIn key={product.id} delay={index * 0.05}>
              <ProductCard product={product} />
            </FadeIn>
          ))}
        </div>
      </Container>
    </section>
  );
}

export function HomeCtaBand() {
  return (
    <section className="relative overflow-hidden bg-[var(--color-ink)] py-20 text-white sm:py-24">
      <div
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_left,rgba(26,122,109,0.35),transparent_50%)]"
        aria-hidden
      />
      <Container className="relative">
        <FadeIn>
          <SectionHeading
            light
            align="left"
            eyebrow="AI Procurement"
            title="Ask the assistant before you RFQ"
            description="Match suppliers, estimate landed cost, and draft RFQs with the GVG AI Procurement Assistant."
          />
          <Link
            href="/ai"
            className="inline-flex h-12 items-center bg-[var(--color-accent)] px-6 text-sm font-semibold text-white transition-colors hover:bg-[var(--color-accent-strong)]"
          >
            Open AI Assistant
          </Link>
        </FadeIn>
      </Container>
    </section>
  );
}

export function HomeNews() {
  return (
    <section className="py-20 sm:py-24">
      <Container>
        <FadeIn>
          <SectionHeading
            eyebrow="News"
            title="Trade insights & platform updates"
            href="/news"
            linkLabel="All news"
          />
        </FadeIn>
        <div className="grid gap-8 lg:grid-cols-3">
          {newsArticles.map((article, index) => (
            <FadeIn key={article.id} delay={index * 0.06}>
              <article className="border-t border-[var(--color-line)] pt-5">
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--color-accent-strong)]">
                  {article.category}
                </p>
                <h3 className="mt-3 font-[family-name:var(--font-display)] text-xl font-semibold text-[var(--color-ink)]">
                  <Link href={`/news/${article.slug}`} className="hover:text-[var(--color-accent-strong)]">
                    {article.title}
                  </Link>
                </h3>
                <p className="mt-2 text-sm text-[var(--color-muted)]">{article.excerpt}</p>
              </article>
            </FadeIn>
          ))}
        </div>
      </Container>
    </section>
  );
}
