import Link from "next/link";
import { Badge } from "@/components/atoms/Badge";
import { formatCurrency } from "@/lib/utils";
import type { Product } from "@/types";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <Link
      href={`/products/${product.slug}`}
      className="group block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)]"
    >
      <article className="overflow-hidden">
        <div
          className={`relative aspect-[4/3] bg-gradient-to-br ${product.imageGradient} transition-transform duration-500 group-hover:scale-[1.02]`}
          aria-hidden
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.22),transparent_45%)]" />
          <div className="absolute bottom-3 left-3 right-3 flex flex-wrap gap-2">
            {product.tags.slice(0, 2).map((tag) => (
              <Badge key={tag} className="bg-black/35 text-white backdrop-blur-sm">
                {tag}
              </Badge>
            ))}
          </div>
        </div>
        <div className="pt-4">
          <p className="text-xs font-medium uppercase tracking-[0.14em] text-[var(--color-muted)]">
            {product.brandName} · {product.originCountry}
          </p>
          <h3 className="mt-1 font-[family-name:var(--font-display)] text-lg font-semibold text-[var(--color-ink)] transition-colors group-hover:text-[var(--color-accent-strong)]">
            {product.name}
          </h3>
          <p className="mt-2 line-clamp-2 text-sm text-[var(--color-muted)]">
            {product.description}
          </p>
          <div className="mt-4 flex items-baseline justify-between gap-3">
            <p className="text-base font-semibold text-[var(--color-ink)]">
              {formatCurrency(product.unitPrice, product.currency)}
              <span className="ml-1 text-xs font-medium text-[var(--color-muted)]">
                / unit
              </span>
            </p>
            <p className="text-xs text-[var(--color-muted)]">MOQ {product.moq.toLocaleString()}</p>
          </div>
        </div>
      </article>
    </Link>
  );
}
