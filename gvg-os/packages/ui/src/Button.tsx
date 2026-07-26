import { cva, type VariantProps } from "class-variance-authority";
import type { ButtonHTMLAttributes } from "react";
import { cn } from "./cn";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 rounded-[var(--gv-radius,14px)] text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--gv-primary,#0B1F3A)] focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        primary:
          "bg-[var(--gv-primary,#0B1F3A)] text-white shadow-[var(--gv-shadow-sm)] hover:opacity-90",
        secondary:
          "bg-[var(--gv-secondary,#C8A35F)] text-[var(--gv-primary,#0B1F3A)] shadow-[var(--gv-shadow-sm)] hover:brightness-95",
        outline:
          "border border-[var(--gv-border,#E2E8F0)] bg-transparent text-[var(--gv-text,#0F172A)] hover:bg-[var(--gv-surface,#F8FAFC)]",
        ghost: "text-[var(--gv-text,#0F172A)] hover:bg-[var(--gv-surface,#F8FAFC)]",
        danger: "bg-red-600 text-white hover:bg-red-700",
      },
      size: {
        sm: "h-9 px-3",
        md: "h-11 px-5",
        lg: "h-12 px-6 text-base",
      },
    },
    defaultVariants: { variant: "primary", size: "md" },
  },
);

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants>;

export function Button({ className, variant, size, type = "button", ...props }: ButtonProps) {
  return (
    <button
      type={type}
      className={cn(buttonVariants({ variant, size }), className)}
      {...props}
    />
  );
}

export { buttonVariants };
