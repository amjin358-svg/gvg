import type { Metadata } from "next";
import { Button } from "@/components/atoms/Button";
import { Container } from "@/components/atoms/Container";

export const metadata: Metadata = {
  title: "聯絡我們",
  description: "聯絡 Global Vista Group 商務與支援團隊。",
};

export default function ContactPage() {
  return (
    <section className="bg-white py-16">
      <Container className="grid gap-10 lg:grid-cols-[1fr_1fr]">
        <div>
          <p className="text-xs text-[var(--color-muted)]">首頁 &gt; 聯絡我們</p>
          <h1 className="mt-3 font-[family-name:var(--font-display)] text-4xl font-semibold text-[var(--color-navy)]">
            聯絡我們
          </h1>
          <p className="mt-4 text-sm leading-relaxed text-[var(--color-muted)]">
            留下需求，我們的貿易顧問將與您聯繫。也可先使用「立即詢價」或 AI 智慧採購助理。
          </p>
          <dl className="mt-8 space-y-3 text-sm">
            <div>
              <dt className="text-[var(--color-muted)]">Email</dt>
              <dd className="font-semibold">ops@globalvistagroup.com</dd>
            </div>
            <div>
              <dt className="text-[var(--color-muted)]">據點</dt>
              <dd className="font-semibold">Los Angeles · Taipei · Rotterdam</dd>
            </div>
          </dl>
        </div>

        <form className="rounded-xl border border-[var(--color-line)] bg-[var(--color-mist)] p-6">
          <label className="block text-sm font-medium">
            姓名
            <input
              name="name"
              required
              className="mt-1 h-11 w-full rounded-md border border-[var(--color-line)] bg-white px-3"
            />
          </label>
          <label className="mt-4 block text-sm font-medium">
            Email
            <input
              type="email"
              name="email"
              required
              className="mt-1 h-11 w-full rounded-md border border-[var(--color-line)] bg-white px-3"
            />
          </label>
          <label className="mt-4 block text-sm font-medium">
            公司
            <input
              name="company"
              className="mt-1 h-11 w-full rounded-md border border-[var(--color-line)] bg-white px-3"
            />
          </label>
          <label className="mt-4 block text-sm font-medium">
            需求說明
            <textarea
              name="message"
              required
              rows={5}
              className="mt-1 w-full rounded-md border border-[var(--color-line)] bg-white px-3 py-2"
            />
          </label>
          <Button type="submit" className="mt-5 w-full">
            送出訊息
          </Button>
        </form>
      </Container>
    </section>
  );
}
