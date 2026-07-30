"use client";

import { useEffect, useRef } from "react";

/**
 * Soft golden mouse glow — Apple Vision Pro feel (never a hard spotlight).
 */
export default function MouseGlow() {
  const ref = useRef<HTMLDivElement>(null);
  const target = useRef({ x: 0.5, y: 0.5 });
  const current = useRef({ x: 0.5, y: 0.5 });
  const raf = useRef(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      el.style.opacity = "0";
      return;
    }

    const onMove = (e: PointerEvent) => {
      target.current.x = e.clientX / window.innerWidth;
      target.current.y = e.clientY / window.innerHeight;
    };

    const tick = () => {
      current.current.x += (target.current.x - current.current.x) * 0.08;
      current.current.y += (target.current.y - current.current.y) * 0.08;
      el.style.setProperty("--mx", `${current.current.x * 100}%`);
      el.style.setProperty("--my", `${current.current.y * 100}%`);
      raf.current = requestAnimationFrame(tick);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    raf.current = requestAnimationFrame(tick);
    return () => {
      window.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(raf.current);
    };
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden
      className="pointer-events-none absolute inset-0 z-20 mix-blend-screen"
      style={{
        background:
          "radial-gradient(420px circle at var(--mx, 50%) var(--my, 50%), rgba(224, 184, 74, 0.14), transparent 55%)",
      }}
    />
  );
}
