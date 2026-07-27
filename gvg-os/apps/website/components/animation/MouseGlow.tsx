"use client";

import { useEffect, useRef } from "react";

/**
 * Layer 5 — Mouse Glow
 * Direct DOM updates (no React setState per frame) for smoother compositing.
 */
export function MouseGlow() {
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = glowRef.current;
    if (!el) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      el.style.opacity = "0";
      return;
    }

    let raf = 0;
    let targetX = window.innerWidth * 0.5;
    let targetY = window.innerHeight * 0.4;
    let currentX = targetX;
    let currentY = targetY;
    let visible = false;
    let idleTimer = 0;

    const onMove = (e: PointerEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;
      visible = true;
      el.style.opacity = "0.38";
      window.clearTimeout(idleTimer);
      idleTimer = window.setTimeout(() => {
        visible = false;
        el.style.opacity = "0";
      }, 1400);
    };

    const tick = () => {
      // Slightly heavier lerp = silkier trail
      currentX += (targetX - currentX) * 0.09;
      currentY += (targetY - currentY) * 0.09;
      if (visible || Math.abs(targetX - currentX) > 0.4) {
        el.style.transform = `translate3d(${currentX}px, ${currentY}px, 0) translate(-50%, -50%)`;
      }
      raf = requestAnimationFrame(tick);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    raf = requestAnimationFrame(tick);
    return () => {
      window.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(raf);
      window.clearTimeout(idleTimer);
    };
  }, []);

  return (
    <div
      ref={glowRef}
      className="movie-mouse-glow"
      aria-hidden
      style={{
        position: "fixed",
        left: 0,
        top: 0,
        width: "36vw",
        height: "36vw",
        maxWidth: 520,
        maxHeight: 520,
        transform: "translate3d(-9999px, -9999px, 0) translate(-50%, -50%)",
        background:
          "radial-gradient(circle, rgba(212,175,55,0.7) 0%, rgba(200,163,95,0.25) 35%, transparent 70%)",
        filter: "blur(56px)",
        opacity: 0,
        zIndex: 50,
        mixBlendMode: "screen",
        pointerEvents: "none",
        willChange: "transform, opacity",
        transition: "opacity 400ms ease",
      }}
    />
  );
}

export default MouseGlow;
