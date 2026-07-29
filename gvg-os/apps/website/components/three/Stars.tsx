"use client";

import { Stars as DreiStars } from "@react-three/drei";

/** Leaner starfield — subtle twinkle via speed + fade */
export function Stars() {
  return (
    <DreiStars
      radius={90}
      depth={50}
      count={3200}
      factor={3.4}
      saturation={0.35}
      fade
      speed={0.55}
    />
  );
}

export default Stars;
