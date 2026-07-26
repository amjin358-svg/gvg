import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "./cn";

export type CardProps = HTMLAttributes<HTMLDivElement> & {
  title?: string;
  description?: string;
  footer?: ReactNode;
};

export function Card({ title, description, footer, className, children, ...props }: CardProps) {
  return (
    <div
      className={cn(
        "rounded-[var(--gv-radius,14px)] border border-[var(--gv-border,#E2E8F0)] bg-[var(--gv-card,#fff)] shadow-[var(--gv-shadow-sm)]",
        className,
      )}
      {...props}
    >
      {(title || description) && (
        <div className="border-b border-[var(--gv-border,#E2E8F0)] px-5 py-4">
          {title ? <h3 className="text-base font-semibold text-[var(--gv-text,#0F172A)]">{title}</h3> : null}
          {description ? <p className="mt-1 text-sm text-[var(--gv-text-secondary,#475569)]">{description}</p> : null}
        </div>
      )}
      <div className="px-5 py-4">{children}</div>
      {footer ? (
        <div className="border-t border-[var(--gv-border,#E2E8F0)] px-5 py-3">{footer}</div>
      ) : null}
    </div>
  );
}
