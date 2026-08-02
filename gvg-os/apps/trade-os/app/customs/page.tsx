import type { Metadata } from "next";
import { Container } from "@/components/atoms/Container";
import { PageHero } from "@/components/organisms/PageHero";

export const metadata: Metadata = {
  title: "Customs",
  description: "Customs documentation, HS classification, and clearance packets.",
};

const DOCUMENTS = [
  {
    title: "Commercial Invoice",
    description: "Structured invoice generation with multi-currency and Incoterms.",
  },
  {
    title: "Packing List",
    description: "Carton-level packing details synchronized with warehouse pick lists.",
  },
  {
    title: "HS Code Classification",
    description: "AI-assisted Harmonized System coding with audit trail.",
  },
  {
    title: "Certificate of Origin",
    description: "COO templates aligned to preferential trade programs.",
  },
];

export default function CustomsPage() {
  return (
    <>
      <PageHero
        eyebrow="Module 14"
        title="Customs Documentation"
        description="Prepare clearance packets, classify HS codes, and reduce hold risk across major ports."
      />
      <section className="py-16">
        <Container className="grid gap-8 sm:grid-cols-2">
          {DOCUMENTS.map((doc, index) => (
            <article key={doc.title} className="border-t border-[var(--color-line)] pt-5">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--color-accent-strong)]">
                {String(index + 1).padStart(2, "0")}
              </p>
              <h2 className="mt-3 font-[family-name:var(--font-display)] text-xl font-semibold">
                {doc.title}
              </h2>
              <p className="mt-2 text-sm text-[var(--color-muted)]">{doc.description}</p>
            </article>
          ))}
        </Container>
      </section>
    </>
  );
}
