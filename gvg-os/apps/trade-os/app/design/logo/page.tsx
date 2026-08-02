import type { Metadata } from "next";
import { DesignShell } from "@/frontend/features/design/DesignShell";
import { LOGO_ASSETS } from "@/frontend/data/design/content";

export const metadata: Metadata = {
  title: "標誌",
};

export default function LogoPage() {
  return (
    <DesignShell
      title="Logo"
      titleZh="標誌"
      description="Design Center · 官方圖標與組合標。最小安全空間＝圖標中「G」的高度；數位最小寬度：圖標 24px、水平組合標 120px。"
    >
      <div className="grid gap-6 sm:grid-cols-2">
        {LOGO_ASSETS.map((logo) => (
          <figure
            key={logo.src}
            className={
              logo.tone === "dark"
                ? "border border-[var(--color-line)] bg-[var(--color-navy)] p-8"
                : "border border-[var(--color-line)] bg-white p-8"
            }
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={logo.src} alt={logo.label} className="h-16 w-auto max-w-full" />
            <figcaption className={logo.tone === "dark" ? "mt-6 text-white" : "mt-6"}>
              <p className="text-sm font-semibold">{logo.labelZh}</p>
              <p className={logo.tone === "dark" ? "mt-1 text-xs text-white/65" : "mt-1 text-xs text-[var(--color-muted)]"}>
                {logo.label} · {logo.use}
              </p>
              <p
                className={
                  logo.tone === "dark"
                    ? "mt-2 font-mono text-xs text-white/50"
                    : "mt-2 font-mono text-xs text-[var(--color-muted)]"
                }
              >
                {logo.src}
              </p>
            </figcaption>
          </figure>
        ))}
      </div>

      <section className="mt-8 border border-[var(--color-line)] bg-white p-6">
        <h2 className="font-[family-name:var(--font-display)] text-xl font-semibold text-[var(--color-navy)]">
          使用規則
        </h2>
        <ul className="mt-4 space-y-2 text-sm leading-relaxed text-[var(--color-muted)]">
          <li>· 維持字標下方品牌色條完整，勿重繪字母。</li>
          <li>· 低對比照片上需加海軍藍或霧面遮罩再疊標誌。</li>
          <li>· Favicon／App icon 僅用 Mark；寬版導覽可用產品組合標。</li>
          <li>· 資產目錄：`/public/brand/`</li>
        </ul>
      </section>
    </DesignShell>
  );
}
