import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  basePath: '/mb-preview',
  reactStrictMode: true,
  images: {
    unoptimized: true,
  },
  turbopack: {
    root: '.',
  },
};

export default nextConfig;
