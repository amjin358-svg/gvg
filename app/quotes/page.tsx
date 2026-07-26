import type { Metadata } from "next";
import { Container } from "@/components/atoms/Container";
import { StatusBadge } from "@/components/molecules/StatusBadge";
import { PageHero } from "@/components/organisms/PageHero";
import { quotes } from "@/frontend/data/mock/catalog";
import { formatCurrency, formatDate } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Quotes",
  description: "Supplier quotations linked to RFQs on GVG Trade OS.",
};

export default function QuotesPage() {
  return (
    <>
      <PageHero
        eyebrow="Module 06"
        title="Quotes"
        description="Compare unit price, lead time, and validity windows across supplier responses."
      />
      <section className="py-16">
        <Container>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[640px] text-left text-sm">
              <thead>
                <tr className="border-b border-[var(--color-line)] text-xs uppercase tracking-[0.12em] text-[var(--color-muted)]">
                  <th className="py-3 pr-4 font-semibold">Quote</th>
                  <th className="py-3 pr-4 font-semibold">RFQ</th>
                  <th className="py-3 pr-4 font-semibold">Supplier</th>
                  <th className="py-3 pr-4 font-semibold">Unit price</th>
                  <th className="py-3 pr-4 font-semibold">Lead time</th>
                  <th className="py-3 pr-4 font-semibold">Valid until</th>
                  <th className="py-3 font-semibold">Status</th>
                </tr>
              </thead>
              <tbody>
                {quotes.map((quote) => (
                  <tr key={quote.id} className="border-b border-[var(--color-line)]/70">
                    <td className="py-4 pr-4 font-medium">{quote.id}</td>
                    <td className="py-4 pr-4 text-[var(--color-muted)]">{quote.rfqId}</td>
                    <td className="py-4 pr-4">{quote.supplierName}</td>
                    <td className="py-4 pr-4">
                      {formatCurrency(quote.unitPrice, quote.currency)}
                    </td>
                    <td className="py-4 pr-4">{quote.leadTimeDays} days</td>
                    <td className="py-4 pr-4">{formatDate(quote.validUntil)}</td>
                    <td className="py-4">
                      <StatusBadge status={quote.status} />
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
