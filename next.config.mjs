/** @type {import('next').NextConfig} */
import path from 'path';
import removeImports from 'next-remove-imports';
import nextPwa from 'next-pwa';

const dirname = path.dirname(new URL(import.meta.url).pathname);

const withPWA = nextPwa({
  dest: 'public',
});

const nextConfig = removeImports({})({
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*',
      },
    ],
    formats: ['image/avif', 'image/webp'],
  },
  transpilePackages: ['@uiw/react-markdown-preview', '@uiw/react-md-editor'],
  reactStrictMode: true,
  pageExtensions: ['page.tsx', 'page.ts', 'page.jsx', 'page.js'],
  sassOptions: {
    includePaths: [path.join(dirname, 'styles')],
    prependData: `@import "src/styles/_variables.scss"; @import "src/styles/_mixins.scss";`,
  },
  swcMinify: true,
});

export default withPWA(nextConfig);
