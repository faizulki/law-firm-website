import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  // The articles.ts data-file store uses a variable fs path, which makes
  // Next's tracer conservatively include the whole project. Trim it back
  // down to just what the standalone server actually needs at runtime.
  outputFileTracingExcludes: {
    "/*": ["./src/**/*", "./fix/**/*", "./.git/**/*", "./data/**/*"],
  },
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
