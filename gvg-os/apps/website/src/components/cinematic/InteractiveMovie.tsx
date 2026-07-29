"use client";

import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { ScrollControls } from "@react-three/drei";

import "@/styles/interactive-movie.css";
import AmbientBackground from "@/components/background/AmbientBackground";
import MouseGlow from "@/components/effects/MouseGlow";

import CameraDirector from "./CameraDirector";
import Scene01Logo from "./Scene01Logo";
import Scene02StarWars from "./Scene02StarWars";
import Scene03Earth from "./Scene03Earth";
import Scene04GlobalNetwork from "./Scene04GlobalNetwork";
import Scene05AIUniverse from "@/components/ai/Scene05AIUniverse";
import Scene06Marketplace from "@/components/marketplace/Scene06Marketplace";
import Scene07Business from "@/components/business/Scene07Business";
import Scene08Investment from "@/components/business/Scene08Investment";
import Scene09Ending from "./Scene09Ending";

export default function InteractiveMovie() {
  return (
    <main className="relative h-screen w-screen overflow-hidden bg-black text-white">
      <AmbientBackground />

      <MouseGlow />

      <Canvas
        camera={{
          position: [0, 0, 8],
          fov: 45,
        }}
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
