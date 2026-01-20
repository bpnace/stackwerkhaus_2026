import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
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
