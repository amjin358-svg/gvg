export function OrbitStage() {
  return (
    <div className="orbit-stage" aria-hidden>
      <svg className="orbit-stage__lanes" viewBox="0 0 100 100">
        <defs>
          <linearGradient id="laneGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#D4AF37" />
            <stop offset="55%" stopColor="#C8A35F" />
            <stop offset="100%" stopColor="#7EB6FF" />
          </linearGradient>
        </defs>
        <path d="M18 62 Q 40 28 58 48 T 86 40" />
        <path d="M22 70 Q 48 52 64 58 T 82 72" />
        <path d="M28 38 Q 50 22 72 34" />
      </svg>
      <div className="orbit-stage__glow" />
      <div className="orbit-stage__earth" />
      <div className="orbit-stage__caption">Trade lanes · 貿易航線</div>
    </div>
  );
}

export default OrbitStage;
