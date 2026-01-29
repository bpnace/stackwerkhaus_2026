import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cms.codariq.de",
        pathname: "/**",
      },
    ],
  },
  transpilePackages: ["gsap"],
};

export default nextConfig;
