import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { DesignShell } from "@/frontend/features/design/DesignShell";
import { PREVIEW_LINKS, WEBSITE_RULES } from "@/frontend/data/design/content";
import { BRAND } from "@/lib/constants";

export const metadata: Metadata = {
  title: "官網預覽",
};

export default function WebsitePreviewPage() {
  return (
    <DesignShell
      title="Website Preview"
      titleZh="官網預覽"
      description="行銷站高保真預覽：全幅英雄、品牌優先首屏與關鍵路由。詳見 docs/brand/WEBSITE.md。"
    >
      <section className="overflow-hidden border border-[var(--color-line)] shadow-[0_24px_60px_-36px_rgba(0,21,41,0.5)]">
        <div className="flex items-center gap-2 border-b border-[var(--color-line)] bg-[var(--color-mist)] px-3 py-2">
          <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
          <span className="ml-2 font-mono text-[11px] text-[var(--color-muted)]">
            globalvistagroup.com
          </span>
        </div>
        <div className="relative bg-[var(--color-navy)] px-6 py-14 text-white sm:px-10">
          <div
            className="pointer-events-none absolute inset-0 opacity-50"
            style={{
              background:
                "radial-gradient(ellipse at 70% 20%, rgba(212,160,23,0.35), transparent 55%), radial-gradient(ellipse at 10% 80%, rgba(26,122,109,0.35), transparent 50%)",
            }}
          />
          <div className="relative max-w-xl">
            <p className="text-xs tracking-[0.18em] text-[var(--color-gold)]">
              {BRAND.shortName} · {BRAND.productZh}
            </p>
            <h2 className="mt-3 font-[family-name:var(--font-display)] text-3xl font-semibold sm:text-5xl">
              {BRAND.name}
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-white/75">{BRAND.taglineZh}</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <span className="inline-flex h-10 items-center bg-[var(--color-gold)] px-4 text-sm font-semibold text-[var(--color-navy)]">
                立即詢價
              </span>
              <span className="inline-flex h-10 items-center border border-white/70 px-4 text-sm font-semibold">
                探索市集
              </span>
            </div>
          </div>
        </div>
      </section>

      <section className="mt-8 grid gap-4 lg:grid-cols-2">
        {WEBSITE_RULES.map((rule) => (
          <article key={rule.title} className="border-t border-[var(--color-line)] bg-white px-5 py-4">
            <h3 className="text-sm font-semibold text-[var(--color-navy)]">{rule.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-[var(--color-muted)]">{rule.body}</p>
          </article>
        ))}
      </section>

      <section className="mt-8">
        <h2 className="font-[family-name:var(--font-display)] text-xl font-semibold text-[var(--color-navy)]">
          實機入口
        </h2>
        <ul className="mt-5 grid gap-3 sm:grid-cols-2">
          {PREVIEW_LINKS.filter((item) => item.id !== "business").map((screen) => (
            <li key={screen.id}>
              <Link
                href={screen.href}
                className="group flex items-start justify-between border border-[var(--color-line)] bg-white px-4 py-4 hover:border-[var(--color-navy)]"
              >
                <span>
                  <span className="block text-sm font-semibold group-hover:text-[var(--color-navy)]">
                    {screen.titleZh}
                  </span>
                  <span className="mt-1 block text-xs text-[var(--color-muted)]">{screen.note}</span>
                </span>
                <ArrowUpRight className="h-4 w-4 text-[var(--color-navy)] opacity-40 group-hover:opacity-100" />
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </DesignShell>
  );
}
