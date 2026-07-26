"use client";

/** High-res galaxy plate — path-aware for GitHub Pages basePath */
export function GalaxyPhotoLayer({ className = "" }: { className?: string }) {
  const base = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
  const src = `${base}/images/galaxy-hero-4k.png`;

  return (
    <div
      className={`galaxy-photo ${className}`}
      aria-hidden
      style={{
        backgroundImage: `
          radial-gradient(ellipse at 72% 35%, rgba(66, 117, 214, 0.22), transparent 30%),
          radial-gradient(ellipse at 28% 64%, rgba(114, 73, 181, 0.16), transparent 34%),
          linear-gradient(180deg, rgba(1, 4, 12, 0.35) 0%, rgba(3, 18, 43, 0.5) 48%, rgba(0, 0, 0, 0.72) 100%),
          url("${src}")
        `,
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
    />
  );
}

export default GalaxyPhotoLayer;
