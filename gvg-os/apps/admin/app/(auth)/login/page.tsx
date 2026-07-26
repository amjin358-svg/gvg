"use client";

import { FormEvent, useEffect, useState, type CSSProperties } from "react";
import { useRouter } from "next/navigation";
import {
  login,
  readSession,
  resolveAuthPath,
  writeSession,
} from "@gvg/auth";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("admin@globalvistagroup.com");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  useEffect(() => {
    const session = readSession();
    const path = resolveAuthPath(session);
    if (path !== "/login") router.replace(path);
  }, [router]);

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setPending(true);
    try {
      const session = login(email, password);
      writeSession(session);
      router.push("/select-workspace");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed");
      setPending(false);
    }
  }

  return (
    <div
      style={{
        width: "100%",
        maxWidth: 420,
        background: "rgba(255,255,255,0.96)",
        borderRadius: 20,
        padding: "40px 36px",
        boxShadow: "0 24px 64px rgba(0,0,0,0.28)",
      }}
    >
      <div style={{ marginBottom: 28 }}>
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
        <h1 style={{ margin: "10px 0 8px", fontSize: 28, color: "#0B1F3A" }}>
          Login
        </h1>
        <p style={{ margin: 0, color: "#64748B", fontSize: 14, lineHeight: 1.5 }}>
          Sign in to continue to your workspace.
        </p>
      </div>

      <form onSubmit={onSubmit} style={{ display: "grid", gap: 16 }}>
        <label style={{ display: "grid", gap: 6 }}>
          <span style={{ fontSize: 12, fontWeight: 600, color: "#334155" }}>
            Email
          </span>
          <input
            type="email"
            autoComplete="username"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={inputStyle}
          />
        </label>

        <label style={{ display: "grid", gap: 6 }}>
          <span style={{ fontSize: 12, fontWeight: 600, color: "#334155" }}>
            Password
          </span>
          <input
            type="password"
            autoComplete="current-password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter password"
            style={inputStyle}
          />
        </label>

        {error ? (
          <p style={{ margin: 0, color: "#B91C1C", fontSize: 13 }}>{error}</p>
        ) : null}

        <button
          type="submit"
          disabled={pending}
          style={{
            marginTop: 8,
            height: 46,
            border: "none",
            borderRadius: 12,
            background: "#0B1F3A",
            color: "#fff",
            fontWeight: 600,
            fontSize: 15,
            cursor: pending ? "wait" : "pointer",
            opacity: pending ? 0.7 : 1,
          }}
        >
          {pending ? "Signing in…" : "Continue"}
        </button>
      </form>

      <p
        style={{
          marginTop: 20,
          fontSize: 12,
          color: "#94A3B8",
          textAlign: "center",
        }}
      >
        Connecting Markets. Creating Value.
      </p>
    </div>
  );
}

const inputStyle: CSSProperties = {
  height: 44,
  borderRadius: 10,
  border: "1px solid #E2E8F0",
  padding: "0 14px",
  fontSize: 14,
  outline: "none",
  background: "#F8FAFC",
};
