/** @type {import('next').NextConfig} */
const path = require('path');
require('dotenv').config();

const withTM = require('next-transpile-modules')(['neat-treats']);

const nextConfig = withTM({
  env: {
    SENDGRID_API_KEY: process.env.SENDGRID_API_KEY,
    EMAIL: process.env.EMAIL,
    VERIFIED_EMAIL: process.env.VERIFIED_EMAIL,
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
});

module.exports = nextConfig;
