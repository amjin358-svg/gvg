"use client";

import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { ScrollControls } from "@react-three/drei";

import "@/styles/interactive-movie.css";
import AmbientBackground from "@/components/background/AmbientBackground";
import MouseGlow from "@/components/effects/MouseGlow";

import CameraDirector from "@/components/cinematic/CameraDirector";
import Scene01Logo from "@/components/cinematic/Scene01Logo";
import Scene02StarWars from "@/components/cinematic/Scene02StarWars";
import Scene03Earth from "@/components/cinematic/Scene03Earth";
import Scene04GlobalNetwork from "@/components/cinematic/Scene04GlobalNetwork";
import Scene05AIUniverse from "@/components/ai/Scene05AIUniverse";
import Scene06Marketplace from "@/components/marketplace/Scene06Marketplace";
import Scene07Business from "@/components/business/Scene07Business";
import Scene08Investment from "@/components/business/Scene08Investment";
import Scene09Ending from "@/components/cinematic/Scene09Ending";
import { HOME_COPY } from "@/lib/cinematicHomeContent";

/**
 * GVG Interactive Movie Homepage — single Canvas + ScrollControls (9 acts).
 */
export default function InteractiveMovie() {
  return (
    <main className="relative h-screen w-screen overflow-hidden bg-black text-white im-root">
      <AmbientBackground />
      <MouseGlow />

      <div className="im-chrome" aria-hidden>
        <span className="im-chrome__brand">{HOME_COPY.brand}</span>
        <span className="im-chrome__hint">{HOME_COPY.scrollHint}</span>
      </div>

      <Canvas
        className="im-canvas"
        dpr={[1, 1.6]}
        camera={{ position: [0, 0, 8], fov: 45, near: 0.1, far: 100 }}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        style={{ position: "absolute", inset: 0 }}
      >
        <Suspense fallback={null}>
          <ScrollControls pages={9} damping={0.08}>
            <CameraDirector />
            <Scene01Logo />
            <Scene02StarWars />
            <Scene03Earth />
            <Scene04GlobalNetwork />
            <Scene05AIUniverse />
            <Scene06Marketplace />
            <Scene07Business />
            <Scene08Investment />
            <Scene09Ending />
          </ScrollControls>
        </Suspense>
      </Canvas>
    </main>
  );
}
