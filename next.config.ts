import { dirname } from "path";
import { fileURLToPath } from "url";
import type { NextConfig } from "next";

const __filename = fileURLToPath(import.meta.url);
const root = dirname(__filename);

const nextConfig: NextConfig = {
  turbopack: {
    root,
  },
  reactCompiler: true,
  images: {
    // Dev: 최적화 OFF → 캐시 없음, 이미지 교체 즉시 반영
    // Production: 최적화 ON → WebP 변환 + 캐시
    unoptimized: process.env.NODE_ENV === "development",
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.shopify.com",
        pathname: "/s/files/1/0610/0874/0454/**",
      },
      {
        protocol: "https",
        hostname: "placehold.co",
      },
      {
        protocol: "https",
        hostname: "www.prairiecricketfarms.com",
        pathname: "/wp-content/uploads/**",
      },
    ],
    formats: ["image/webp"],
  },
  poweredByHeader: false,
  devIndicators: false,
};

export default nextConfig;
