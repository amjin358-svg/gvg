import type { FormHTMLAttributes, InputHTMLAttributes, LabelHTMLAttributes, ReactNode, SelectHTMLAttributes, TextareaHTMLAttributes } from "react";
import { cn } from "./cn";

export function Form({ className, ...props }: FormHTMLAttributes<HTMLFormElement>) {
  return <form className={cn("flex flex-col gap-4", className)} {...props} />;
}

export function Field({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn("flex flex-col gap-1.5", className)}>{children}</div>;
}

export function Label({ className, ...props }: LabelHTMLAttributes<HTMLLabelElement>) {
  return (
    <label
      className={cn("text-sm font-medium text-[var(--gv-text,#0F172A)]", className)}
      {...props}
    />
  );
}

const control =
  "h-11 w-full rounded-[var(--gv-radius,14px)] border border-[var(--gv-border,#E2E8F0)] bg-white px-3 text-sm text-[var(--gv-text,#0F172A)] outline-none focus:ring-2 focus:ring-[var(--gv-primary,#0B1F3A)]";

export function Input({ className, ...props }: InputHTMLAttributes<HTMLInputElement>) {
  return <input className={cn(control, className)} {...props} />;
}

export function Textarea({ className, ...props }: TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return <textarea className={cn(control, "h-auto min-h-24 py-2", className)} {...props} />;
}

export function Select({ className, ...props }: SelectHTMLAttributes<HTMLSelectElement>) {
  return <select className={cn(control, className)} {...props} />;
}

export function FormError({ children }: { children?: ReactNode }) {
  if (!children) return null;
  return <p className="text-xs text-red-600">{children}</p>;
}
