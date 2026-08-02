import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/atoms/Button";
import { BusinessShell } from "@/frontend/features/business/BusinessShell";

export const metadata: Metadata = { title: "事業計劃" };

export default function BusinessPlanPage() {
  return (
    <BusinessShell
      title="Business Plan"
      titleZh="事業計劃"
      description="完整事業計劃摘要：問題、方案、市場、營運、技術與里程碑。詳見 docs/business/BUSINESS_PLAN.md。"
    >
      <div className="space-y-4">
        {[
          {
            title: "1. 執行摘要",
            body: "打造企業級 B2B／B2C 國際貿易 OS，整合市集、詢報價、訂單、倉儲物流、報關、CRM 與 AI。",
          },
          {
            title: "2. 問題與方案",
            body: "碎片化工具導致週期慢與合規風險；GVG 以角色化工作區與 AI 助理統一 discover → settle。",
          },
          {
            title: "3. 產品",
            body: "20+ 模組：Marketplace、Trade、WMS、Logistics、Customs、CRM、CMS、Analytics、AI、Admin。",
          },
          {
            title: "4. 市場與 GTM",
            body: "中市進口商與品牌主；設計夥伴導入、供應商播種、美國代採楔入、SEO／GEO 內容。",
          },
          {
            title: "5. 營運與技術",
            body: "貿易營運＋供應商成功＋工程；Next.js 15／Supabase／Vercel／Cloudflare；分階段交付。",
          },
          {
            title: "6. 風險",
            body: "冷啟動、合規責任、FX／支付複雜度；以服務帶動目錄、人機確認報關、USD-first 緩解。",
          },
        ].map((section) => (
          <article
            key={section.title}
            className="rounded-xl border border-[var(--color-line)] bg-white p-5"
          >
            <h2 className="font-semibold text-[var(--color-navy)]">{section.title}</h2>
            <p className="mt-2 text-sm leading-relaxed text-[var(--color-muted)]">{section.body}</p>
          </article>
        ))}
      </div>
      <div className="mt-6 flex flex-wrap gap-3">
        <Link href="/business/e1-plan">
          <Button size="sm">E1 精簡版</Button>
        </Link>
        <Link href="/business/investor-deck">
          <Button size="sm" variant="outline">
            投資人簡報
          </Button>
        </Link>
      </div>
    </BusinessShell>
  );
}
