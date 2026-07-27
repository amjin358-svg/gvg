"use client";

import { Stars as DreiStars } from "@react-three/drei";

/** Leaner starfield — smoother scroll while keeping depth */
export function Stars() {
  return (
    <DreiStars
      radius={90}
      depth={50}
      count={2800}
      factor={3.2}
      saturation={0.4}
      fade
      speed={0.12}
    />
  );
}

export default Stars;
