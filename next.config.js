/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers() {
    return [
      {
        source: '/api/:path*',
        headers: [
          { key: 'Access-Control-Allow-Credentials', value: 'true' },
          { key: 'Access-Control-Allow-Origin', value: process.env.NEXT_PUBLIC_VERCEL_URL || '*' },
          { key: 'Access-Control-Allow-Methods', value: 'GET,OPTIONS,PATCH,DELETE,POST,PUT' },
          { key: 'Access-Control-Allow-Headers', value: 'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept' },
        ],
      },
    ];
  },
  reactStrictMode: true,
  images: {
    domains: ["s2.coinmarketcap.com"],
  },
};

module.exports = nextConfig;
