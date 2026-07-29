"use client";

type Props = {
  children: React.ReactNode;
  className?: string;
  href?: string;
};

/**
 * Glass + gold hover CTA — Shadcn-like primitive without heavy install.
 */
export function GlassButton({ children, className = "", href }: Props) {
  const cls = `cx-glass-btn ${className}`.trim();
  if (href) {
    return (
      <a className={cls} href={href}>
        <span className="cx-glass-btn__shine" aria-hidden />
        <span className="cx-glass-btn__label">{children}</span>
      </a>
    );
  }
  return (
    <button type="button" className={cls}>
      <span className="cx-glass-btn__shine" aria-hidden />
      <span className="cx-glass-btn__label">{children}</span>
    </button>
  );
}
