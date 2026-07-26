import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/atoms/Button";
import { Container } from "@/components/atoms/Container";
import { BRAND } from "@/lib/constants";

export const metadata: Metadata = {
  title: "關於 GVG",
  description: "了解 Global Vista Group 與 Global Trade OS。",
};

export default function AboutPage() {
  return (
    <section className="bg-white py-16">
      <Container className="max-w-3xl">
        <p className="text-xs text-[var(--color-muted)]">首頁 &gt; 關於 GVG</p>
        <h1 className="mt-3 font-[family-name:var(--font-display)] text-4xl font-semibold text-[var(--color-navy)]">
          關於 {BRAND.name}
        </h1>
        <p className="mt-5 text-base leading-relaxed text-[var(--color-muted)]">
          {BRAND.descriptionZh}
        </p>
        <p className="mt-4 text-base leading-relaxed text-[var(--color-muted)]">
          我們以企業級 Trade OS 整合市集、詢報價、訂單、倉儲物流、報關與 AI 採購助理，協助中大型貿易團隊以同一系統完成跨境作業。
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link href="/services">
            <Button>服務項目</Button>
          </Link>
          <Link href="/contact">
            <Button variant="outline">聯絡我們</Button>
          </Link>
        </div>
      </Container>
    </section>
  );
}
