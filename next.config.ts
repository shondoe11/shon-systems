import type { NextConfig } from "next";

//* baseline security headers fr every response. csp here deliberately has no script-src /
//& style-src: next's inline bootstrap scripts need nonce setup that must be tested in browser,so this only locks down framing, <base>, form targets & plugins, which cannot break rendering
const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), browsing-topics=()" },
  {
    key: "Content-Security-Policy",
    value: "frame-ancestors 'none'; base-uri 'self'; form-action 'self'; object-src 'none'",
  },
];

const nextConfig: NextConfig = {
  //~ every img is committed, immutable asset: cache optimised variants fr 1y (default = 4h) so vercel's img-transformation quota is barely touched
  images: { minimumCacheTTL: 31536000 },
  poweredByHeader: false,
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
};

export default nextConfig;
