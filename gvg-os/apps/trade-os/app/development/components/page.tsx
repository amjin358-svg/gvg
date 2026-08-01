import type { Metadata } from "next";
import Link from "next/link";
import { Badge } from "@/components/atoms/Badge";
import { Button } from "@/components/atoms/Button";
import { StatusBadge } from "@/components/molecules/StatusBadge";
import { DevShell } from "@/frontend/features/development/DevShell";
import { COMPONENT_INVENTORY } from "@/frontend/data/development/content";

export const metadata: Metadata = {
  title: "元件",
};

export default function DevelopmentComponentsPage() {
  return (
    <DevShell
      title="Components"
      titleZh="元件"
      description="工程元件盤點與穩定度。視覺樣式庫見 Design Center `/design/components`。"
    >
      <section className="border border-[var(--color-line)] bg-white p-6">
        <h2 className="font-[family-name:var(--font-display)] text-xl font-semibold text-[var(--color-navy)]">
          Live preview
        </h2>
        <div className="mt-4 flex flex-wrap gap-3">
          <Button variant="primary">Primary</Button>
          <Button variant="gold">Gold</Button>
          <Button variant="outline">Outline</Button>
          <StatusBadge status="in_progress" />
          <StatusBadge status="on_track" />
          <Badge tone="success">stable</Badge>
        </div>
      </section>

      <section className="mt-6 overflow-x-auto border border-[var(--color-line)] bg-white p-6">
        <table className="w-full min-w-[640px] text-left text-sm">
          <thead>
            <tr className="border-b border-[var(--color-line)] text-xs uppercase tracking-[0.12em] text-[var(--color-muted)]">
              <th className="py-2 pr-3">Component</th>
              <th className="py-2 pr-3">Path</th>
              <th className="py-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {COMPONENT_INVENTORY.map((item) => (
              <tr key={item.name} className="border-b border-[var(--color-line)]/70">
                <td className="py-3 pr-3 font-semibold text-[var(--color-ink)]">{item.name}</td>
                <td className="py-3 pr-3 font-mono text-xs text-[var(--color-muted)]">{item.path}</td>
                <td className="py-3">
                  <Badge tone={item.status === "stable" ? "success" : "neutral"}>{item.status}</Badge>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <p className="mt-6 text-sm">
        <Link href="/design/ui-kit" className="font-semibold text-[var(--color-accent-strong)] hover:underline">
          開啟 Design Center UI Kit →
        </Link>
      </p>
    </DevShell>
  );
}
