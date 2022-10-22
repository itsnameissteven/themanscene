/** @type {import('next').NextConfig} */
const path = require('path');
require('dotenv').config();

const withTM = require('next-transpile-modules')(['neat-treats']);

const nextConfig = withTM({
  env: {},
  reactStrictMode: true,
  output: 'standalone',
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
  images: {},
});

module.exports = nextConfig;
