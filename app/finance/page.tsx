import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/atoms/Container";
import { PageHero } from "@/components/organisms/PageHero";
import { Badge } from "@/components/atoms/Badge";

export const metadata: Metadata = {
  title: "Finance",
  description: "Order value visibility, invoices, and settlement status for GVG Trade OS.",
};

const INVOICES = [
  { id: "INV-24018", account: "Pacific Wellness Co.", amount: "US$ 48,200", status: "open" },
  { id: "INV-24021", account: "EuroTools Distribution", amount: "US$ 22,750", status: "paid" },
  { id: "INV-24027", account: "Sakura Home Retail", amount: "US$ 9,840", status: "past_due" },
  { id: "INV-24031", account: "HarborCraft Manufacturing", amount: "US$ 15,600", status: "open" },
] as const;

export default function FinancePage() {
  return (
    <>
      <PageHero
        eyebrow="Module · Finance"
        title="Finance"
        description="訂單金額可視、發票與收款狀態。完整總帳與對帳於 Phase 2+。"
      />
      <section className="py-16">
        <Container>
          <div className="grid gap-3 sm:grid-cols-3">
            <div className="border-t-2 border-[var(--color-navy)] pt-3">
              <p className="text-xs text-[var(--color-muted)]">AR open</p>
              <p className="mt-1 font-[family-name:var(--font-display)] text-3xl font-semibold">US$ 420k</p>
            </div>
            <div className="border-t-2 border-[var(--color-navy)] pt-3">
              <p className="text-xs text-[var(--color-muted)]">Invoices</p>
              <p className="mt-1 font-[family-name:var(--font-display)] text-3xl font-semibold">64</p>
            </div>
            <div className="border-t-2 border-[var(--color-navy)] pt-3">
              <p className="text-xs text-[var(--color-muted)]">Past due</p>
              <p className="mt-1 font-[family-name:var(--font-display)] text-3xl font-semibold">7</p>
            </div>
          </div>

          <div className="mt-10 overflow-x-auto">
            <table className="w-full min-w-[640px] text-left text-sm">
              <thead>
                <tr className="border-b border-[var(--color-line)] text-xs uppercase tracking-[0.12em] text-[var(--color-muted)]">
                  <th className="py-3 pr-4">Invoice</th>
                  <th className="py-3 pr-4">Account</th>
                  <th className="py-3 pr-4">Amount</th>
                  <th className="py-3">Status</th>
                </tr>
              </thead>
              <tbody>
                {INVOICES.map((invoice) => (
                  <tr key={invoice.id} className="border-b border-[var(--color-line)]/70">
                    <td className="py-3 pr-4 font-mono text-xs font-semibold">{invoice.id}</td>
                    <td className="py-3 pr-4">{invoice.account}</td>
                    <td className="py-3 pr-4 font-semibold">{invoice.amount}</td>
                    <td className="py-3">
                      <Badge
                        tone={
                          invoice.status === "paid"
                            ? "success"
                            : invoice.status === "past_due"
                              ? "warning"
                              : "info"
                        }
                      >
                        {invoice.status.replace("_", " ")}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="mt-8 text-sm">
            <Link
              href="/operations/finance"
              className="font-semibold text-[var(--color-accent-strong)] hover:underline"
            >
              ← 營運中心 · 財務
            </Link>
          </p>
        </Container>
      </section>
    </>
  );
}
