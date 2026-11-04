import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  //~ every img is committed, immutable asset: cache optimised variants for 1 year (default = 4h) so vercel's image-transformation quota is barely touched
  images: { minimumCacheTTL: 31536000 },
};

export default nextConfig;
