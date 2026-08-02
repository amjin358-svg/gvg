import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/atoms/Container";
import { PageHero } from "@/components/organisms/PageHero";
import { TRADE_SERVICES } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Procurement",
  description: "Global procurement workflows for purchasing and business buyers.",
};

export default function ProcurementPage() {
  const focus = TRADE_SERVICES.filter((service) =>
    ["global-procurement", "us-purchasing", "oem-odm", "ai-procurement"].includes(
      service.id,
    ),
  );

  return (
    <>
      <PageHero
        eyebrow="Module 08"
        title="Procurement"
        description="Centralize sourcing across regions, run US purchasing programs, and route OEM/ODM work with AI assistance."
      />
      <section className="py-16">
        <Container className="grid gap-10 sm:grid-cols-2">
          {focus.map((service, index) => (
            <article key={service.id} className="border-t border-[var(--color-line)] pt-5">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--color-accent-strong)]">
                {String(index + 1).padStart(2, "0")}
              </p>
              <h2 className="mt-3 font-[family-name:var(--font-display)] text-2xl font-semibold text-[var(--color-ink)]">
                {service.title}
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-[var(--color-muted)]">
                {service.description}
              </p>
            </article>
          ))}
        </Container>
        <Container className="mt-12">
          <Link
            href="/rfq"
            className="text-sm font-semibold text-[var(--color-accent-strong)] hover:underline"
          >
            Open RFQ workspace →
          </Link>
        </Container>
      </section>
    </>
  );
}
