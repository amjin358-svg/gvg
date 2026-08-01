import type { Metadata } from "next";
import { BusinessShell } from "@/frontend/features/business/BusinessShell";

export const metadata: Metadata = { title: "願景" };

export default function VisionPage() {
  return (
    <BusinessShell
      title="Vision"
      titleZh="願景"
      description="我們要成為跨境中市貿易團隊的預設 Trade Operating System。"
    >
      <article className="rounded-xl border border-[var(--color-line)] bg-white p-6 sm:p-8">
        <p className="font-[family-name:var(--font-display)] text-2xl font-semibold leading-snug text-[var(--color-navy)] sm:text-3xl">
          連接全球市場，創造無限商機 — 以一套作業系統完成尋源、成交與交付。
        </p>
        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          {[
            { title: "Connect", text: "買方、供應商、物流與合規角色在同一平台協作" },
            { title: "Source", text: "AI 輔助尋源與 RFQ，縮短比價週期" },
            { title: "Ship & Scale", text: "物流／報關可視，支援走廊複製與規模成長" },
          ].map((item) => (
            <div key={item.title} className="rounded-lg border border-[var(--color-line)] bg-[var(--color-mist)] p-4">
              <p className="text-sm font-semibold text-[var(--color-gold-strong)]">{item.title}</p>
              <p className="mt-2 text-sm text-[var(--color-muted)]">{item.text}</p>
            </div>
          ))}
        </div>
      </article>
    </BusinessShell>
  );
}
