import type { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  const base =
    process.env.GITHUB_PAGES === "true"
      ? "https://amjin358-svg.github.io/gvg/trade-os"
      : "https://globalvistagroup.com";

  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${base}/sitemap.xml`,
  };
}
