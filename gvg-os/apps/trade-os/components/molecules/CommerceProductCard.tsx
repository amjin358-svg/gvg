import Link from "next/link";
import { ShoppingCart, Star } from "lucide-react";
import { formatCurrency } from "@/lib/utils";
import type { Product } from "@/types";

type CommerceProductCardProps = {
  product: Product;
  badge?: "熱銷" | "新品" | null;
  rating?: number;
  reviews?: number;
};

export function CommerceProductCard({
  product,
  badge = product.inStock ? "熱銷" : "新品",
  rating = 4.8,
  reviews = 86,
}: CommerceProductCardProps) {
  return (
    <article className="group relative flex flex-col overflow-hidden rounded-xl border border-[var(--color-line)] bg-white transition-shadow hover:shadow-md">
      <Link href={`/products/${product.slug}`} className="block">
        <div
          className={`relative aspect-square bg-gradient-to-br ${product.imageGradient}`}
          aria-hidden
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.35),transparent_50%)]" />
          {badge ? (
            <span
              className={
                badge === "熱銷"
                  ? "absolute right-2 top-2 rounded bg-red-500 px-2 py-0.5 text-[10px] font-semibold text-white"
                  : "absolute right-2 top-2 rounded bg-sky-600 px-2 py-0.5 text-[10px] font-semibold text-white"
              }
            >
              {badge}
            </span>
          ) : null}
          <span className="absolute bottom-2 left-2 rounded bg-white/95 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-[var(--color-navy)]">
            {product.brandName}
          </span>
        </div>
        <div className="flex flex-1 flex-col p-3">
          <p className="text-[11px] font-medium uppercase tracking-wide text-[var(--color-muted)]">
            {product.brandName}
          </p>
          <h3 className="mt-1 line-clamp-2 min-h-[2.5rem] text-sm font-semibold text-[var(--color-ink)] group-hover:text-[var(--color-accent)]">
            {product.name}
          </h3>
          <p className="mt-1 text-[11px] text-[var(--color-muted)]">{product.sku}</p>
          <p className="mt-2 text-base font-semibold text-[var(--color-navy)]">
            {formatCurrency(product.unitPrice, product.currency)}
          </p>
          <div className="mt-1 flex items-center gap-1 text-[11px] text-[var(--color-gold-strong)]">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className={`h-3 w-3 ${i < Math.round(rating) ? "fill-current" : "opacity-30"}`}
              />
            ))}
            <span className="text-[var(--color-muted)]">({reviews})</span>
          </div>
          <p className="mt-1 text-[11px] text-[var(--color-muted)]">
            產地 {product.originCountry} · MOQ {product.moq.toLocaleString()}
          </p>
        </div>
      </Link>
      <button
        type="button"
        className="absolute bottom-3 right-3 inline-flex h-8 w-8 items-center justify-center rounded-full border border-[var(--color-line)] bg-white text-[var(--color-navy)] shadow-sm transition hover:bg-[var(--color-navy)] hover:text-white"
        aria-label={`加入詢價：${product.name}`}
      >
        <ShoppingCart className="h-3.5 w-3.5" />
      </button>
    </article>
  );
}
