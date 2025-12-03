/** @type {import('next').NextConfig} */

import { withPlausibleProxy } from "next-plausible";

const nextConfig = withPlausibleProxy()({
  // Netlify-specific optimizations
  trailingSlash: false,
  output: "standalone", // Better for Netlify deployment

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: `**`,
      },
    ],
    // Netlify-specific image optimization
    formats: ["image/webp", "image/avif"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
});

export default nextConfig;
