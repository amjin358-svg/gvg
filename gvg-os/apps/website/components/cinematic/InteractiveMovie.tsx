"use client";

import dynamic from "next/dynamic";
import { MouseGlow } from "@/components/animation/MouseGlow";
import { Scene01Logo } from "@/components/cinematic/Scene01Logo";
import { Scene06Business } from "@/components/cinematic/Scene06Business";
import { Scene07Investment } from "@/components/cinematic/Scene07Investment";
import { Scene08RealEstate } from "@/components/cinematic/Scene08RealEstate";
import { Ending } from "@/components/cinematic/Ending";

const Scene02Earth = dynamic(
  () => import("@/components/cinematic/Scene02Earth").then((m) => m.Scene02Earth),
  { ssr: false },
);
const Scene03Global = dynamic(
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

/** Full Interactive Movie scroll experience */
export function InteractiveMovie() {
  return (
    <main className="movie-root" aria-label="GVG Interactive Movie">
      {/* Layer 5 — Mouse Glow (topmost cinematic overlay) */}
      <MouseGlow />
      <Scene01Logo />
      <Scene02Earth />
      <Scene03Global />
      <Scene04Marketplace />
      <Scene05AI />
      <Scene06Business />
      <Scene07Investment />
      <Scene08RealEstate />
      <Ending />
    </main>
  );
}

export default InteractiveMovie;
