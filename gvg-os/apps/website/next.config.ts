import type { NextConfig } from "next";
import path from "node:path";
import { fileURLToPath } from "node:url";

const appDir = path.dirname(fileURLToPath(import.meta.url));

const nextConfig: NextConfig = {
  transpilePackages: ["three", "@react-three/fiber", "@react-three/drei"],
  reactStrictMode: true,
  // Prefer the gvg-os workspace root over the parent trade-os lockfile.
  outputFileTracingRoot: path.join(appDir, "../.."),
};

export default nextConfig;
