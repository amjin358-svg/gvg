import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/atoms/Container";
import { CORE_SERVICES } from "@/lib/constants";

export const metadata: Metadata = {
  title: "服務項目",
  description: "GVG 核心服務：國際貿易、全球採購、供應鏈、物流、合規、OEM/ODM。",
};

export default function ServicesPage() {
  return (
    <section className="bg-[var(--color-mist)] py-16">
      <Container>
        <p className="text-xs text-[var(--color-muted)]">首頁 &gt; 服務項目</p>
        <h1 className="mt-3 font-[family-name:var(--font-display)] text-4xl font-semibold text-[var(--color-navy)]">
          服務項目
        </h1>
        <p className="mt-4 max-w-2xl text-sm text-[var(--color-muted)]">
          對應平台核心商業模組，從尋源到交付提供一站式支援。
        </p>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {CORE_SERVICES.map((service) => (
            <Link
              key={service.title}
              href={service.href}
              className="rounded-xl border border-[var(--color-line)] bg-white p-6 transition-shadow hover:shadow-md"
            >
              <h2 className="font-[family-name:var(--font-display)] text-xl font-semibold">
                {service.title}
              </h2>
              <p className="mt-3 text-sm text-[var(--color-muted)]">{service.description}</p>
              <span className="mt-4 inline-flex items-center text-sm font-semibold text-[var(--color-navy)]">
                進入模組
                <ArrowRight className="ml-1 h-4 w-4" />
              </span>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}
