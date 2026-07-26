"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  hasWorkspace,
  isAuthenticated,
  readSession,
  setSessionWorkspace,
  type AuthSession,
} from "@gvg/auth";
import {
  WORKSPACE_OPTIONS,
  selectWorkspace,
  type Workspace,
} from "@gvg/core/workspace";

const KIND_LABEL: Record<Workspace["kind"], string> = {
  hq: "Headquarters",
  region: "Region",
  branch: "Office",
  project: "Project",
  admin: "Admin",
};

export default function SelectWorkspacePage() {
  const router = useRouter();
  const [session, setSession] = useState<AuthSession | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  useEffect(() => {
    const current = readSession();
    if (!isAuthenticated(current)) {
      router.replace("/login");
      return;
    }
    if (hasWorkspace(current)) {
      router.replace("/load-plugins");
      return;
    }
    setSession(current);
  }, [router]);

  function enterWorkspace(workspace: Workspace) {
    if (!session) return;
    selectWorkspace(workspace.id);
    setSessionWorkspace(session, workspace.id);
    setSelectedId(workspace.id);
    router.push("/load-plugins");
  }

  if (!session) {
    return (
      <div style={{ color: "rgba(255,255,255,0.7)", fontSize: 14 }}>
        Loading…
      </div>
    );
  }

  return (
    <div style={{ width: "100%", maxWidth: 720 }}>
      <div style={{ textAlign: "center", marginBottom: 36, color: "#fff" }}>
        <div
          style={{
            fontSize: 11,
            letterSpacing: "0.22em",
            color: "#C8A35F",
            fontWeight: 700,
          }}
        >
          GLOBAL VISTA GROUP
        </div>
        <h1 style={{ margin: "12px 0 8px", fontSize: 32, fontWeight: 650 }}>
          Workspace Selector
        </h1>
        <p style={{ margin: 0, opacity: 0.7, fontSize: 15 }}>
          Choose a workspace to open your dashboard, {session.user.name}.
        </p>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: 14,
        }}
      >
        {WORKSPACE_OPTIONS.map((workspace) => {
          const active = selectedId === workspace.id;
          return (
            <button
              key={workspace.id}
              type="button"
              onClick={() => enterWorkspace(workspace)}
              style={{
                textAlign: "left",
                padding: "22px 20px",
                borderRadius: 16,
                border: active
                  ? "1px solid #C8A35F"
                  : "1px solid rgba(255,255,255,0.12)",
                background: active
                  ? "rgba(200,163,95,0.16)"
                  : "rgba(255,255,255,0.06)",
                color: "#fff",
                cursor: "pointer",
                transition: "border-color 160ms ease, background 160ms ease",
              }}
            >
              <div
                style={{
                  fontSize: 11,
                  letterSpacing: "0.14em",
                  color: "#C8A35F",
                  fontWeight: 600,
                  marginBottom: 8,
                }}
              >
                {KIND_LABEL[workspace.kind].toUpperCase()}
                {workspace.region ? ` · ${workspace.region}` : ""}
              </div>
              <div style={{ fontSize: 18, fontWeight: 650 }}>
                {workspace.name}
              </div>
              <div
                style={{
                  marginTop: 8,
                  fontSize: 13,
                  opacity: 0.55,
                }}
              >
                Continue to Load Plugins →
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
