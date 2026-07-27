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
 * Interactive Movie V2 — homepage OS palette + corporate narrative
 * 01 GVG + Star Wars crawl → 02 Earth → 03 Global → 04 Product Center
 * → 05 AI → 06 Services → 07 Platform → 08 Presence → Ending CTA
 *
 * MouseGlow: blue/violet bloom. Scrub lag 0.85. Noise 0.015.
 */
export function InteractiveMovie() {
  useEffect(() => {
    const onError = (event: ErrorEvent) => {
      const msg = String(event.message || event.error || "");
      if (/WebGL|webgl/i.test(msg)) event.preventDefault();
    };
    document.documentElement.classList.add("movie-playing");
    window.addEventListener("error", onError);
    return () => {
      document.documentElement.classList.remove("movie-playing");
      window.removeEventListener("error", onError);
    };
  }, []);

  return (
    <MovieErrorBoundary>
      <main
        className="movie-root movie-root--seamless movie-root--os"
        aria-label="Global Vista Group Interactive Movie"
      >
        <GalaxyPhotoLayer className="movie-root__galaxy" mode="absolute" />
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
