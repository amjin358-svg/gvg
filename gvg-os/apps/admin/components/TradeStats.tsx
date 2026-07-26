"use client";

import { useEffect, useState } from "react";
import { getTradeStats, type TradeStat } from "@gvg/plugin-trade";

export function TradeStats({ compact = false }: { compact?: boolean }) {
  const [stats, setStats] = useState<TradeStat[]>([]);

  useEffect(() => {
    let cancelled = false;
    getTradeStats().then((next) => {
      if (!cancelled) setStats(next);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: compact
          ? "repeat(3, minmax(0, 1fr))"
          : "repeat(auto-fit, minmax(160px, 1fr))",
        gap: 14,
        marginBottom: compact ? 0 : 28,
      }}
    >
      {stats.map((stat) => (
        <a
          key={stat.id}
          href={stat.href}
          style={{
            display: "block",
            padding: compact ? "16px 18px" : "20px 22px",
            borderRadius: 14,
            background: "#fff",
            border: "1px solid #E2E8F0",
            textDecoration: "none",
            color: "#0F172A",
            boxShadow: "0 1px 3px rgba(0,0,0,.06)",
          }}
        >
          <div
            style={{
              fontSize: 12,
              letterSpacing: "0.08em",
              color: "#94A3B8",
              fontWeight: 600,
            }}
          >
            {stat.label.toUpperCase()}
          </div>
          <div
            style={{
              marginTop: 10,
              fontSize: compact ? 28 : 34,
              fontWeight: 700,
              color: "#0B1F3A",
              lineHeight: 1,
            }}
          >
            {stat.value}
          </div>
          <div style={{ marginTop: 8, fontSize: 12, color: "#64748B" }}>
            {stat.labelZh}
          </div>
        </a>
      ))}
    </div>
  );
}
