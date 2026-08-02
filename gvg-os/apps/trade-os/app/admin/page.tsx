import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/atoms/Container";
import { PageHero } from "@/components/organisms/PageHero";
import { PLATFORM_MODULES } from "@/lib/constants";
import { ROLE_LABELS, USER_ROLES } from "@/types/roles";

export const metadata: Metadata = {
  title: "Admin Dashboard",
  description: "Platform control center for Admin and Super Admin roles.",
};

export default function AdminPage() {
  return (
    <>
      <PageHero
        eyebrow="Module 20"
        title="Admin Dashboard"
        description="Platform configuration, role governance, module health, and operational oversight."
      />
      <section className="py-16">
        <Container className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <h2 className="font-[family-name:var(--font-display)] text-2xl font-semibold">
              Role matrix
            </h2>
            <ul className="mt-5 space-y-2">
              {USER_ROLES.map((role) => (
                <li
                  key={role}
                  className="flex items-center justify-between border-b border-[var(--color-line)] py-2 text-sm"
                >
                  <span className="font-medium text-[var(--color-ink)]">{ROLE_LABELS[role]}</span>
                  <span className="text-[var(--color-muted)]">{role}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="font-[family-name:var(--font-display)] text-2xl font-semibold">
              Platform modules
            </h2>
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              {PLATFORM_MODULES.map((module) => (
                <Link
                  key={module.id}
                  href={module.href}
                  className="border-b border-[var(--color-line)] py-3 transition-colors hover:border-[var(--color-accent)]"
                >
                  <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--color-muted)]">
                    {module.id}
                  </p>
                  <p className="mt-1 font-semibold text-[var(--color-ink)]">{module.name}</p>
                  <p className="mt-1 text-xs text-[var(--color-muted)]">{module.description}</p>
                </Link>
              ))}
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
