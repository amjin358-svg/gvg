import type { Metadata } from "next";
import { DevShell } from "@/frontend/features/development/DevShell";
import { CLOUDFLARE_ROLES } from "@/frontend/data/development/content";

export const metadata: Metadata = {
  title: "Cloudflare",
};

export default function CloudflarePage() {
  return (
    <DevShell
      title="Cloudflare"
      titleZh="Cloudflare"
      description="邊緣加速、DNS、WAF。可選 Pages／Workers／R2／KV。主要應用可仍部署於 Vercel；Cloudflare 負責邊緣防護與快取。"
    >
      <section className="grid gap-4 lg:grid-cols-2">
        {CLOUDFLARE_ROLES.map((item) => (
          <article key={item.title} className="border-t border-[var(--color-line)] bg-white px-5 py-4">
            <h2 className="text-sm font-semibold text-[var(--color-navy)]">{item.title}</h2>
            <p className="mt-2 text-sm leading-relaxed text-[var(--color-muted)]">{item.body}</p>
          </article>
        ))}
      </section>

      <section className="mt-6 border border-[var(--color-line)] bg-[var(--color-navy)] p-6 text-white">
        <h2 className="font-[family-name:var(--font-display)] text-lg font-semibold">Recommended path</h2>
        <ol className="mt-4 list-decimal space-y-2 pl-5 text-sm text-white/80">
          <li>Point DNS to production origin (Vercel or Docker host)</li>
          <li>Enable WAF + bot fight on public routes</li>
          <li>Cache static `_next/static` aggressively</li>
          <li>Later: Workers for edge redirects / AI experiments</li>
        </ol>
      </section>
    </DevShell>
  );
}
