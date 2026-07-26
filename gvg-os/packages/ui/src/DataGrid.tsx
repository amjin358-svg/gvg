"use client";

import { useMemo, useState, type ReactNode } from "react";
import { cn } from "./cn";
import { Input } from "./Form";
import { Table, TBody, TD, TH, THead, TR } from "./Table";

export type DataGridColumn<T> = {
  id: string;
  header: string;
  accessor: (row: T) => ReactNode;
  sortable?: boolean;
  sortValue?: (row: T) => string | number;
};

export type DataGridProps<T extends { id: string }> = {
  columns: DataGridColumn<T>[];
  rows: T[];
  searchable?: boolean;
  className?: string;
};

export function DataGrid<T extends { id: string }>({
  columns,
  rows,
  searchable = true,
  className,
}: DataGridProps<T>) {
  const [query, setQuery] = useState("");
  const [sortId, setSortId] = useState<string | null>(null);
  const [asc, setAsc] = useState(true);

  const filtered = useMemo(() => {
    let next = rows;
    if (query.trim()) {
      const q = query.toLowerCase();
      next = next.filter((row) =>
        columns.some((c) => String(c.accessor(row) ?? "").toLowerCase().includes(q)),
      );
    }
    if (sortId) {
      const col = columns.find((c) => c.id === sortId);
      if (col?.sortValue) {
        next = [...next].sort((a, b) => {
          const av = col.sortValue!(a);
          const bv = col.sortValue!(b);
          if (av < bv) return asc ? -1 : 1;
          if (av > bv) return asc ? 1 : -1;
          return 0;
        });
      }
    }
    return next;
  }, [rows, columns, query, sortId, asc]);

  return (
    <div className={cn("space-y-3", className)}>
      {searchable ? (
        <Input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Filter rows…"
          aria-label="Filter"
        />
      ) : null}
      <Table>
        <THead>
          <TR>
            {columns.map((col) => (
              <TH key={col.id}>
                {col.sortable ? (
                  <button
                    type="button"
                    className="uppercase tracking-wide"
                    onClick={() => {
                      if (sortId === col.id) setAsc(!asc);
                      else {
                        setSortId(col.id);
                        setAsc(true);
                      }
                    }}
                  >
                    {col.header}
                    {sortId === col.id ? (asc ? " ↑" : " ↓") : ""}
                  </button>
                ) : (
                  col.header
                )}
              </TH>
            ))}
          </TR>
        </THead>
        <TBody>
          {filtered.map((row) => (
            <TR key={row.id}>
              {columns.map((col) => (
                <TD key={col.id}>{col.accessor(row)}</TD>
              ))}
            </TR>
          ))}
        </TBody>
      </Table>
    </div>
  );
}
