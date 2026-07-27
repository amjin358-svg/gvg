"use client";

import { useEffect } from "react";
import { MouseMeteors } from "@/components/animation/MouseMeteors";
import { MovieErrorBoundary } from "@/components/cinematic/MovieErrorBoundary";
import { GalaxyPhotoLayer } from "@/components/home/GalaxyPhotoLayer";
import { Scene01Open } from "@/components/cinematic/Scene01Open";
import { Scene02Earth } from "@/components/cinematic/Scene02Earth";
import { Scene03Routes } from "@/components/cinematic/Scene03Routes";
import { Scene04Pillars } from "@/components/cinematic/Scene04Pillars";
import { Scene05Finale } from "@/components/cinematic/Scene05Finale";

/**
 * Interactive Movie V3
 * Keep Scene 02 Earth spin. Replace all other scenes.
 * Mouse: meteor streaks follow pointer velocity.
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
        className="movie-root movie-root--seamless movie-root--os movie-root--v3"
        aria-label="Global Vista Group Interactive Movie"
      >
        <GalaxyPhotoLayer className="movie-root__galaxy" mode="absolute" />
        <MouseMeteors />
        <Scene01Open />
        <Scene02Earth />
        <Scene03Routes />
        <Scene04Pillars />
        <Scene05Finale />
      </main>
    </MovieErrorBoundary>
  );
}

export default InteractiveMovie;
