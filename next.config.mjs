/** @type {import('next').NextConfig} */
import path from 'path';

const dirname = path.dirname(new URL(import.meta.url).pathname);

const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*',
      },
    ],
  },
  reactStrictMode: true,
  pageExtensions: ['page.tsx', 'page.ts', 'page.jsx', 'page.js'],
  sassOptions: {
    includePaths: [path.join(dirname, 'styles')],
    prependData: `@import "src/styles/_variables.scss"; @import "src/styles/_mixins.scss";`,
  },
};

export default nextConfig;
