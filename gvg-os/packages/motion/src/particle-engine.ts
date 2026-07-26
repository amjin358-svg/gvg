/**
 * Particle Engine — lightweight canvas particle field for cinematic atmospheres.
 */

export type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  a: number;
};

export type ParticleEngineOptions = {
  count?: number;
  color?: string;
  speed?: number;
  maxRadius?: number;
};

export class ParticleEngine {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private particles: Particle[] = [];
  private raf = 0;
  private running = false;
  private color: string;
  private speed: number;

  constructor(canvas: HTMLCanvasElement, options: ParticleEngineOptions = {}) {
    const ctx = canvas.getContext("2d");
    if (!ctx) throw new Error("Canvas 2D unavailable");
    this.canvas = canvas;
    this.ctx = ctx;
    this.color = options.color ?? "rgba(200,163,95,0.7)";
    this.speed = options.speed ?? 1;
    this.resize();
    this.seed(options.count ?? 48, options.maxRadius ?? 2.2);
  }

  resize() {
    const { canvas } = this;
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    canvas.width = Math.max(1, Math.floor(rect.width * dpr));
    canvas.height = Math.max(1, Math.floor(rect.height * dpr));
    this.ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  private seed(count: number, maxRadius: number) {
    const w = this.canvas.clientWidth || 1;
    const h = this.canvas.clientHeight || 1;
    this.particles = Array.from({ length: count }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      vx: (Math.random() - 0.5) * this.speed,
      vy: (Math.random() - 0.5) * this.speed,
      r: Math.random() * maxRadius + 0.4,
      a: Math.random() * 0.6 + 0.2,
    }));
  }

  start() {
    if (this.running) return;
    this.running = true;
    const tick = () => {
      this.draw();
      this.raf = requestAnimationFrame(tick);
    };
    this.raf = requestAnimationFrame(tick);
  }

  stop() {
    this.running = false;
    cancelAnimationFrame(this.raf);
  }

  destroy() {
    this.stop();
    this.particles = [];
  }

  private draw() {
    const { ctx, canvas, particles, color } = this;
    const w = canvas.clientWidth;
    const h = canvas.clientHeight;
    ctx.clearRect(0, 0, w, h);

    for (const p of particles) {
      p.x += p.vx;
      p.y += p.vy;
      if (p.x < 0 || p.x > w) p.vx *= -1;
      if (p.y < 0 || p.y > h) p.vy *= -1;

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = color.replace(/[\d.]+\)$/g, `${p.a})`);
      if (!color.includes("rgba")) ctx.fillStyle = color;
      ctx.globalAlpha = p.a;
      ctx.fill();
      ctx.globalAlpha = 1;
    }
  }
}

export function createParticleEngine(canvas: HTMLCanvasElement, options?: ParticleEngineOptions) {
  return new ParticleEngine(canvas, options);
}
