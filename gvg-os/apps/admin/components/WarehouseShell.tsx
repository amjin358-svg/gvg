"use client";

import type { CSSProperties, ReactNode } from "react";
import { usePathname } from "next/navigation";
import { WAREHOUSE_MODULES } from "@gvg/plugin-warehouse";

export function WarehouseShell({
  title,
  titleZh,
  children,
}: {
  title: string;
  titleZh?: string;
  children?: ReactNode;
}) {
  const pathname = usePathname();

  return (
    <div>
      <p
        style={{
          color: "#C8A35F",
          letterSpacing: "0.18em",
          fontSize: 12,
          fontWeight: 600,
        }}
      >
        WAREHOUSE
      </p>
      <h1 style={{ margin: "8px 0 8px", fontSize: 32 }}>{title}</h1>
      {titleZh ? (
        <p style={{ color: "#64748B", marginTop: 0 }}>{titleZh}</p>
      ) : null}

      <nav
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: 8,
          marginTop: 20,
          marginBottom: 28,
          borderBottom: "1px solid #E2E8F0",
          paddingBottom: 12,
        }}
      >
        <a href="/warehouse" style={tabStyle(pathname === "/warehouse")}>
          Overview
        </a>
        {WAREHOUSE_MODULES.map((m) => (
          <a
            key={m.id}
            href={m.href}
            style={tabStyle(
              pathname === m.href || pathname.startsWith(`${m.href}/`),
            )}
          >
            {m.label}
          </a>
        ))}
      </nav>

      {children}
    </div>
  );
}

function tabStyle(active: boolean): CSSProperties {
  return {
    textDecoration: "none",
    color: active ? "#0B1F3A" : "#64748B",
    fontWeight: active ? 650 : 500,
    fontSize: 13,
    padding: "6px 10px",
    borderRadius: 8,
    background: active ? "rgba(200,163,95,0.16)" : "transparent",
  };
}
