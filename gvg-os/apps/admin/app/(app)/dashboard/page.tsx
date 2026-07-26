"use client";

import { useEffect, useState } from "react";
import { readSession } from "@gvg/auth";
import { getWorkspace, type Workspace } from "@gvg/core/workspace";
import { MarketplaceStats } from "../../../components/MarketplaceStats";
import { TradeStats } from "../../../components/TradeStats";

export default function DashboardPage() {
  const [workspace, setWorkspace] = useState<Workspace | null>(null);
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const session = readSession();
    setUserName(session?.user.name ?? "");
    if (session?.workspaceId) {
      setWorkspace(getWorkspace(session.workspaceId) ?? null);
    }
  }, []);

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
        GVG WORKSPACE
      </p>
      <h1 style={{ margin: "8px 0 8px", fontSize: 32 }}>Dashboard</h1>
      <p style={{ color: "#64748B", marginTop: 0 }}>儀表板</p>

      <div style={{ marginTop: 28 }}>
        <p
          style={{
            margin: "0 0 12px",
            fontSize: 12,
            letterSpacing: "0.12em",
            color: "#94A3B8",
            fontWeight: 600,
          }}
        >
          MARKETPLACE
        </p>
        <MarketplaceStats />
      </div>

      <div style={{ marginTop: 8 }}>
        <p
          style={{
            margin: "0 0 12px",
            fontSize: 12,
            letterSpacing: "0.12em",
            color: "#94A3B8",
            fontWeight: 600,
          }}
        >
          TRADE
        </p>
        <TradeStats />
      </div>

      <div
        style={{
          marginTop: 8,
          padding: 24,
          borderRadius: 16,
          background: "#fff",
          border: "1px solid #E2E8F0",
          maxWidth: 560,
        }}
      >
        <div style={{ fontSize: 12, color: "#94A3B8", letterSpacing: "0.12em" }}>
          ACTIVE WORKSPACE
        </div>
        <div style={{ fontSize: 22, fontWeight: 650, marginTop: 8, color: "#0B1F3A" }}>
          {workspace?.name ?? "—"}
        </div>
        <div style={{ marginTop: 8, color: "#64748B", fontSize: 14 }}>
          {workspace?.region ? `${workspace.region} · ` : ""}
          {workspace?.kind ?? ""}
          {userName ? ` · ${userName}` : ""}
        </div>
      </div>
    </div>
  );
}
