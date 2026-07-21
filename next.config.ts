import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* ─────────────────────────────────────────────
   * Vercel-optimized Next.js Configuration
   * brAIny pro — brainyprolocal.com
   * ───────────────────────────────────────────── */

  // Enable React strict mode for better development practices
  reactStrictMode: true,

  // Image optimization configuration
  images: {
    // Vercel handles image optimization automatically
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "brainyprolocal.com",
      },
    ],
  },

  // Security headers for production
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "Referrer-Policy",
            value: "origin-when-cross-origin",
          },
          {
            key: "X-DNS-Prefetch-Control",
            value: "on",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
