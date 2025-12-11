import { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // Enable static HTML export for Cloudflare Pages
  output: 'export',

  // Optional: Set the base path if your site is deployed under a subdirectory
  // basePath: '/your-base-path',

  // Optional: Other Next.js settings
  reactStrictMode: true,
};

export default nextConfig;