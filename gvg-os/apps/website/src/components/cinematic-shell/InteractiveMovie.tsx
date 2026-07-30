"use client";

import AmbientBackground from "./AmbientBackground";
import MouseGlow from "./MouseGlow";
import Scene01Logo from "./Scene01Logo";

/**
 * Homepage Scene01 shell — new CSS / Framer Motion effects.
 * Isolated from legacy `components/effects`, `background`, and R3F cinematic scenes.
 */
export default function InteractiveMovie() {
  return (
    <main className="relative h-screen w-screen overflow-hidden bg-black">
      <AmbientBackground />
      <MouseGlow />
      <Scene01Logo />
    </main>
  );
}
