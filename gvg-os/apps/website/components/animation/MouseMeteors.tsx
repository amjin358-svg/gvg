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
  soft: number;
};

/**
 * Frosted / matte meteor drag trails that follow pointer velocity.
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
    let lastAmbient = 0;
    const mist: Mist[] = [];

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

    const push = (m: Mist) => {
      mist.push(m);
      if (mist.length > 120) mist.splice(0, mist.length - 120);
    };

    const spawnAmbient = () => {
      // Sparse faint background wisps only
      if (Math.random() > 0.55) return;
      const fromLeft = Math.random() > 0.5;
      const x = fromLeft ? -10 : w + 10;
      const y = Math.random() * h;
      const angle = fromLeft ? 0.4 + Math.random() * 0.4 : Math.PI - (0.4 + Math.random() * 0.4);
      const mag = 6 + Math.random() * 10;
      push({
        x,
        y,
        vx: Math.cos(angle) * mag,
        vy: Math.sin(angle) * mag * 0.35,
        life: 1,
        maxLife: 1.1 + Math.random() * 0.8,
        size: 8 + Math.random() * 14,
        soft: 0.35 + Math.random() * 0.25,
      });
    };

    const spawnDrag = (x: number, y: number, dx: number, dy: number) => {
      const speed = Math.hypot(dx, dy);
      if (speed < 0.8) return;

      const count = speed > 24 ? 4 : speed > 12 ? 3 : 2;
      for (let i = 0; i < count; i++) {
        const angle = Math.atan2(dy, dx) + (Math.random() - 0.5) * 0.4;
        const mag = Math.min(28, speed * (0.35 + Math.random() * 0.35));
        push({
          x: x + (Math.random() - 0.5) * 14,
          y: y + (Math.random() - 0.5) * 14,
          vx: Math.cos(angle) * mag,
          vy: Math.sin(angle) * mag,
          life: 1,
          maxLife: 0.55 + Math.random() * 0.55,
          size: 10 + speed * 0.55 + Math.random() * 16,
          soft: 0.45 + Math.random() * 0.35,
        });
      }
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
      spawnDrag(x, y, dx, dy);
    };

    const tick = (now: number) => {
      if (now - lastAmbient > 520) {
        lastAmbient = now;
        spawnAmbient();
      }

      ctx.clearRect(0, 0, w, h);
      ctx.globalCompositeOperation = "lighter";

      for (let i = mist.length - 1; i >= 0; i--) {
        const m = mist[i]!;
        m.life -= 0.016 / m.maxLife;
        if (m.life <= 0) {
          mist.splice(i, 1);
          continue;
        }

        m.x += m.vx * 0.016 * 60 * 0.28;
        m.y += m.vy * 0.016 * 60 * 0.28;
        m.vx *= 0.97;
        m.vy *= 0.97;

        const alpha = Math.max(0, m.life) * m.soft;
        const radius = m.size * (0.65 + (1 - m.life) * 0.85);

        // Soft frosted head
        const grad = ctx.createRadialGradient(m.x, m.y, 0, m.x, m.y, radius);
        grad.addColorStop(0, `rgba(235, 245, 255, ${0.42 * alpha})`);
        grad.addColorStop(0.35, `rgba(180, 210, 255, ${0.22 * alpha})`);
        grad.addColorStop(0.7, `rgba(140, 170, 220, ${0.08 * alpha})`);
        grad.addColorStop(1, "rgba(120, 150, 200, 0)");

        ctx.beginPath();
        ctx.fillStyle = grad;
        ctx.arc(m.x, m.y, radius, 0, Math.PI * 2);
        ctx.fill();

        // Short matte streak behind motion
        const angle = Math.atan2(m.vy, m.vx);
        const tail = radius * 1.8;
        const tx = m.x - Math.cos(angle) * tail;
        const ty = m.y - Math.sin(angle) * tail;
        const streak = ctx.createLinearGradient(tx, ty, m.x, m.y);
        streak.addColorStop(0, "rgba(190, 215, 245, 0)");
        streak.addColorStop(0.55, `rgba(200, 220, 245, ${0.12 * alpha})`);
        streak.addColorStop(1, `rgba(230, 240, 255, ${0.28 * alpha})`);
        ctx.beginPath();
        ctx.strokeStyle = streak;
        ctx.lineWidth = radius * 0.55;
        ctx.lineCap = "round";
        ctx.moveTo(tx, ty);
        ctx.lineTo(m.x, m.y);
        ctx.stroke();
      }

      ctx.globalCompositeOperation = "source-over";
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
        opacity: 0.92,
      }}
    />
  );
}

export default MouseMeteors;
