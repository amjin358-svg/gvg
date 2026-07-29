import { cva, type VariantProps } from "class-variance-authority";
import type { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 rounded-md text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        primary:
          "bg-[var(--color-navy)] text-white hover:bg-[var(--color-accent-strong)]",
        secondary:
          "bg-[var(--color-ink)] text-white hover:bg-[var(--color-ink-soft)]",
        gold: "bg-[var(--color-gold)] text-[var(--color-navy)] hover:bg-[var(--color-gold-strong)]",
        outline:
          "border border-[var(--color-line)] bg-transparent text-[var(--color-ink)] hover:bg-white",
        outlineLight:
          "border border-white/80 bg-transparent text-white hover:bg-white/10",
        ghost: "text-[var(--color-ink)] hover:bg-black/5",
        soft: "bg-white/15 text-white backdrop-blur-sm hover:bg-white/25",
      },
      size: {
        sm: "h-9 px-3",
        md: "h-11 px-5",
        lg: "h-12 px-6 text-base",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  },
);

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

export function Button({
  className,
  variant,
  size,
  type = "button",
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={cn(buttonVariants({ variant, size }), className)}
      {...props}
    />
  );
}

export { buttonVariants };
