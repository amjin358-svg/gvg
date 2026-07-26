import type { HTMLAttributes, ReactNode, TdHTMLAttributes, ThHTMLAttributes } from "react";
import { cn } from "./cn";

export function Table({ className, ...props }: HTMLAttributes<HTMLTableElement>) {
  return (
    <div className="w-full overflow-x-auto rounded-[var(--gv-radius,14px)] border border-[var(--gv-border,#E2E8F0)]">
      <table className={cn("w-full border-collapse text-sm", className)} {...props} />
    </div>
  );
}

export function THead(props: HTMLAttributes<HTMLTableSectionElement>) {
  return <thead className="bg-[var(--gv-surface,#F8FAFC)] text-left" {...props} />;
}

export function TBody(props: HTMLAttributes<HTMLTableSectionElement>) {
  return <tbody {...props} />;
}

export function TR({ className, ...props }: HTMLAttributes<HTMLTableRowElement>) {
  return <tr className={cn("border-t border-[var(--gv-border,#E2E8F0)]", className)} {...props} />;
}

export function TH({ className, ...props }: ThHTMLAttributes<HTMLTableCellElement>) {
  return (
    <th
      className={cn("px-4 py-3 text-xs font-semibold uppercase tracking-wide text-[var(--gv-text-secondary,#475569)]", className)}
      {...props}
    />
  );
}

export function TD({ className, ...props }: TdHTMLAttributes<HTMLTableCellElement>) {
  return <td className={cn("px-4 py-3 text-[var(--gv-text,#0F172A)]", className)} {...props} />;
}

export type SimpleColumn<T> = { key: keyof T | string; header: string; render?: (row: T) => ReactNode };

export function SimpleTable<T extends { id?: string }>({
  columns,
  rows,
}: {
  columns: SimpleColumn<T>[];
  rows: T[];
}) {
  return (
    <Table>
      <THead>
        <TR>
          {columns.map((c) => (
            <TH key={String(c.key)}>{c.header}</TH>
          ))}
        </TR>
      </THead>
      <TBody>
        {rows.map((row, i) => (
          <TR key={row.id ?? i}>
            {columns.map((c) => (
              <TD key={String(c.key)}>
                {c.render ? c.render(row) : String((row as Record<string, unknown>)[c.key as string] ?? "")}
              </TD>
            ))}
          </TR>
        ))}
      </TBody>
    </Table>
  );
}
