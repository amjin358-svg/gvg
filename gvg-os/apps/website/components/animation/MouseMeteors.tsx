"use client";

import { useEffect, useRef } from "react";

type Mist = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  size: number;
};

/**
 * Lightweight frosted meteor drag — fluency first, no ambient spam.
 */
export function MouseMeteors() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      canvas.style.opacity = "0";
      return;
    }

    let raf = 0;
    let w = 0;
    let h = 0;
    let dpr = 1;
    let prevX = window.innerWidth * 0.5;
    let prevY = window.innerHeight * 0.4;
    let lastMove = 0;
    const mist: Mist[] = [];

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const onMove = (e: PointerEvent) => {
      const x = e.clientX;
      const y = e.clientY;
      const now = performance.now();
      const dt = Math.max(10, now - lastMove);
      lastMove = now;
      const dx = ((x - prevX) / dt) * 16;
      const dy = ((y - prevY) / dt) * 16;
      prevX = x;
      prevY = y;
      const speed = Math.hypot(dx, dy);
      if (speed < 1.4) return;

      const angle = Math.atan2(dy, dx);
      const mag = Math.min(22, speed * 0.4);
      mist.push({
        x,
        y,
        vx: Math.cos(angle) * mag,
        vy: Math.sin(angle) * mag,
        life: 1,
        maxLife: 0.45,
        size: 9 + speed * 0.4,
      });
      if (mist.length > 36) mist.splice(0, mist.length - 36);
    };

    const tick = () => {
      ctx.clearRect(0, 0, w, h);
      for (let i = mist.length - 1; i >= 0; i--) {
        const m = mist[i]!;
        m.life -= 0.016 / m.maxLife;
        if (m.life <= 0) {
          mist.splice(i, 1);
          continue;
        }
        m.x += m.vx * 0.28;
        m.y += m.vy * 0.28;
        m.vx *= 0.96;
        m.vy *= 0.96;

        const a = Math.max(0, m.life) * 0.35;
        const r = m.size * (0.7 + (1 - m.life) * 0.6);
        const g = ctx.createRadialGradient(m.x, m.y, 0, m.x, m.y, r);
        g.addColorStop(0, `rgba(230, 240, 255, ${0.35 * a})`);
        g.addColorStop(0.5, `rgba(170, 200, 240, ${0.12 * a})`);
        g.addColorStop(1, "rgba(140, 170, 210, 0)");
        ctx.beginPath();
        ctx.fillStyle = g;
        ctx.arc(m.x, m.y, r, 0, Math.PI * 2);
        ctx.fill();
      }
      raf = requestAnimationFrame(tick);
    };

    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", onMove, { passive: true });
    raf = requestAnimationFrame(tick);
    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="movie-meteors"
      aria-hidden
      style={{
        position: "fixed",
        inset: 0,
        width: "100%",
        height: "100%",
        zIndex: 50,
        pointerEvents: "none",
        mixBlendMode: "soft-light",
        opacity: 0.85,
      }}
    />
  );
}

export default MouseMeteors;
