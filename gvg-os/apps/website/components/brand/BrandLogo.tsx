type BrandLogoProps = {
  /** Compact mark for header; hero for large brand moments */
  size?: "sm" | "md" | "lg";
  showWordmark?: boolean;
  className?: string;
};

/**
 * Default Global Vista Group mark — hot-stamped gold foil edge, high-gloss crest.
 */
export function BrandLogo({
  size = "md",
  showWordmark = true,
  className = "",
}: BrandLogoProps) {
  const dim = size === "sm" ? 34 : size === "lg" ? 72 : 44;
  const uid = `gvg-foil-${size}`;

  return (
    <span className={`brand-logo brand-logo--${size} ${className}`.trim()}>
      <span className="brand-logo__mark" aria-hidden>
        <svg
          viewBox="0 0 64 64"
          width={dim}
          height={dim}
          role="img"
          focusable="false"
        >
          <defs>
            <linearGradient id={`${uid}-foil`} x1="8" y1="4" x2="56" y2="60">
              <stop offset="0%" stopColor="#F8E7B0" />
              <stop offset="28%" stopColor="#E4C98A" />
              <stop offset="52%" stopColor="#C8A35F" />
              <stop offset="72%" stopColor="#F0D78A" />
              <stop offset="100%" stopColor="#8A6A2E" />
            </linearGradient>
            <linearGradient id={`${uid}-core`} x1="20" y1="14" x2="44" y2="50">
              <stop offset="0%" stopColor="#0B1F3A" />
              <stop offset="55%" stopColor="#132A4A" />
              <stop offset="100%" stopColor="#061018" />
            </linearGradient>
            <radialGradient id={`${uid}-shine`} cx="32%" cy="28%" r="65%">
              <stop offset="0%" stopColor="#FFF6D6" stopOpacity="0.95" />
              <stop offset="45%" stopColor="#C8A35F" stopOpacity="0.35" />
              <stop offset="100%" stopColor="#6B5220" stopOpacity="0" />
            </radialGradient>
            <filter id={`${uid}-glow`} x="-30%" y="-30%" width="160%" height="160%">
              <feDropShadow
                dx="0"
                dy="1"
                stdDeviation="1.4"
                floodColor="#D4AF37"
                floodOpacity="0.55"
              />
            </filter>
          </defs>

          {/* Outer foil hex edge */}
          <path
            d="M32 4 L54 16.5 V47.5 L32 60 L10 47.5 V16.5 Z"
            fill={`url(#${uid}-core)`}
            stroke={`url(#${uid}-foil)`}
            strokeWidth="2.4"
            filter={`url(#${uid}-glow)`}
          />
          {/* Inner foil ring */}
          <path
            d="M32 11 L47 19.5 V44.5 L32 53 L17 44.5 V19.5 Z"
            fill="none"
            stroke={`url(#${uid}-foil)`}
            strokeWidth="1.35"
            opacity="0.92"
          />
          {/* Crest diamond */}
          <path
            d="M32 18 L42 26 V38 L32 46 L22 38 V26 Z"
            fill={`url(#${uid}-shine)`}
            stroke={`url(#${uid}-foil)`}
            strokeWidth="1.1"
          />
          {/* Hot-stamp highlight edge */}
          <path
            d="M32 4 L54 16.5 V28"
            fill="none"
            stroke="#FFF4C8"
            strokeWidth="1.1"
            strokeLinecap="round"
            opacity="0.55"
          />
        </svg>
      </span>
      {showWordmark ? (
        <span className="brand-logo__wordmark">
          <span className="brand-logo__title">Global Vista Group</span>
          <span className="brand-logo__tag">Connecting Markets. Creating Value.</span>
        </span>
      ) : null}
    </span>
  );
}

export default BrandLogo;
