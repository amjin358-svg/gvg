"use client";

import AmbientBackground from "./AmbientBackground";
import MouseGlow from "./MouseGlow";
import Scene01Logo from "./Scene01Logo";

/**
 * GVG Interactive Movie V6 (WIP) — CSS / Framer Motion Scene01 shell.
 * Isolated from the production ScrollControls homepage and IM-V5 /experience.
 * Route: /v6
 */
export default function InteractiveMovieV6() {
  return (
    <main className="relative h-screen w-screen overflow-hidden bg-black">
      <AmbientBackground />
      <MouseGlow />
      <Scene01Logo />
    </main>
  );
}
