"use client";

import { Stars as DreiStars } from "@react-three/drei";

/** Minimal starfield — fluency first */
export function Stars() {
  return (
    <DreiStars
      radius={80}
      depth={40}
      count={900}
      factor={2.6}
      saturation={0.25}
      fade
      speed={0.06}
    />
  );
}

export default Stars;
