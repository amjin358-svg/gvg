import type { Metadata } from "next";
import { DesignShell } from "@/frontend/features/design/DesignShell";
import { COLOR_TOKENS } from "@/frontend/data/design/content";

export const metadata: Metadata = {
  title: "色彩盤",
};

export default function ColorPalettePage() {
  return (
    <DesignShell
      title="Color Palette"
      titleZh="色彩盤"
      description="海軍藍底盤、金色節奏、霧面中性色。定義於 styles/globals.css；避免紫白漸層與奶油紙感預設。"
    >
      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
        {COLOR_TOKENS.map((color) => (
          <article key={color.token} className="overflow-hidden border border-[var(--color-line)] bg-white">
            <div className="h-20" style={{ backgroundColor: color.hex }} />
            <div className="p-4">
              <p className="text-sm font-semibold text-[var(--color-ink)]">{color.name}</p>
              <p className="mt-1 font-mono text-xs text-[var(--color-muted)]">{color.hex}</p>
              <p className="mt-1 font-mono text-[11px] text-[var(--color-muted)]">{color.token}</p>
              <p className="mt-3 text-xs leading-relaxed text-[var(--color-muted)]">
                {color.role}
                <span className="mt-0.5 block opacity-80">{color.roleEn}</span>
              </p>
            </div>
          </article>
        ))}
      </div>

      <section className="mt-8 border border-[var(--color-line)] bg-white p-6">
        <h2 className="font-[family-name:var(--font-display)] text-xl font-semibold text-[var(--color-navy)]">
          配色示意
        </h2>
        <div className="mt-5 grid gap-3 sm:grid-cols-3">
          <div className="bg-[var(--color-navy)] p-5 text-white">
            <p className="text-xs text-[var(--color-gold)]">Hero / App bar</p>
            <p className="mt-2 font-[family-name:var(--font-display)] text-lg font-semibold">Navy + Gold</p>
          </div>
          <div className="border border-[var(--color-line)] bg-[var(--color-mist)] p-5">
            <p className="text-xs text-[var(--color-muted)]">Content</p>
            <p className="mt-2 font-[family-name:var(--font-display)] text-lg font-semibold text-[var(--color-ink)]">
              Mist + Ink
            </p>
          </div>
          <div className="bg-[var(--color-teal)] p-5 text-white">
            <p className="text-xs text-white/70">Ops success</p>
            <p className="mt-2 font-[family-name:var(--font-display)] text-lg font-semibold">Teal accent</p>
          </div>
        </div>
      </section>
    </DesignShell>
  );
}
