"use client";

import { getEnabledWorkspaceNav } from "@gvg/core/navigation";
import { isModuleEnabled } from "@gvg/core/featureFlag";

export default function WorkspaceHomePage() {
  const modules = getEnabledWorkspaceNav().filter((m) => m.id !== "workspace");

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
        GLOBAL VISTA GROUP
      </p>
      <h1 style={{ margin: "8px 0 12px", fontSize: 36 }}>Workspace</h1>
      <p style={{ color: "#475569", maxWidth: 520 }}>
        Connecting Markets. Creating Value. — Modules gated by feature flags.
      </p>

      <p style={{ color: "#475569", maxWidth: 560, marginTop: 8, fontSize: 14 }}>
        Enabled: ai-center, marketplace, trade · Disabled: warehouse, crm, investment
      </p>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))",
          gap: 16,
          marginTop: 32,
        }}
      >
        {modules.map((item) => (
          <a
            key={item.id}
            href={item.href}
            style={{
              display: "block",
              padding: 20,
              borderRadius: 14,
              background: "#fff",
              border: "1px solid #E2E8F0",
              textDecoration: "none",
              color: "#0F172A",
              boxShadow: "0 1px 3px rgba(0,0,0,.08)",
              opacity: item.plugin && !isModuleEnabled(item.plugin) ? 0.45 : 1,
            }}
          >
            <div style={{ fontWeight: 600 }}>{item.label}</div>
            <div style={{ fontSize: 12, color: "#64748B", marginTop: 6 }}>
              {item.labelZh}
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}
