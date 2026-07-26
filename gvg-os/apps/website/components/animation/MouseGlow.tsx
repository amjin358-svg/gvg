"use client";

import { useEffect, useState } from "react";

/**
 * Fixed gold bloom that tracks the pointer.
 * pointer-events-none so it never blocks CTAs.
 */
export function MouseGlow() {
  const [pos, setPos] = useState({ x: -9999, y: -9999 });

  useEffect(() => {
    let raf = 0;
    let targetX = -9999;
    let targetY = -9999;
    let currentX = -9999;
    let currentY = -9999;

    const onMove = (e: PointerEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;
    };

    const tick = () => {
      currentX += (targetX - currentX) * 0.12;
      currentY += (targetY - currentY) * 0.12;
      setPos({ x: currentX, y: currentY });
      raf = requestAnimationFrame(tick);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    raf = requestAnimationFrame(tick);
    return () => {
      window.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div
      className="pointer-events-none fixed"
      aria-hidden
      style={{
        left: pos.x,
        top: pos.y,
        width: "40vw",
        height: "40vw",
        transform: "translate(-50%, -50%)",
        background: "radial-gradient(circle,#D4AF37,transparent)",
        filter: "blur(80px)",
        opacity: 0.45,
        zIndex: 50,
        mixBlendMode: "screen",
      }}
    />
  );
}

export default MouseGlow;
