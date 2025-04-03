import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'teal-worrying-rook-360.mypinata.cloud',
        pathname: '/ipfs/**',
      },
    ],
  },
};

export default nextConfig;
