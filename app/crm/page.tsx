import type { Metadata } from "next";
import { Container } from "@/components/atoms/Container";
import { PageHero } from "@/components/organisms/PageHero";
import { ROLE_LABELS } from "@/types/roles";

export const metadata: Metadata = {
  title: "CRM",
  description: "Account relationships for buyers, suppliers, and sales teams.",
};

const ACCOUNTS = [
  { name: "Pacific Wellness Co.", type: "Business Customer", owner: "Sales", stage: "Active" },
  { name: "HarborCraft Manufacturing", type: "Supplier", owner: "Purchasing", stage: "Preferred" },
  { name: "EuroTools Distribution", type: "Business Customer", owner: "Sales", stage: "Negotiation" },
  { name: "Sakura Home Retail", type: "Customer", owner: "Sales", stage: "Active" },
];

export default function CrmPage() {
  return (
    <>
      <PageHero
        eyebrow="Module 15"
        title="CRM"
        description="Relationship intelligence across buyers, suppliers, and internal sales or purchasing owners."
      />
      <section className="py-16">
        <Container>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[640px] text-left text-sm">
              <thead>
                <tr className="border-b border-[var(--color-line)] text-xs uppercase tracking-[0.12em] text-[var(--color-muted)]">
                  <th className="py-3 pr-4 font-semibold">Account</th>
                  <th className="py-3 pr-4 font-semibold">Type</th>
                  <th className="py-3 pr-4 font-semibold">Owner role</th>
                  <th className="py-3 font-semibold">Stage</th>
                </tr>
              </thead>
              <tbody>
                {ACCOUNTS.map((account) => (
                  <tr key={account.name} className="border-b border-[var(--color-line)]/70">
                    <td className="py-4 pr-4 font-medium">{account.name}</td>
                    <td className="py-4 pr-4">{account.type}</td>
                    <td className="py-4 pr-4">{account.owner}</td>
                    <td className="py-4">{account.stage}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-8 text-sm text-[var(--color-muted)]">
            Role coverage includes {ROLE_LABELS.sales}, {ROLE_LABELS.purchasing}, and{" "}
            {ROLE_LABELS.admin}.
          </p>
        </Container>
      </section>
    </>
  );
}
