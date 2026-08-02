import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/atoms/Button";
import { BusinessShell } from "@/frontend/features/business/BusinessShell";
import { INVESTOR_SLIDES } from "@/frontend/data/business/content";

export const metadata: Metadata = { title: "投資人簡報" };

export default function InvestorDeckPage() {
  return (
    <BusinessShell
      title="Investor Deck"
      titleZh="投資人簡報"
      description="15 頁敘事大綱，可直接轉製成簡報。金額、團隊與財測欄位請於對外前補齊。"
    >
      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
        {INVESTOR_SLIDES.map((slide) => (
          <article
            key={slide.id}
            className="rounded-xl border border-[var(--color-line)] bg-white p-5"
          >
            <p className="text-xs font-semibold tracking-[0.14em] text-[var(--color-gold-strong)]">
              SLIDE {slide.id}
            </p>
            <h2 className="mt-2 font-[family-name:var(--font-display)] text-lg font-semibold text-[var(--color-navy)]">
              {slide.title}
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-[var(--color-muted)]">{slide.body}</p>
          </article>
        ))}
      </div>
      <div className="mt-6 flex flex-wrap gap-3">
        <Link href="/brand/templates/proposal.html" target="_blank">
          <Button size="sm">提案範本</Button>
        </Link>
        <Link href="/business/revenue-model">
          <Button size="sm" variant="outline">
            營收模型
          </Button>
        </Link>
      </div>
    </BusinessShell>
  );
}
