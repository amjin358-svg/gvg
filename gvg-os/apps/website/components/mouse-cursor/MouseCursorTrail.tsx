"use client";

import { useEffect, useRef } from "react";

type Particle = {
  x: number;
  y: number;
  px: number;
  py: number;
  life: number;
  maxLife: number;
  width: number;
};

/**
 * Smooth CPU-safe meteor cursor trail (Canvas 2D, no WebGL).
 * Designed for integrated GPUs / no discrete graphics.
 */
export function MouseMeteors() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true, desynchronized: true });
    if (!ctx) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      canvas.style.opacity = "0";
      return;
    }

    let raf = 0;
    let w = 0;
    let h = 0;
    let dpr = 1;
    let targetX = window.innerWidth * 0.5;
    let targetY = window.innerHeight * 0.4;
    let curX = targetX;
    let curY = targetY;
    let prevX = targetX;
    let prevY = targetY;
    let lastTs = performance.now();
    const particles: Particle[] = [];

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 1.25);
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const onMove = (e: PointerEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;
    };

    const tick = (ts: number) => {
      const dt = Math.min(32, ts - lastTs) / 16.67;
      lastTs = ts;

      // Smooth pointer follow (lerp) — silky on low-end CPUs
      curX += (targetX - curX) * 0.22 * dt;
      curY += (targetY - curY) * 0.22 * dt;
      const dx = curX - prevX;
      const dy = curY - prevY;
      const speed = Math.hypot(dx, dy);

      if (speed > 0.35) {
        particles.push({
          x: curX,
          y: curY,
          px: prevX,
          py: prevY,
          life: 1,
          maxLife: 0.42 + Math.min(0.35, speed * 0.02),
          width: 1.1 + Math.min(2.2, speed * 0.08),
        });
        if (particles.length > 48) particles.splice(0, particles.length - 48);
      }

      prevX = curX;
      prevY = curY;
      ctx.clearRect(0, 0, w, h);

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i]!;
        p.life -= (0.016 * dt) / p.maxLife;
        if (p.life <= 0) {
          particles.splice(i, 1);
          continue;
        }
        const a = Math.max(0, p.life);
        const grad = ctx.createLinearGradient(p.px, p.py, p.x, p.y);
        grad.addColorStop(0, `rgba(160, 200, 255, 0)`);
        grad.addColorStop(0.45, `rgba(180, 215, 255, ${0.28 * a})`);
        grad.addColorStop(1, `rgba(245, 250, 255, ${0.85 * a})`);
        ctx.beginPath();
        ctx.strokeStyle = grad;
        ctx.lineWidth = p.width * (0.55 + a);
        ctx.lineCap = "round";
        ctx.moveTo(p.px, p.py);
        ctx.lineTo(p.x, p.y);
        ctx.stroke();

        ctx.beginPath();
        ctx.fillStyle = `rgba(255, 255, 255, ${0.55 * a})`;
        ctx.arc(p.x, p.y, Math.max(0.8, p.width * 0.55), 0, Math.PI * 2);
        ctx.fill();
      }

      raf = requestAnimationFrame(tick);
    };

    resize();
    window.addEventListener("resize", resize, { passive: true });
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
