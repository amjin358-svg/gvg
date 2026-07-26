"use client";

import { useEffect } from "react";
import dynamic from "next/dynamic";
import { MouseGlow } from "@/components/animation/MouseGlow";
import { MovieErrorBoundary } from "@/components/cinematic/MovieErrorBoundary";
import { Scene01Logo } from "@/components/cinematic/Scene01Logo";
import { Scene06Business } from "@/components/cinematic/Scene06Business";
import { Scene07Investment } from "@/components/cinematic/Scene07Investment";
import { Scene08RealEstate } from "@/components/cinematic/Scene08RealEstate";
import { Ending } from "@/components/cinematic/Ending";

const Scene02Network = dynamic(
  () => import("@/components/cinematic/Scene02Earth").then((m) => m.Scene02Earth),
  { ssr: false },
);
const Scene03Trade = dynamic(
  () =>
    import("@/components/cinematic/Scene03Global").then((m) => m.Scene03Global),
  { ssr: false },
);
const Scene04Marketplace = dynamic(
  () =>
    import("@/components/cinematic/Scene04Marketplace").then(
      (m) => m.Scene04Marketplace,
    ),
  { ssr: false },
);
const Scene05AI = dynamic(
  () => import("@/components/cinematic/Scene05AI").then((m) => m.Scene05AI),
  { ssr: false },
);

/**
 * GVG Interactive Movie — cinematic homepage storytelling
 * Scene 1 Opening → 2 Network → 3 Trade → 4 Marketplace → 5 AI
 * → 6 Business → 7 Investment → 8 Real Estate → 9 Ending
 */
export function InteractiveMovie() {
  useEffect(() => {
    const onError = (event: ErrorEvent) => {
      const msg = String(event.message || event.error || "");
      if (/WebGL|webgl/i.test(msg)) {
        event.preventDefault();
      }
    };
    window.addEventListener("error", onError);
    return () => window.removeEventListener("error", onError);
  }, []);

  return (
    <MovieErrorBoundary>
      <main className="movie-root" aria-label="GVG Interactive Movie">
        <MouseGlow />
        <Scene01Logo />
        <Scene02Network />
        <Scene03Trade />
        <Scene04Marketplace />
        <Scene05AI />
        <Scene06Business />
        <Scene07Investment />
        <Scene08RealEstate />
        <Ending />
      </main>
    </MovieErrorBoundary>
  );
}

export default InteractiveMovie;
