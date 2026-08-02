import type { Metadata } from "next";
import { BusinessShell } from "@/frontend/features/business/BusinessShell";
import { REVENUE_STREAMS } from "@/frontend/data/business/content";

export const metadata: Metadata = { title: "商業模式" };

export default function BusinessModelPage() {
  return (
    <BusinessShell
      title="Business Model"
      titleZh="商業模式"
      description="軟體訂閱為核心，服務帶動導入與目錄流動性，市集與加值模組擴張 ARPU。"
    >
      <div className="overflow-hidden rounded-xl border border-[var(--color-line)] bg-white">
        <table className="w-full min-w-[640px] text-left text-sm">
          <thead>
            <tr className="border-b border-[var(--color-line)] bg-[var(--color-mist)] text-xs uppercase tracking-[0.12em] text-[var(--color-muted)]">
              <th className="px-4 py-3">收入流</th>
              <th className="px-4 py-3">時機</th>
              <th className="px-4 py-3">模型</th>
              <th className="px-4 py-3">說明</th>
            </tr>
          </thead>
          <tbody>
            {REVENUE_STREAMS.map((stream) => (
              <tr key={stream.name} className="border-b border-[var(--color-line)]/70">
                <td className="px-4 py-4 font-semibold text-[var(--color-ink)]">{stream.name}</td>
                <td className="px-4 py-4 text-[var(--color-gold-strong)]">{stream.timing}</td>
                <td className="px-4 py-4 text-[var(--color-muted)]">{stream.model}</td>
                <td className="px-4 py-4 text-[var(--color-muted)]">{stream.note}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-6 grid gap-4 sm:grid-cols-3">
        {[
          { title: "誰付費", text: "進口商／品牌主席次、供應商升級、企業貿易桌" },
          { title: "為何付費", text: "縮短詢報價、降低合規失誤、提升可視性" },
          { title: "如何擴張", text: "走廊複製、OEM 專案、AI／ERP 加值" },
        ].map((card) => (
          <article key={card.title} className="rounded-xl border border-[var(--color-line)] bg-white p-5">
            <h2 className="font-semibold text-[var(--color-navy)]">{card.title}</h2>
            <p className="mt-2 text-sm text-[var(--color-muted)]">{card.text}</p>
          </article>
        ))}
      </div>
    </BusinessShell>
  );
}
