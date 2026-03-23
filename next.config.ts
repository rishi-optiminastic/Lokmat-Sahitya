import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Work around dev-time image cache failures from Next's optimizer/LRU layer.
    // Keep optimization enabled for production builds.
    unoptimized: process.env.NODE_ENV === "development",
    remotePatterns: [
      {
        protocol: "https",
        hostname: "i.ytimg.com",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
