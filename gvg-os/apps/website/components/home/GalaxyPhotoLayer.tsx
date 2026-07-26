"use client";

type GalaxyPhotoLayerProps = {
  className?: string;
  /** fixed = viewport lock; absolute = stretch with parent (no seams) */
  mode?: "fixed" | "absolute";
};

/** High-res galaxy plate — path-aware for GitHub Pages basePath */
export function GalaxyPhotoLayer({
  className = "",
  mode = "absolute",
}: GalaxyPhotoLayerProps) {
  const base = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
  const src = `${base}/images/galaxy-hero-4k.png`;

  return (
    <div
      className={`galaxy-photo galaxy-photo--${mode} ${className}`.trim()}
      aria-hidden
      style={{
        backgroundImage: `
          radial-gradient(ellipse at 68% 28%, rgba(70, 120, 220, 0.2), transparent 34%),
          radial-gradient(ellipse at 28% 62%, rgba(114, 73, 181, 0.14), transparent 36%),
          linear-gradient(180deg, rgba(1, 4, 12, 0.28) 0%, rgba(3, 14, 32, 0.22) 42%, rgba(1, 4, 12, 0.45) 100%),
          url("${src}")
        `,
        backgroundPosition: "center top",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: mode === "fixed" ? "fixed" : "scroll",
      }}
    />
  );
}

export default GalaxyPhotoLayer;
