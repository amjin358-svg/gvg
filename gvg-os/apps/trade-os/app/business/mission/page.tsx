import type { Metadata } from "next";
import { BusinessShell } from "@/frontend/features/business/BusinessShell";

export const metadata: Metadata = { title: "使命" };

export default function MissionPage() {
  return (
    <BusinessShell
      title="Mission"
      titleZh="使命"
      description="以可稽核、角色分明、AI 加強的貿易作業系統，降低跨境交易成本與合規風險。"
    >
      <div className="grid gap-4 lg:grid-cols-2">
        <article className="rounded-xl border border-[var(--color-line)] bg-white p-6">
          <h2 className="font-[family-name:var(--font-display)] text-xl font-semibold">使命陳述</h2>
          <p className="mt-4 text-sm leading-relaxed text-[var(--color-muted)]">
            我們幫助進口商、品牌主與供應商把「電子郵件＋試算表＋零散工具」升級為可追蹤的
            Trade OS，讓每一筆 RFQ、報價、訂單與出貨都有系統紀錄，並在下單前看清到岸成本。
          </p>
        </article>
        <article className="rounded-xl border border-[var(--color-line)] bg-white p-6">
          <h2 className="font-[family-name:var(--font-display)] text-xl font-semibold">我們承諾</h2>
          <ul className="mt-4 space-y-3 text-sm text-[var(--color-muted)]">
            <li>流程優先：市集到報關一條龍，而非單點功能堆疊</li>
            <li>角色治理：權限最小化、可稽核</li>
            <li>人機協作：AI 協助草稿與匹配，合規決策由人確認</li>
            <li>走廊深耕：先打穿美國代採與亞洲 OEM 場景</li>
          </ul>
        </article>
      </div>
    </BusinessShell>
  );
}
