import type { Metadata } from "next";
import { Container } from "@/components/atoms/Container";
import { StatusBadge } from "@/components/molecules/StatusBadge";
import { PageHero } from "@/components/organisms/PageHero";
import { shipments } from "@/frontend/data/mock/catalog";
import { formatDate } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Logistics",
  description: "Ocean, air, rail, and truck shipment tracking.",
};

export default function LogisticsPage() {
  return (
    <>
      <PageHero
        eyebrow="Module 13"
        title="Logistics"
        description="Multi-modal freight booking and live tracking across ocean, air, rail, and truck."
      />
      <section className="py-16">
        <Container>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[720px] text-left text-sm">
              <thead>
                <tr className="border-b border-[var(--color-line)] text-xs uppercase tracking-[0.12em] text-[var(--color-muted)]">
                  <th className="py-3 pr-4 font-semibold">Tracking</th>
                  <th className="py-3 pr-4 font-semibold">Mode</th>
                  <th className="py-3 pr-4 font-semibold">Origin</th>
                  <th className="py-3 pr-4 font-semibold">Destination</th>
                  <th className="py-3 pr-4 font-semibold">ETD</th>
                  <th className="py-3 pr-4 font-semibold">ETA</th>
                  <th className="py-3 font-semibold">Status</th>
                </tr>
              </thead>
              <tbody>
                {shipments.map((shipment) => (
                  <tr key={shipment.id} className="border-b border-[var(--color-line)]/70">
                    <td className="py-4 pr-4 font-medium">{shipment.trackingNumber}</td>
                    <td className="py-4 pr-4 capitalize">{shipment.mode}</td>
                    <td className="py-4 pr-4">{shipment.origin}</td>
                    <td className="py-4 pr-4">{shipment.destination}</td>
                    <td className="py-4 pr-4">{formatDate(shipment.etd)}</td>
                    <td className="py-4 pr-4">{formatDate(shipment.eta)}</td>
                    <td className="py-4">
                      <StatusBadge status={shipment.status} />
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
