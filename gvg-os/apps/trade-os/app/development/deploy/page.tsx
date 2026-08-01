import type { Metadata } from "next";
import Link from "next/link";
import { DevShell } from "@/frontend/features/development/DevShell";
import { DEPLOY_CHECKLIST, DEPLOY_ENVS } from "@/frontend/data/development/content";

export const metadata: Metadata = {
  title: "部署",
};

export default function DeployPage() {
  return (
    <DevShell
      title="Deploy"
      titleZh="部署"
      description="環境、CI、Hosting 與上線檢查。規格：docs/025_DEPLOYMENT.md。新 repo 指引：docs/027_NEW_GITHUB_REPO.md。"
    >
      <section className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {DEPLOY_ENVS.map((env) => (
          <article key={env.name} className="border border-[var(--color-line)] bg-white px-4 py-4">
            <p className="text-sm font-semibold text-[var(--color-navy)]">{env.name}</p>
            <p className="mt-1 text-xs text-[var(--color-muted)]">{env.purpose}</p>
          </article>
        ))}
      </section>

      <section className="mt-6 border border-[var(--color-line)] bg-white p-6">
        <h2 className="font-[family-name:var(--font-display)] text-xl font-semibold text-[var(--color-navy)]">
          CI pipeline
        </h2>
        <p className="mt-2 text-xs text-[var(--color-muted)]">.github/workflows/ci.yml</p>
        <ol className="mt-4 list-decimal space-y-1 pl-5 font-mono text-sm text-[var(--color-ink)]">
          <li>npm ci</li>
          <li>npm run lint</li>
          <li>npm run test</li>
          <li>npm run build</li>
        </ol>
      </section>

      <section className="mt-6 grid gap-4 lg:grid-cols-2">
        <div className="border border-[var(--color-line)] bg-white p-6">
          <h2 className="font-[family-name:var(--font-display)] text-lg font-semibold text-[var(--color-navy)]">
            Hosting map
          </h2>
          <ul className="mt-4 space-y-2 text-sm text-[var(--color-muted)]">
            <li>· App — Vercel (Next.js)</li>
            <li>· Edge / CDN / WAF — Cloudflare</li>
            <li>· Data — Supabase</li>
            <li>· Containers — docker/ (optional)</li>
          </ul>
        </div>
        <div className="border border-[var(--color-line)] bg-white p-6">
          <h2 className="font-[family-name:var(--font-display)] text-lg font-semibold text-[var(--color-navy)]">
            Release checklist
          </h2>
          <ul className="mt-4 space-y-2 text-sm text-[var(--color-muted)]">
            {DEPLOY_CHECKLIST.map((item) => (
              <li key={item} className="flex gap-2">
                <span className="text-[var(--color-gold-strong)]">□</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <p className="mt-8 text-sm">
        <Link
          href="/development/master-tasks"
          className="font-semibold text-[var(--color-accent-strong)] hover:underline"
        >
          查看主任務優先順序 →
        </Link>
      </p>
    </DevShell>
  );
}
