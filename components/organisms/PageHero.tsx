import Link from "next/link";
import { Container } from "@/components/atoms/Container";
import { cn } from "@/lib/utils";

interface PageHeroProps {
  title: string;
  description: string;
  eyebrow?: string;
  children?: React.ReactNode;
  compact?: boolean;
}

export function PageHero({
  title,
  description,
  eyebrow,
  children,
  compact = false,
}: PageHeroProps) {
  return (
    <section
      className={cn(
        "relative overflow-hidden bg-[var(--color-ink)] text-white",
        compact ? "pb-12 pt-10 sm:pt-12" : "pb-16 pt-12 sm:pb-20 sm:pt-16",
      )}
    >
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(26,122,109,0.35),transparent_50%),radial-gradient(ellipse_at_bottom_left,rgba(184,115,51,0.18),transparent_45%)]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.12]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.08) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
        aria-hidden
      />
      <Container className="relative">
        {eyebrow ? (
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-[var(--color-accent-soft)]">
            {eyebrow}
          </p>
        ) : null}
        <h1 className="max-w-3xl font-[family-name:var(--font-display)] text-4xl font-semibold tracking-tight sm:text-5xl">
          {title}
        </h1>
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-white/75 sm:text-lg">
          {description}
        </p>
        {children ? <div className="mt-8">{children}</div> : null}
      </Container>
    </section>
  );
}

interface EmptyStateProps {
  title: string;
  description: string;
  actionHref?: string;
  actionLabel?: string;
}

export function EmptyHint({
  title,
  description,
  actionHref,
  actionLabel,
}: EmptyStateProps) {
  return (
    <div className="border border-dashed border-[var(--color-line)] px-6 py-10 text-center">
      <h3 className="font-[family-name:var(--font-display)] text-xl font-semibold text-[var(--color-ink)]">
        {title}
      </h3>
      <p className="mx-auto mt-2 max-w-md text-sm text-[var(--color-muted)]">{description}</p>
      {actionHref && actionLabel ? (
        <Link
          href={actionHref}
          className="mt-4 inline-block text-sm font-semibold text-[var(--color-accent-strong)] hover:underline"
        >
          {actionLabel}
        </Link>
      ) : null}
    </div>
  );
}
