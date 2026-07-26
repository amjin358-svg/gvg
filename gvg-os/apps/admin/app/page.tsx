"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { readSession, resolveAuthPath } from "@gvg/auth";

/** Entry: Login → Workspace Selector → Load Plugins → Dashboard */
export default function HomeRedirectPage() {
  const router = useRouter();

  useEffect(() => {
    router.replace(resolveAuthPath(readSession()));
  }, [router]);

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "grid",
        placeItems: "center",
        color: "#64748B",
      }}
    >
      Redirecting…
    </div>
  );
}
