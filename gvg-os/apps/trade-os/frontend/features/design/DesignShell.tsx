"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutTemplate } from "lucide-react";
import { Container } from "@/components/atoms/Container";
import { DESIGN_NAV } from "@/frontend/data/design/content";
import { cn } from "@/lib/utils";

export function DesignShell({
  title,
  titleZh,
  description,
  children,
}: {
  title: string;
  titleZh: string;
  description: string;
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <div className="bg-[var(--color-mist)] pb-16">
      <Container className="grid gap-8 py-8 lg:grid-cols-[260px_1fr]">
        <aside className="h-fit rounded-xl border border-[var(--color-line)] bg-white p-4">
          <div className="mb-4 flex items-center gap-2 px-2">
            <LayoutTemplate className="h-4 w-4 text-[var(--color-navy)]" />
            <div>
              <p className="text-sm font-semibold text-[var(--color-navy)]">Design Center</p>
              <p className="text-xs text-[var(--color-muted)]">GVG 設計中心</p>
            </div>
          </div>
          <ul className="space-y-1">
            {DESIGN_NAV.map((item) => {
              const active =
                item.href === "/design"
                  ? pathname === "/design"
                  : pathname === item.href || pathname.startsWith(`${item.href}/`);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={cn(
                      "block rounded-md px-2 py-2 text-sm transition-colors",
                      active
                        ? "bg-[var(--color-navy)] text-white"
                        : "text-[var(--color-muted)] hover:bg-[var(--color-mist)] hover:text-[var(--color-ink)]",
                    )}
                  >
                    <span className="block font-medium">{item.labelZh}</span>
                    <span className={cn("block text-[11px]", active ? "text-white/70" : "text-[var(--color-muted)]")}>
                      {item.label}
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
          <div className="mt-6 rounded-lg bg-[var(--color-mist)] p-4 text-xs leading-relaxed text-[var(--color-muted)]">
            Tokens：`styles/globals.css`
            <br />
            文件：`docs/brand/` · `.cursor/rules/design.mdc`
          </div>
        </aside>

        <div>
          <p className="text-xs text-[var(--color-muted)]">首頁 &gt; 設計中心 &gt; {titleZh}</p>
          <h1 className="mt-3 font-[family-name:var(--font-display)] text-3xl font-semibold text-[var(--color-navy)] sm:text-4xl">
            {titleZh}
          </h1>
          <p className="mt-1 text-sm font-medium text-[var(--color-gold-strong)]">{title}</p>
          <p className="mt-4 max-w-3xl text-sm leading-relaxed text-[var(--color-muted)]">
            {description}
          </p>
          <div className="mt-8">{children}</div>
        </div>
      </Container>
    </div>
  );
}
