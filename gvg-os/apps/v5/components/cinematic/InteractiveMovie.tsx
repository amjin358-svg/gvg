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
import { MOVIE_VERSION } from "@/lib/movieContent";

/**
 * Interactive Movie V5 (IM-V5.0)
 * Open → Earth spin → Routes → Pillars → Finale
 * Pointer / touch meteors follow velocity.
 */
export function InteractiveMovie() {
  useEffect(() => {
    const onError = (event: ErrorEvent) => {
      const msg = String(event.message || event.error || "");
      if (/WebGL|webgl/i.test(msg)) event.preventDefault();
    };
    document.documentElement.classList.add("movie-playing");
    document.documentElement.dataset.movieVersion = MOVIE_VERSION.code;
    window.addEventListener("error", onError);
    return () => {
      document.documentElement.classList.remove("movie-playing");
      delete document.documentElement.dataset.movieVersion;
      window.removeEventListener("error", onError);
    };
  }, []);

  return (
    <MovieErrorBoundary>
      <main
        className="movie-root movie-root--seamless movie-root--os movie-root--v5"
        aria-label={`${MOVIE_VERSION.label} — Global Vista Group`}
        data-movie-version={MOVIE_VERSION.code}
      >
        <GalaxyPhotoLayer className="movie-root__galaxy movie-root__galaxy--spin" mode="absolute" />
        <div className="movie-root__star-twinkle" aria-hidden />
        <MouseMeteors />
        <Scene01Open />
        <Scene02Earth />
        <Scene03Routes />
        <Scene04Pillars />
        <Scene05Finale />
        <p className="movie-root__version" aria-hidden>
          {MOVIE_VERSION.code}
        </p>
      </main>
    </MovieErrorBoundary>
  );
}

export default InteractiveMovie;
