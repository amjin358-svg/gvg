"use client";

import { useEffect } from "react";

/**
 * Root entry restores the original corporate homepage (portal).
 * V4 cinematic backup: gvg-os/apps/v4 · Interactive Movie: /experience
 */
export default function MarketingHomePage() {
  const portal = process.env.NEXT_PUBLIC_PORTAL_URL || "http://localhost:3001";

  useEffect(() => {
    window.location.replace(portal);
  }, [portal]);

  return (
    <main
      style={{
        minHeight: "100svh",
        display: "grid",
        placeItems: "center",
        fontFamily: "system-ui, sans-serif",
        background: "#001a36",
        color: "#fff",
        padding: "2rem",
        textAlign: "center",
      }}
    >
      <div>
        <p style={{ opacity: 0.8, letterSpacing: "0.12em" }}>GLOBAL VISTA GROUP</p>
        <h1 style={{ margin: "0.5rem 0 1rem" }}>前往企業官網首頁</h1>
        <p style={{ opacity: 0.85 }}>
          最初版企業首頁與商品中心已移至 Portal。
        </p>
        <p style={{ marginTop: "1.5rem" }}>
          <a href={portal} style={{ color: "#9ec5ff", fontWeight: 700 }}>
            進入首頁 / 商品中心 →
          </a>
        </p>
        <p style={{ marginTop: "1rem" }}>
          <a href="./experience/" style={{ color: "#c5a059" }}>
            觀看 Interactive Movie（V4）
          </a>
        </p>
      </div>
    </main>
  );
}
