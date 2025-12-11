/** @type {import('next').NextConfig} */
const nextConfig = {
  // Remove or comment out output: 'export'
  // output: 'export',

  // Keep images configuration
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'rickandmortyapi.com',
        pathname: '/api/character/avatar/**',
      },
    ],
  },
};

module.exports = nextConfig;