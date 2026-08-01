import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/atoms/Button";
import { OpsShell } from "@/frontend/features/operations/OpsShell";
import { AI_INSIGHTS } from "@/frontend/data/operations/content";

export const metadata: Metadata = {
  title: "AI 洞察",
};

export default function OpsAiInsightPage() {
  return (
    <OpsShell
      title="AI Insight"
      titleZh="AI 洞察"
      description="今日營運智慧摘要與建議動作。完整助理：/ai · /operations/ai-center。"
    >
      <section className="border border-[var(--color-line)] bg-[var(--color-navy)] p-6 text-white">
        <p className="text-xs tracking-[0.16em] text-[var(--color-gold)]">DAILY BRIEF</p>
        <h2 className="mt-2 font-[family-name:var(--font-display)] text-2xl font-semibold">
          Ops recommendations
        </h2>
        <p className="mt-3 max-w-xl text-sm text-white/70">
          洞察來自示範規則引擎；Phase 1 後接 Edge Function + 即時貨況／庫存訊號。
        </p>
        <div className="mt-5">
          <Link href="/ai">
            <Button variant="gold">開啟 AI 助理</Button>
          </Link>
        </div>
      </section>

      <ul className="mt-6 space-y-3">
        {AI_INSIGHTS.map((insight, index) => (
          <li
            key={insight}
            className="border border-[var(--color-line)] bg-white px-5 py-4 text-sm leading-relaxed text-[var(--color-ink)]"
          >
            <span className="mr-2 font-semibold text-[var(--color-gold-strong)]">{index + 1}.</span>
            {insight}
          </li>
        ))}
      </ul>
    </OpsShell>
  );
}
