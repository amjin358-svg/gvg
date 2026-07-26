import type { Metadata } from "next";
import { BusinessShell } from "@/frontend/features/business/BusinessShell";
import { REVENUE_STREAMS } from "@/frontend/data/business/content";

export const metadata: Metadata = { title: "營收模型" };

export default function RevenueModelPage() {
  return (
    <BusinessShell
      title="Revenue Model"
      titleZh="營收模型"
      description="收入組成、定價假設框架與擴張路徑。正式財測需財務簽核後再對外。"
    >
      <section className="grid gap-4 sm:grid-cols-2">
        {REVENUE_STREAMS.map((stream) => (
          <article
            key={stream.name}
            className="rounded-xl border border-[var(--color-line)] bg-white p-5"
          >
            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[var(--color-gold-strong)]">
              {stream.timing}
            </p>
            <h2 className="mt-2 font-[family-name:var(--font-display)] text-xl font-semibold text-[var(--color-navy)]">
              {stream.name}
            </h2>
            <p className="mt-3 text-sm text-[var(--color-muted)]">{stream.model}</p>
            <p className="mt-2 text-xs text-[var(--color-muted)]">{stream.note}</p>
          </article>
        ))}
      </section>

      <section className="mt-6 rounded-xl border border-[var(--color-line)] bg-white p-6">
        <h2 className="font-[family-name:var(--font-display)] text-xl font-semibold">
          定價假設（待驗證）
        </h2>
        <ul className="mt-4 space-y-2 text-sm text-[var(--color-muted)]">
          <li>Buyer Growth：數百美元／月級距</li>
          <li>Enterprise：客製報價</li>
          <li>Supplier：免費入門 → 付費強化曝光／進階報價</li>
          <li>服務：美國代採顧問費或專案費並行</li>
        </ul>
      </section>
    </BusinessShell>
  );
}
