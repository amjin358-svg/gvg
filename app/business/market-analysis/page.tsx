import type { Metadata } from "next";
import { BusinessShell } from "@/frontend/features/business/BusinessShell";

export const metadata: Metadata = { title: "市場分析" };

export default function MarketAnalysisPage() {
  return (
    <BusinessShell
      title="Market Analysis"
      titleZh="市場分析"
      description="目標客群、競爭格局與切入走廊：為什麼現在適合做 Trade OS。"
    >
      <div className="grid gap-4 lg:grid-cols-2">
        <article className="rounded-xl border border-[var(--color-line)] bg-white p-6">
          <h2 className="font-[family-name:var(--font-display)] text-xl font-semibold">痛點</h2>
          <ul className="mt-4 space-y-2 text-sm text-[var(--color-muted)]">
            <li>尋源、CRM、WMS、貨運、報關工具分裂</li>
            <li>RFQ／報價比對靠人工，資訊流失</li>
            <li>到岸成本往往下單後才暴露</li>
            <li>角色（買／賣／倉／財）缺乏共用系統紀錄</li>
          </ul>
        </article>
        <article className="rounded-xl border border-[var(--color-line)] bg-white p-6">
          <h2 className="font-[family-name:var(--font-display)] text-xl font-semibold">目標客群</h2>
          <ul className="mt-4 space-y-2 text-sm text-[var(--color-muted)]">
            <li>進口經銷商／通路商</li>
            <li>品牌主（含 OEM／ODM）</li>
            <li>合約製造與供應商</li>
            <li>採購代理／美國代採服務商</li>
          </ul>
        </article>
        <article className="rounded-xl border border-[var(--color-line)] bg-white p-6">
          <h2 className="font-[family-name:var(--font-display)] text-xl font-semibold">競爭對照</h2>
          <ul className="mt-4 space-y-2 text-sm text-[var(--color-muted)]">
            <li>大型 B2B 市集：曝光強，作業深度弱</li>
            <li>ERP 貿易模組：完整但導入重、週期長</li>
            <li>單點工具：貨運／WMS／CRM 各自為政</li>
            <li>GVG：市集＋作業＋AI 的中市 Trade OS</li>
          </ul>
        </article>
        <article className="rounded-xl border border-[var(--color-line)] bg-white p-6">
          <h2 className="font-[family-name:var(--font-display)] text-xl font-semibold">Beachhead</h2>
          <ul className="mt-4 space-y-2 text-sm text-[var(--color-muted)]">
            <li>走廊：美國採購／亞洲 OEM</li>
            <li>垂直：保健、居家、五金、服飾</li>
            <li>GTM：設計夥伴 → 供應商播種 → 內容／SEO</li>
          </ul>
        </article>
      </div>
    </BusinessShell>
  );
}
