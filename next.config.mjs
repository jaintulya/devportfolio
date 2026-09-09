/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "*.amazonaws.com",
        pathname: "/**",
      },
    ],
    formats: ['image/avif', 'image/webp'],
  },
  async redirects() {
    return [
      {
        source: '/:path*',
        has: [
          {
            type: 'host',
            value: 'shaadipitara.vercel.app',
          },
        ],
        destination: 'https://www.shaadipitara.in/:path*',
        permanent: true,
      },
      {
        source: '/:path*',
        has: [
          {
            type: 'host',
            value: 'shaadipitara.in',
          },
        ],
        destination: 'https://www.shaadipitara.in/:path*',
        permanent: true,
      },
    ];
  },
};
export default nextConfig;
