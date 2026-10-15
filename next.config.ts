import type { NextConfig } from "next";

// Static export so the site runs on GitHub Pages with no server.
const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true },
  poweredByHeader: false,
};

export default nextConfig;
