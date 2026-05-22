import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  basePath: '/mb-preview',
  reactStrictMode: true,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
