import type { Metadata } from "next";
import {
  Bot,
  BriefcaseBusiness,
  CircleDollarSign,
  ClipboardList,
  FolderKanban,
  Globe2,
  Package,
  Search,
  Shield,
  Ship,
  ShoppingCart,
  UserRound,
} from "lucide-react";
import { Button } from "@/components/atoms/Button";
import { DesignShell } from "@/frontend/features/design/DesignShell";
import { ICON_CATALOG, SPACING_SCALE, TYPE_SCALE } from "@/frontend/data/design/content";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "UI 套件",
};

const ICON_MAP = {
  Globe2,
  Ship,
  Package,
  Search,
  Bot,
  BriefcaseBusiness,
  FolderKanban,
  CircleDollarSign,
  ClipboardList,
  Shield,
  ShoppingCart,
  UserRound,
} as const;

export default function UiKitPage() {
  return (
    <DesignShell
      title="UI Kit"
      titleZh="UI 套件"
      description="字體階梯、間距、圖示規格與基礎控制項。完整互動元件見 Components。"
    >
      <div className="grid gap-4 lg:grid-cols-2">
        <section className="border border-[var(--color-line)] bg-white p-6">
          <p className="text-xs uppercase tracking-[0.14em] text-[var(--color-muted)]">Display</p>
          <p className="mt-3 font-[family-name:var(--font-display)] text-4xl font-semibold text-[var(--color-navy)]">
            Outfit
          </p>
          <p className="mt-3 font-[family-name:var(--font-display)] text-lg">Connect. Source. Ship. Scale.</p>
        </section>
        <section className="border border-[var(--color-line)] bg-white p-6">
          <p className="text-xs uppercase tracking-[0.14em] text-[var(--color-muted)]">Body / UI</p>
          <p className="mt-3 text-4xl font-semibold text-[var(--color-navy)]">Noto Sans TC</p>
          <p className="mt-3 text-lg leading-relaxed">連接全球市場，創造無限商機。</p>
        </section>
      </div>

      <section className="mt-6 border border-[var(--color-line)] bg-white p-6">
        <h2 className="font-[family-name:var(--font-display)] text-xl font-semibold text-[var(--color-navy)]">
          字級
        </h2>
        <ul className="mt-5 space-y-5">
          {TYPE_SCALE.map((item) => (
            <li key={item.role} className="border-t border-[var(--color-line)] pt-3">
              <p className="mb-2 text-xs text-[var(--color-muted)]">
                {item.roleZh} · {item.role}
              </p>
              <p className={cn("text-[var(--color-ink)]", item.className)}>{item.sample}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-6 border border-[var(--color-line)] bg-white p-6">
        <h2 className="font-[family-name:var(--font-display)] text-xl font-semibold text-[var(--color-navy)]">
          間距
        </h2>
        <ul className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {SPACING_SCALE.map((item) => (
            <li key={item.name} className="flex items-center gap-3 border-t border-[var(--color-line)] pt-3">
              <span
                className="shrink-0 bg-[var(--color-navy)]"
                style={{ width: item.px, height: item.px }}
                aria-hidden
              />
              <span>
                <span className="block text-sm font-semibold text-[var(--color-ink)]">
                  space-{item.name} · {item.px}
                </span>
                <span className="text-xs text-[var(--color-muted)]">{item.use}</span>
              </span>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-6 border border-[var(--color-line)] bg-white p-6">
        <h2 className="font-[family-name:var(--font-display)] text-xl font-semibold text-[var(--color-navy)]">
          圖示（Lucide）
        </h2>
        <div className="mt-5 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
          {ICON_CATALOG.map((item) => {
            const Icon = ICON_MAP[item.name as keyof typeof ICON_MAP];
            return (
              <div
                key={item.name}
                className="flex items-center gap-3 border border-[var(--color-line)] px-3 py-3"
              >
                <Icon className="h-5 w-5 text-[var(--color-navy)]" strokeWidth={1.75} />
                <div>
                  <p className="text-sm font-semibold">{item.name}</p>
                  <p className="text-xs text-[var(--color-muted)]">{item.use}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <section className="mt-6 border border-[var(--color-line)] bg-white p-6">
        <h2 className="font-[family-name:var(--font-display)] text-xl font-semibold text-[var(--color-navy)]">
          基礎控制
        </h2>
        <div className="mt-5 flex flex-wrap gap-3">
          <Button variant="primary">Primary</Button>
          <Button variant="gold">Gold</Button>
          <Button variant="outline">Outline</Button>
        </div>
        <div className="mt-4 flex h-11 max-w-md overflow-hidden rounded-full border border-[var(--color-line)] bg-[var(--color-mist)]">
          <input
            readOnly
            defaultValue="搜尋產品、供應商、品牌…"
            className="w-full bg-transparent px-4 text-sm text-[var(--color-muted)] outline-none"
          />
        </div>
      </section>
    </DesignShell>
  );
}
