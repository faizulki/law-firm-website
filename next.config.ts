import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Stock photography placeholders. Swap these hosts for your CDN later.
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
};

export default nextConfig;
