import type { Metadata } from "next";
import { Badge } from "@/components/atoms/Badge";
import { Button } from "@/components/atoms/Button";
import { StatusBadge } from "@/components/molecules/StatusBadge";
import { DesignShell } from "@/frontend/features/design/DesignShell";

export const metadata: Metadata = {
  title: "元件",
};

export default function ComponentsPage() {
  return (
    <DesignShell
      title="Components"
      titleZh="元件"
      description="Design Center · 原子／分子元件庫。按鈕、徽章、狀態標籤為營運與行銷共用；基礎字級／圖示見 UI Kit。"
    >
      <section className="border border-[var(--color-line)] bg-white p-6">
        <h2 className="font-[family-name:var(--font-display)] text-xl font-semibold text-[var(--color-navy)]">
          Button
        </h2>
        <p className="mt-1 text-xs text-[var(--color-muted)]">components/atoms/Button.tsx</p>
        <div className="mt-5 flex flex-wrap gap-3">
          <Button variant="primary">Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="gold">Gold</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="primary" size="sm">
            Small
          </Button>
          <Button variant="primary" size="lg">
            Large
          </Button>
        </div>
        <div className="mt-4 rounded-lg bg-[var(--color-navy)] p-4">
          <div className="flex flex-wrap gap-3">
            <Button variant="gold">Gold on navy</Button>
            <Button variant="outlineLight">Outline light</Button>
            <Button variant="soft">Soft</Button>
          </div>
        </div>
      </section>

      <section className="mt-6 border border-[var(--color-line)] bg-white p-6">
        <h2 className="font-[family-name:var(--font-display)] text-xl font-semibold text-[var(--color-navy)]">
          Badge
        </h2>
        <p className="mt-1 text-xs text-[var(--color-muted)]">components/atoms/Badge.tsx</p>
        <div className="mt-5 flex flex-wrap gap-2">
          <Badge>Neutral</Badge>
          <Badge tone="success">Success</Badge>
          <Badge tone="warning">Warning</Badge>
          <Badge tone="info">Info</Badge>
          <Badge tone="accent">Accent</Badge>
        </div>
      </section>

      <section className="mt-6 border border-[var(--color-line)] bg-white p-6">
        <h2 className="font-[family-name:var(--font-display)] text-xl font-semibold text-[var(--color-navy)]">
          StatusBadge
        </h2>
        <p className="mt-1 text-xs text-[var(--color-muted)]">components/molecules/StatusBadge.tsx</p>
        <div className="mt-5 flex flex-wrap gap-2">
          <StatusBadge status="open" />
          <StatusBadge status="quoted" />
          <StatusBadge status="in_progress" />
          <StatusBadge status="negotiation" />
          <StatusBadge status="on_track" />
          <StatusBadge status="blocked" />
          <StatusBadge status="delivered" />
          <StatusBadge status="customs_hold" />
        </div>
      </section>

      <section className="mt-6 border border-[var(--color-line)] bg-white p-6">
        <h2 className="font-[family-name:var(--font-display)] text-xl font-semibold text-[var(--color-navy)]">
          Form control
        </h2>
        <p className="mt-1 text-xs text-[var(--color-muted)]">搜尋列樣式（SiteHeader）</p>
        <div className="mt-5 flex h-11 max-w-md overflow-hidden rounded-full border border-[var(--color-line)] bg-[var(--color-mist)]">
          <input
            readOnly
            defaultValue="搜尋產品、供應商、品牌…"
            className="w-full bg-transparent px-4 text-sm text-[var(--color-muted)] outline-none"
          />
        </div>
      </section>

      <section className="mt-6 border border-[var(--color-line)] bg-white p-6">
        <h2 className="font-[family-name:var(--font-display)] text-xl font-semibold text-[var(--color-navy)]">
          KPI numeral
        </h2>
        <p className="mt-1 text-xs text-[var(--color-muted)]">儀表板數字樣式——大數字 + 細標籤，非重陰影卡片</p>
        <div className="mt-5 grid gap-4 sm:grid-cols-3">
          {[
            { label: "開放 RFQ", value: "18" },
            { label: "活躍訂單", value: "47" },
            { label: "在途貨況", value: "14" },
          ].map((item) => (
            <div key={item.label} className="border-t-2 border-[var(--color-navy)] bg-[var(--color-mist)] px-4 py-4">
              <p className="text-xs text-[var(--color-muted)]">{item.label}</p>
              <p className="mt-2 font-[family-name:var(--font-display)] text-3xl font-semibold text-[var(--color-navy)]">
                {item.value}
              </p>
            </div>
          ))}
        </div>
      </section>
    </DesignShell>
  );
}
