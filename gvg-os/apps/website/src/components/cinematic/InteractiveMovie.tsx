"use client";

import AmbientBackground from "../background/AmbientBackground";
import MouseGlow from "../effects/MouseGlow";
import Scene01Logo from "./Scene01Logo";

export default function InteractiveMovie() {
  return (
    <main className="relative h-screen w-screen overflow-hidden bg-black">
      <AmbientBackground />
      <MouseGlow />
      <Scene01Logo />
    </main>
  );
}
