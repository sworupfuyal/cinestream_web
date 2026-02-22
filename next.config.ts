/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '6050',
        pathname: '/uploads/**',
      },
      {
        protocol: 'https',
        hostname: 'your-production-domain.com',
        pathname: '/uploads/**',
      },
    ],
  },
  experimental: {
    serverActions: {
      bodySizeLimit: '5gb', // ✅ Server Actions limit
    },
  },
  // ✅ Removed middlewareClientMaxBodySize - not supported in Next.js 16
}

module.exports = nextConfig