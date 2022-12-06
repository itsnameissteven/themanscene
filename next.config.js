/** @type {import('next').NextConfig} */
const path = require('path');
require('dotenv').config();

const nextConfig = {
  env: {
    SENDGRID_API_KEY: process.env.SENDGRID_API_KEY,
    EMAIL: process.env.EMAIL,
    VERIFIED_EMAIL: process.env.VERIFIED_EMAIL,
  },
  experimental: {
    transpilePackages: ['@acme/ui', 'lodash-es'],
  },
  reactStrictMode: true,
  output: 'standalone',
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
  images: {},
  webpack: (config) => {
    config.resolve.fallback = { fs: false };

    return config;
  },
};

module.exports = nextConfig;
