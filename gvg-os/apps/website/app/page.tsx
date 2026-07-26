"use client";

import dynamic from "next/dynamic";

const InteractiveMovie = dynamic(
  () =>
    import("@/components/cinematic/InteractiveMovie").then(
      (m) => m.InteractiveMovie,
    ),
  { ssr: false, loading: () => <main className="movie-root movie-boot" /> },
);

/** Homepage = cinematic Interactive Movie (client-only for WebGL safety) */
export default function MarketingHomePage() {
  return <InteractiveMovie />;
}
