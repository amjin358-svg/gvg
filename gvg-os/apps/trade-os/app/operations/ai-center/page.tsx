import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/atoms/Button";
import { OpsShell } from "@/frontend/features/operations/OpsShell";
import { AI_CAPABILITIES } from "@/frontend/data/operations/content";

export const metadata: Metadata = {
  title: "AI 中心",
};

export default function OpsAiCenterPage() {
  return (
    <OpsShell
      title="AI Center"
      titleZh="AI 中心"
      description="採購助理與智慧工具控制面。實機：/ai · 規格：docs/015_AI_AGENT.md。"
    >
      <section className="border border-[var(--color-line)] bg-[var(--color-navy)] p-6 text-white">
        <p className="text-xs tracking-[0.16em] text-[var(--color-gold)]">AI PROCUREMENT</p>
        <h2 className="mt-2 font-[family-name:var(--font-display)] text-2xl font-semibold">
          Assist humans — never silent-bind orders
        </h2>
        <p className="mt-3 max-w-xl text-sm text-white/70">
          工具鏈：searchProducts · estimateLandedCost · draftRfq · classifyHs
        </p>
        <div className="mt-5">
          <Link href="/ai">
            <Button variant="gold">開啟 AI 智慧服務</Button>
          </Link>
        </div>
      </section>

      <section className="mt-6 grid gap-3 sm:grid-cols-2">
        {AI_CAPABILITIES.map((item) => (
          <article key={item.name} className="border-t border-[var(--color-line)] bg-white px-4 py-4">
            <p className="text-sm font-semibold text-[var(--color-navy)]">{item.name}</p>
            <p className="mt-1 text-xs text-[var(--color-muted)]">{item.detail}</p>
          </article>
        ))}
      </section>

      <section className="mt-6 border border-[var(--color-line)] bg-white p-6">
        <h2 className="font-[family-name:var(--font-display)] text-lg font-semibold text-[var(--color-navy)]">
          Safety
        </h2>
        <ul className="mt-3 space-y-2 text-sm text-[var(--color-muted)]">
          <li>· 不自動下單；需人類確認</li>
          <li>· HS／合規建議需專家覆核</li>
          <li>· 敏感文件走私有 Storage + RLS</li>
        </ul>
      </section>
    </OpsShell>
  );
}
