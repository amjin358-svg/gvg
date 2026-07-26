import type { Metadata } from "next";
import { BusinessShell } from "@/frontend/features/business/BusinessShell";

export const metadata: Metadata = { title: "E1 計劃" };

export default function E1PlanPage() {
  return (
    <BusinessShell
      title="E1 Plan"
      titleZh="E1 計劃"
      description="給經營層對齊與早期投資／夥伴對話用的精簡事業計劃（Edition 1）。"
    >
      <div className="grid gap-4 lg:grid-cols-2">
        {[
          {
            title: "機會",
            body: "中市買方仍用郵件與試算表做尋源；需要統一 discover → settle 的 Trade OS。",
          },
          {
            title: "方案",
            body: "20 模組平台＋角色入口＋AI 採購助理；商業上採 SaaS＋服務＋抽成＋加值。",
          },
          {
            title: "Beachhead",
            body: "美國代採走廊；保健／居家／五金／服飾 OEM；已有多供應商進口經驗的團隊。",
          },
          {
            title: "12 個月節奏",
            body: "Q1 Auth＋設計夥伴；Q2 WMS／物流 MVP；Q3 AI 正式化；Q4 重複 GMV。",
          },
          {
            title: "資金用途（占位）",
            body: "工程、合規顧問、導入、雲端安全、GTM 跑道 — 金額對外前由財務定稿。",
          },
          {
            title: "風險對策",
            body: "冷啟動用服務營收；報關 AI 僅建議；供應商品質驗證；USD-first。",
          },
        ].map((card) => (
          <article key={card.title} className="rounded-xl border border-[var(--color-line)] bg-white p-5">
            <h2 className="font-semibold text-[var(--color-navy)]">{card.title}</h2>
            <p className="mt-2 text-sm leading-relaxed text-[var(--color-muted)]">{card.body}</p>
          </article>
        ))}
      </div>
    </BusinessShell>
  );
}
