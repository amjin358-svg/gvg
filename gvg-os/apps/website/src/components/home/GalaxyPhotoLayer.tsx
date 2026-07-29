"use client";

type GalaxyPhotoLayerProps = {
  className?: string;
  /** fixed = viewport lock; absolute = stretch with parent (no seams) */
  mode?: "fixed" | "absolute";
};

/**
 * Galaxy plate — uses a 1920 JPEG for scroll compositing cost.
 * Avoids background-attachment:fixed (major mobile/desktop jank source).
 */
export function GalaxyPhotoLayer({
  className = "",
  mode = "absolute",
}: GalaxyPhotoLayerProps) {
  const base = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
  const src = `${base}/images/galaxy-hero-1920.jpg`;

  return (
    <div
      className={`galaxy-photo galaxy-photo--${mode} ${className}`.trim()}
      aria-hidden
      style={{
        backgroundImage: `
          radial-gradient(ellipse at 22% 28%, rgba(50, 100, 200, 0.22), transparent 36%),
          radial-gradient(ellipse at 72% 22%, rgba(40, 120, 220, 0.24), transparent 34%),
          radial-gradient(ellipse at 55% 70%, rgba(30, 60, 120, 0.12), transparent 40%),
          linear-gradient(180deg, rgba(1, 4, 12, 0.28) 0%, rgba(3, 14, 32, 0.18) 42%, rgba(1, 4, 12, 0.48) 100%),
          url("${src}")
        `,
        backgroundPosition: "center top",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "scroll",
      }}
    />
  );
}

export default GalaxyPhotoLayer;
