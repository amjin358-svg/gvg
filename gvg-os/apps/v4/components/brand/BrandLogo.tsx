type BrandLogoProps = {
  /** Compact mark for header; hero for large brand moments */
  size?: "sm" | "md" | "lg";
  showWordmark?: boolean;
  className?: string;
};

/**
 * Global Vista Group wordmark — no crest / hex mark.
 */
export function BrandLogo({
  size = "md",
  showWordmark = true,
  className = "",
}: BrandLogoProps) {
  if (!showWordmark) return null;

  return (
    <span className={`brand-logo brand-logo--${size} ${className}`.trim()}>
      <span className="brand-logo__wordmark">
        <span className="brand-logo__title">Global Vista Group</span>
        <span className="brand-logo__tag">Connecting Markets. Creating Value.</span>
      </span>
    </span>
  );
}

export default BrandLogo;
