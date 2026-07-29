"use client";

import { useEffect, useRef } from "react";

type Meteor = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  length: number;
  width: number;
  hue: number;
};

/**
 * V5 mouse meteors — velocity-driven shooting-star streaks (IM-V5.0 level).
 */
export function MouseMeteors() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
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
    const meteors: Meteor[] = [];

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const spawn = (x: number, y: number, dx: number, dy: number) => {
      const speed = Math.hypot(dx, dy);
      if (speed < 1.2) return;

      const count = speed > 28 ? 3 : speed > 14 ? 2 : 1;
      for (let i = 0; i < count; i++) {
        const angle = Math.atan2(dy, dx) + (Math.random() - 0.5) * 0.28;
        const mag = Math.min(42, speed * (0.55 + Math.random() * 0.45));
        meteors.push({
          x: x + (Math.random() - 0.5) * 10,
          y: y + (Math.random() - 0.5) * 10,
          vx: Math.cos(angle) * mag,
          vy: Math.sin(angle) * mag,
          life: 1,
          maxLife: 0.55 + Math.random() * 0.55,
          length: 28 + speed * 1.8 + Math.random() * 36,
          width: 1.2 + Math.random() * 1.8,
          hue: Math.random() > 0.55 ? 210 : 265,
        });
      }

      if (speed > 18 && Math.random() > 0.55) {
        const angle = Math.atan2(dy, dx);
        meteors.push({
          x,
          y,
          vx: Math.cos(angle) * Math.min(52, speed * 0.9),
          vy: Math.sin(angle) * Math.min(52, speed * 0.9),
          life: 1,
          maxLife: 0.85,
          length: 70 + speed * 2.2,
          width: 2.4,
          hue: 200,
        });
      }

      if (meteors.length > 80) meteors.splice(0, meteors.length - 80);
    };

    const onMove = (e: PointerEvent) => {
      const x = e.clientX;
      const y = e.clientY;
      const now = performance.now();
      const dt = Math.max(8, now - lastMove);
      lastMove = now;
      const dx = ((x - prevX) / dt) * 16;
      const dy = ((y - prevY) / dt) * 16;
      prevX = x;
      prevY = y;
      spawn(x, y, dx, dy);
    };

    const tick = () => {
      ctx.clearRect(0, 0, w, h);

      for (let i = meteors.length - 1; i >= 0; i--) {
        const m = meteors[i]!;
        m.life -= 0.016 / m.maxLife;
        if (m.life <= 0) {
          meteors.splice(i, 1);
          continue;
        }

        m.x += m.vx * 0.016 * 60 * 0.35;
        m.y += m.vy * 0.016 * 60 * 0.35;
        m.vx *= 0.985;
        m.vy *= 0.985;

        const angle = Math.atan2(m.vy, m.vx);
        const alpha = Math.max(0, m.life);
        const tail = m.length * (0.55 + alpha * 0.45);
        const hx = m.x;
        const hy = m.y;
        const tx = hx - Math.cos(angle) * tail;
        const ty = hy - Math.sin(angle) * tail;

        const grad = ctx.createLinearGradient(tx, ty, hx, hy);
        grad.addColorStop(0, `hsla(${m.hue}, 90%, 70%, 0)`);
        grad.addColorStop(0.45, `hsla(${m.hue}, 95%, 75%, ${0.35 * alpha})`);
        grad.addColorStop(1, `hsla(${m.hue + 20}, 100%, 92%, ${0.95 * alpha})`);

        ctx.beginPath();
        ctx.strokeStyle = grad;
        ctx.lineWidth = m.width * (0.6 + alpha);
        ctx.lineCap = "round";
        ctx.moveTo(tx, ty);
        ctx.lineTo(hx, hy);
        ctx.stroke();

        ctx.beginPath();
        ctx.fillStyle = `hsla(${m.hue + 30}, 100%, 96%, ${0.9 * alpha})`;
        ctx.shadowColor = `hsla(${m.hue}, 100%, 70%, ${0.8 * alpha})`;
        ctx.shadowBlur = 12;
        ctx.arc(hx, hy, m.width * 1.1, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
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
        mixBlendMode: "screen",
      }}
    />
  );
}

export default MouseMeteors;
