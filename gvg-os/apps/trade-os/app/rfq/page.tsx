import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/atoms/Button";
import { Container } from "@/components/atoms/Container";
import { StatusBadge } from "@/components/molecules/StatusBadge";
import { PageHero } from "@/components/organisms/PageHero";
import { rfqs } from "@/frontend/data/mock/catalog";
import { formatCurrency, formatDate } from "@/lib/utils";

export const metadata: Metadata = {
  title: "RFQ",
  description: "Create and manage requests for quotation across GVG suppliers.",
};

export default function RfqPage() {
  return (
    <>
      <PageHero
        eyebrow="Module 05"
        title="Request for Quotation"
        description="Publish RFQs to matched suppliers, compare responses, and move winning quotes into orders."
      >
        <Link href="/ai">
          <Button variant="soft">Draft with AI Assistant</Button>
        </Link>
      </PageHero>
      <section className="py-16">
        <Container>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[720px] text-left text-sm">
              <thead>
                <tr className="border-b border-[var(--color-line)] text-xs uppercase tracking-[0.12em] text-[var(--color-muted)]">
                  <th className="py-3 pr-4 font-semibold">RFQ</th>
                  <th className="py-3 pr-4 font-semibold">Buyer</th>
                  <th className="py-3 pr-4 font-semibold">Qty</th>
                  <th className="py-3 pr-4 font-semibold">Target</th>
                  <th className="py-3 pr-4 font-semibold">Destination</th>
                  <th className="py-3 pr-4 font-semibold">Created</th>
                  <th className="py-3 font-semibold">Status</th>
                </tr>
              </thead>
              <tbody>
                {rfqs.map((rfq) => (
                  <tr key={rfq.id} className="border-b border-[var(--color-line)]/70">
                    <td className="py-4 pr-4 font-medium text-[var(--color-ink)]">{rfq.title}</td>
                    <td className="py-4 pr-4 text-[var(--color-muted)]">{rfq.buyerName}</td>
                    <td className="py-4 pr-4">{rfq.quantity.toLocaleString()}</td>
                    <td className="py-4 pr-4">
                      {rfq.targetPrice
                        ? formatCurrency(rfq.targetPrice, rfq.currency)
                        : "—"}
                    </td>
                    <td className="py-4 pr-4">{rfq.destination}</td>
                    <td className="py-4 pr-4">{formatDate(rfq.createdAt)}</td>
                    <td className="py-4">
                      <StatusBadge status={rfq.status} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Container>
      </section>
    </>
  );
}
