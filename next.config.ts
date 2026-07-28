import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Static export for GitHub Pages (user site: ganesshkumar.github.io).
  output: "export",

  // Trailing slash keeps one canonical URL per route (see route map contract).
  trailingSlash: true,

  // Image optimization is unavailable in a static export.
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
