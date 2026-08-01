import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/atoms/Button";
import { Badge } from "@/components/atoms/Badge";
import { Container } from "@/components/atoms/Container";
import { PageHero } from "@/components/organisms/PageHero";
import { products } from "@/frontend/data/mock/catalog";
import { formatCurrency } from "@/lib/utils";

interface ProductDetailPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({
  params,
}: ProductDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = products.find((item) => item.slug === slug);
  if (!product) return { title: "Product" };
  return {
    title: product.name,
    description: product.description,
  };
}

export default async function ProductDetailPage({ params }: ProductDetailPageProps) {
  const { slug } = await params;
  const product = products.find((item) => item.slug === slug);
  if (!product) notFound();

  return (
    <>
      <PageHero
        compact
        eyebrow={product.sku}
        title={product.name}
        description={product.description}
      >
        <div className="flex flex-wrap gap-2">
          {product.tags.map((tag) => (
            <Badge key={tag} className="bg-white/15 text-white">
              {tag}
            </Badge>
          ))}
        </div>
      </PageHero>
      <section className="py-16">
        <Container className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr]">
          <div
            className={`aspect-[16/10] bg-gradient-to-br ${product.imageGradient}`}
            aria-hidden
          />
          <div>
            <dl className="space-y-4 text-sm">
              <div className="flex justify-between border-b border-[var(--color-line)] pb-3">
                <dt className="text-[var(--color-muted)]">Brand</dt>
                <dd className="font-semibold text-[var(--color-ink)]">{product.brandName}</dd>
              </div>
              <div className="flex justify-between border-b border-[var(--color-line)] pb-3">
                <dt className="text-[var(--color-muted)]">Origin</dt>
                <dd className="font-semibold text-[var(--color-ink)]">{product.originCountry}</dd>
              </div>
              <div className="flex justify-between border-b border-[var(--color-line)] pb-3">
                <dt className="text-[var(--color-muted)]">Unit price</dt>
                <dd className="font-semibold text-[var(--color-ink)]">
                  {formatCurrency(product.unitPrice, product.currency)}
                </dd>
              </div>
              <div className="flex justify-between border-b border-[var(--color-line)] pb-3">
                <dt className="text-[var(--color-muted)]">MOQ</dt>
                <dd className="font-semibold text-[var(--color-ink)]">
                  {product.moq.toLocaleString()}
                </dd>
              </div>
              <div className="flex justify-between border-b border-[var(--color-line)] pb-3">
                <dt className="text-[var(--color-muted)]">Lead time</dt>
                <dd className="font-semibold text-[var(--color-ink)]">
                  {product.leadTimeDays} days
                </dd>
              </div>
              <div className="flex justify-between pb-3">
                <dt className="text-[var(--color-muted)]">Availability</dt>
                <dd className="font-semibold text-[var(--color-ink)]">
                  {product.inStock ? "In stock" : "Made to order"}
                </dd>
              </div>
            </dl>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/rfq">
                <Button>Request quote</Button>
              </Link>
              <Link href="/ai">
                <Button variant="outline">Ask AI Assistant</Button>
              </Link>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
