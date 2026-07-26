"use client";

import { useEffect } from "react";
import { MouseGlow } from "@/components/animation/MouseGlow";
import { MovieErrorBoundary } from "@/components/cinematic/MovieErrorBoundary";
import { GalaxyPhotoLayer } from "@/components/home/GalaxyPhotoLayer";
import { Scene01Logo } from "@/components/cinematic/Scene01Logo";
import { Scene02Earth } from "@/components/cinematic/Scene02Earth";
import { Scene03Global } from "@/components/cinematic/Scene03Global";
import { Scene04Marketplace } from "@/components/cinematic/Scene04Marketplace";
import { Scene05AI } from "@/components/cinematic/Scene05AI";
import { Scene06Business } from "@/components/cinematic/Scene06Business";
import { Scene07Investment } from "@/components/cinematic/Scene07Investment";
import { Scene08RealEstate } from "@/components/cinematic/Scene08RealEstate";
import { Ending } from "@/components/cinematic/Ending";

/**
 * Global Vista Group Interactive Movie — cinematic homepage storytelling
 * Scene 1 Opening → 2 Network → 3 Trade → 4 Marketplace → 5 AI
 * → 6 Business → 7 Investment → 8 Real Estate → 9 Ending
 *
 * Note: avoid next/dynamic ssr:false here — it triggers insertBefore
 * hydration crashes on GitHub Pages static export.
 */
export function InteractiveMovie() {
  useEffect(() => {
    const onError = (event: ErrorEvent) => {
      const msg = String(event.message || event.error || "");
      if (/WebGL|webgl/i.test(msg)) event.preventDefault();
    };
    window.addEventListener("error", onError);
    return () => window.removeEventListener("error", onError);
  }, []);

  return (
    <MovieErrorBoundary>
      <main
        className="movie-root movie-root--seamless"
        aria-label="Global Vista Group Interactive Movie"
      >
        <GalaxyPhotoLayer className="movie-root__galaxy" mode="fixed" />
        <div className="galaxy-backdrop movie-root__galaxy movie-root__galaxy--fx" aria-hidden>
          <div className="galaxy-backdrop__nebula" />
          <div className="galaxy-backdrop__stars galaxy-backdrop__stars--far" />
          <div className="galaxy-backdrop__stars galaxy-backdrop__stars--near" />
          <div className="galaxy-backdrop__dust" />
        </div>
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
    </MovieErrorBoundary>
  );
}

export default InteractiveMovie;
