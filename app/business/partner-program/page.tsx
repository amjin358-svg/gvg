import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/atoms/Button";
import { BusinessShell } from "@/frontend/features/business/BusinessShell";
import { PARTNER_TIERS } from "@/frontend/data/business/content";

export const metadata: Metadata = { title: "夥伴計畫" };

export default function PartnerProgramPage() {
  return (
    <BusinessShell
      title="Partner Program"
      titleZh="夥伴計畫"
      description="供應商、物流、解決方案與策略聯盟分級權益，支援共同 GTM 與成交。"
    >
      <div className="grid gap-4 lg:grid-cols-2">
        {PARTNER_TIERS.map((tier) => (
          <article
            key={tier.name}
            className="rounded-xl border border-[var(--color-line)] bg-white p-6"
          >
            <h2 className="font-[family-name:var(--font-display)] text-xl font-semibold text-[var(--color-navy)]">
              {tier.name}
            </h2>
            <p className="mt-2 text-sm text-[var(--color-gold-strong)]">{tier.audience}</p>
            <ul className="mt-4 space-y-2 text-sm text-[var(--color-muted)]">
              {tier.benefits.map((benefit) => (
                <li key={benefit}>• {benefit}</li>
              ))}
            </ul>
          </article>
        ))}
      </div>

      <section className="mt-6 rounded-xl border border-[var(--color-line)] bg-[var(--color-navy)] p-6 text-white">
        <h2 className="font-[family-name:var(--font-display)] text-2xl font-semibold">
          成為 GVG 夥伴
        </h2>
        <p className="mt-3 max-w-2xl text-sm text-white/75">
          留下公司與合作意向，我們將安排夥伴對口與導入評估。
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link href="/contact">
            <Button variant="gold">申請合作</Button>
          </Link>
          <Link href="/portal/supplier">
            <Button variant="outlineLight">供應商入口</Button>
          </Link>
        </div>
      </section>
    </BusinessShell>
  );
}
