import type { ReactNode } from "react";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "grid",
        placeItems: "center",
        padding: 24,
        background:
          "radial-gradient(ellipse 80% 60% at 50% -10%, rgba(200,163,95,0.18), transparent), linear-gradient(160deg, #0B1F3A 0%, #132a4a 45%, #0a1628 100%)",
      }}
    >
      {children}
    </div>
  );
}
