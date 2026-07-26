import type { NextConfig } from "next";
import path from "node:path";
import { fileURLToPath } from "node:url";

const appDir = path.dirname(fileURLToPath(import.meta.url));
const isGitHubPages = process.env.GITHUB_PAGES === "true";

const basePath = isGitHubPages ? "/gvg" : "";

const nextConfig: NextConfig = {
  transpilePackages: ["three", "@react-three/fiber", "@react-three/drei"],
  reactStrictMode: true,
  // Prefer the gvg-os workspace root over the parent trade-os lockfile.
  outputFileTracingRoot: path.join(appDir, "../.."),
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
  },
  // Static site for GitHub Pages: https://amjin358-svg.github.io/gvg/
  ...(isGitHubPages
    ? {
        output: "export" as const,
        basePath,
        assetPrefix: `${basePath}/`,
        trailingSlash: true,
        images: { unoptimized: true },
      }
    : {}),
};

export default nextConfig;
