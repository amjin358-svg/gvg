"use client";

import { Stars as DreiStars } from "@react-three/drei";

export function Stars() {
  return (
    <DreiStars
      radius={80}
      depth={40}
      count={2500}
      factor={3.5}
      saturation={0.4}
      fade
      speed={0.4}
    />
  );
}

export default Stars;
