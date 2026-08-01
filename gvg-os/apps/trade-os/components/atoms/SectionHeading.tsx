import Link from "next/link";
import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  description?: string;
  href?: string;
  linkLabel?: string;
  className?: string;
  align?: "left" | "center";
  light?: boolean;
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  href,
  linkLabel = "View all",
  className,
  align = "left",
  light = false,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between",
        align === "center" && "items-center text-center sm:flex-col sm:items-center",
        className,
      )}
    >
      <div className={cn("max-w-2xl", align === "center" && "mx-auto")}>
        {eyebrow ? (
          <p
            className={cn(
              "mb-2 text-xs font-semibold uppercase tracking-[0.18em]",
              light ? "text-white/70" : "text-[var(--color-accent-strong)]",
            )}
          >
            {eyebrow}
          </p>
        ) : null}
        <h2
          className={cn(
            "font-[family-name:var(--font-display)] text-3xl font-semibold tracking-tight sm:text-4xl",
            light ? "text-white" : "text-[var(--color-ink)]",
          )}
        >
          {title}
        </h2>
        {description ? (
          <p
            className={cn(
              "mt-3 text-base leading-relaxed",
              light ? "text-white/75" : "text-[var(--color-muted)]",
            )}
          >
            {description}
          </p>
        ) : null}
      </div>
      {href ? (
        <Link
          href={href}
          className={cn(
            "text-sm font-semibold underline-offset-4 hover:underline",
            light ? "text-white" : "text-[var(--color-accent-strong)]",
          )}
        >
          {linkLabel}
        </Link>
      ) : null}
    </div>
  );
}
