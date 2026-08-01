import type { Metadata } from "next";
import Link from "next/link";
import { DesignShell } from "@/frontend/features/design/DesignShell";
import { MOBILE_SCREENS } from "@/frontend/data/design/content";
import { BRAND } from "@/lib/constants";

export const metadata: Metadata = {
  title: "行動預覽",
};

function Phone({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mx-auto w-[260px]">
      <p className="mb-3 text-center text-xs font-semibold text-[var(--color-muted)]">{title}</p>
      <div className="rounded-[2rem] border-[10px] border-[var(--color-ink)] bg-[var(--color-ink)] p-1 shadow-[0_24px_50px_-28px_rgba(0,21,41,0.65)]">
        <div className="overflow-hidden rounded-[1.35rem] bg-white">
          <div className="flex items-center justify-center bg-[var(--color-navy)] py-1.5">
            <span className="h-1.5 w-16 rounded-full bg-white/25" />
          </div>
          {children}
          <div className="flex justify-center bg-white py-2">
            <span className="h-1 w-20 rounded-full bg-[var(--color-line)]" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default function MobilePreviewPage() {
  return (
    <DesignShell
      title="Mobile Preview"
      titleZh="行動預覽"
      description="行動端構圖預覽：單一主訊息、可觸控 CTA、底部導覽密度。實際響應式請在窄視窗開啟各路由驗證。"
    >
      <div className="grid gap-10 lg:grid-cols-3">
        <Phone title="Home">
          <div className="min-h-[360px] bg-[var(--color-navy)] px-4 py-5 text-white">
            <p className="text-[10px] tracking-[0.16em] text-[var(--color-gold)]">{BRAND.shortName}</p>
            <p className="mt-2 font-[family-name:var(--font-display)] text-xl font-semibold leading-tight">
              {BRAND.nameZh}
            </p>
            <p className="mt-2 text-[11px] leading-relaxed text-white/70">{BRAND.taglineZh}</p>
            <div className="mt-5 inline-flex h-8 items-center bg-[var(--color-gold)] px-3 text-[11px] font-semibold text-[var(--color-navy)]">
              立即詢價
            </div>
            <div className="mt-8 space-y-2">
              {["國際貿易", "全球採購", "物流服務"].map((item) => (
                <div key={item} className="border-t border-white/15 pt-2 text-[11px] text-white/85">
                  {item}
                </div>
              ))}
            </div>
          </div>
        </Phone>

        <Phone title="Marketplace">
          <div className="min-h-[360px] bg-[var(--color-mist)] px-3 py-3">
            <div className="rounded-full border border-[var(--color-line)] bg-white px-3 py-2 text-[11px] text-[var(--color-muted)]">
              搜尋產品…
            </div>
            <p className="mt-4 text-xs font-semibold text-[var(--color-navy)]">熱銷供應商</p>
            <div className="mt-2 space-y-2">
              {["HarborCraft", "Pacific Wellness", "EuroTools"].map((name) => (
                <div key={name} className="border border-[var(--color-line)] bg-white px-3 py-2">
                  <p className="text-[11px] font-semibold text-[var(--color-ink)]">{name}</p>
                  <p className="text-[10px] text-[var(--color-muted)]">MOQ · 現貨 · RFQ</p>
                </div>
              ))}
            </div>
            <div className="mt-4 grid grid-cols-2 gap-2">
              <div className="h-16 bg-[var(--color-navy)]/10" />
              <div className="h-16 bg-[var(--color-gold)]/20" />
            </div>
          </div>
        </Phone>

        <Phone title="Business Dashboard">
          <div className="min-h-[360px] bg-white px-3 py-3">
            <p className="font-[family-name:var(--font-display)] text-sm font-semibold text-[var(--color-navy)]">
              Today&apos;s KPI
            </p>
            <div className="mt-3 grid grid-cols-2 gap-2">
              {[
                { label: "RFQ", value: "12" },
                { label: "Quotes", value: "28" },
                { label: "Orders", value: "47" },
                { label: "Holds", value: "3" },
              ].map((kpi) => (
                <div key={kpi.label} className="border-t-2 border-[var(--color-navy)] pt-2">
                  <p className="text-[10px] text-[var(--color-muted)]">{kpi.label}</p>
                  <p className="font-[family-name:var(--font-display)] text-lg font-semibold">{kpi.value}</p>
                </div>
              ))}
            </div>
            <p className="mt-4 text-[11px] font-semibold text-[var(--color-ink)]">AI Summary</p>
            <p className="mt-1 text-[10px] leading-relaxed text-[var(--color-muted)]">
              3 筆貨況 customs hold；建議啟動報關文件助理。
            </p>
          </div>
        </Phone>
      </div>

      <section className="mt-10 border border-[var(--color-line)] bg-white p-6">
        <h2 className="font-[family-name:var(--font-display)] text-xl font-semibold text-[var(--color-navy)]">
          行動規範
        </h2>
        <ul className="mt-4 space-y-2 text-sm text-[var(--color-muted)]">
          <li>· 首屏仍品牌優先；CTA 觸控高度 ≥ 40px</li>
          <li>· 漢堡選單收納主導覽；搜尋可進市集</li>
          <li>· 儀表板側欄改為可摺疊／頂部模組切換</li>
          <li>· 避免桌面多欄表格硬塞；優先卡片列與進度條</li>
        </ul>
        <ul className="mt-6 grid gap-3 sm:grid-cols-3">
          {MOBILE_SCREENS.map((screen) => (
            <li key={screen.id}>
              <Link
                href={screen.href}
                className="block border-t border-[var(--color-line)] pt-3 text-sm font-semibold text-[var(--color-accent-strong)] hover:underline"
              >
                {screen.titleZh}
                <span className="mt-1 block font-mono text-xs font-normal text-[var(--color-muted)]">
                  {screen.href}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </DesignShell>
  );
}
