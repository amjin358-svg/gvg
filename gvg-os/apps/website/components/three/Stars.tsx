"use client";

import { Stars as DreiStars } from "@react-three/drei";

export function Stars() {
  return (
    <DreiStars
      radius={100}
      depth={60}
      count={7000}
      factor={4}
      saturation={0.55}
      fade
      speed={0.32}
    />
  );
}

export default Stars;
