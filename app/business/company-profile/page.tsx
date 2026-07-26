import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/atoms/Button";
import { BusinessShell } from "@/frontend/features/business/BusinessShell";
import { BRAND } from "@/lib/constants";

export const metadata: Metadata = { title: "公司簡介" };

export default function CompanyProfilePage() {
  return (
    <BusinessShell
      title="Company Profile"
      titleZh="公司簡介"
      description="Global Vista Group 企業輪廓：我們是誰、提供什麼、服務對象與營運模式。"
    >
      <div className="space-y-6 rounded-xl border border-[var(--color-line)] bg-white p-6">
        <section>
          <h2 className="font-[family-name:var(--font-display)] text-xl font-semibold">我們是誰</h2>
          <p className="mt-3 text-sm leading-relaxed text-[var(--color-muted)]">
            {BRAND.name}（{BRAND.shortName}）打造並營運企業級國際貿易平台 {BRAND.product}，
            連結供應商、製造商、買方、物流商與全球採購服務於同一作業系統。
          </p>
        </section>
        <section>
          <h2 className="font-[family-name:var(--font-display)] text-xl font-semibold">我們提供</h2>
          <div className="mt-4 overflow-x-auto">
            <table className="w-full min-w-[520px] text-left text-sm">
              <thead>
                <tr className="border-b border-[var(--color-line)] text-xs uppercase tracking-[0.12em] text-[var(--color-muted)]">
                  <th className="py-2 pr-4">層級</th>
                  <th className="py-2">能力</th>
                </tr>
              </thead>
              <tbody className="text-[var(--color-ink)]">
                {[
                  ["Marketplace", "產品、分類、品牌、新聞／CMS"],
                  ["Trade cycle", "RFQ → Quote → Order"],
                  ["Procurement", "全球採購、美國代採、OEM／ODM"],
                  ["Supply chain", "庫存、倉儲、物流、報關文件"],
                  ["Intelligence", "AI 採購助理"],
                  ["Control", "角色治理、管理後台、分析"],
                ].map(([layer, capability]) => (
                  <tr key={layer} className="border-b border-[var(--color-line)]/70">
                    <td className="py-3 pr-4 font-medium">{layer}</td>
                    <td className="py-3 text-[var(--color-muted)]">{capability}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
        <section>
          <h2 className="font-[family-name:var(--font-display)] text-xl font-semibold">產業垂直</h2>
          <p className="mt-3 text-sm text-[var(--color-muted)]">
            健康保健、食品、居家、五金工具、建材裝修、家具、品牌服飾、OEM／ODM。
          </p>
        </section>
        <div className="flex flex-wrap gap-3">
          <Link href="/business/vision">
            <Button size="sm">願景</Button>
          </Link>
          <Link href="/about">
            <Button size="sm" variant="outline">
              公開關於頁
            </Button>
          </Link>
        </div>
      </div>
    </BusinessShell>
  );
}
