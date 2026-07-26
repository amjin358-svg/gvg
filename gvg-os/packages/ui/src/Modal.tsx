"use client";

import type { ReactNode } from "react";
import { useEffect } from "react";
import { cn } from "./cn";
import { Button } from "./Button";

export type ModalProps = {
  open: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
  footer?: ReactNode;
  className?: string;
};

export function Modal({ open, onClose, title, children, footer, className }: ModalProps) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[1050] flex items-center justify-center p-4" role="dialog" aria-modal>
      <button
        type="button"
        className="absolute inset-0 bg-black/45"
        aria-label="Close"
        onClick={onClose}
      />
      <div
        className={cn(
          "relative z-10 w-full max-w-lg rounded-[var(--gv-radius,14px)] bg-white shadow-[var(--gv-shadow-lg)]",
          className,
        )}
      >
        <div className="flex items-center justify-between border-b border-[var(--gv-border,#E2E8F0)] px-5 py-4">
          <h2 className="text-lg font-semibold text-[var(--gv-text,#0F172A)]">{title}</h2>
          <Button variant="ghost" size="sm" onClick={onClose} aria-label="Close modal">
            ✕
          </Button>
        </div>
        <div className="px-5 py-4">{children}</div>
        {footer ? <div className="border-t border-[var(--gv-border,#E2E8F0)] px-5 py-3">{footer}</div> : null}
      </div>
    </div>
  );
}
