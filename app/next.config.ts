import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  images: {
    // Next.js Image Optimization API is unavailable under static export.
    unoptimized: true,
  },
};

export default nextConfig;
