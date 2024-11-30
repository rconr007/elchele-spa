/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',  // Enables static HTML export
  images: {
    unoptimized: true, // Required for static export
  },
  // Base path - update this if you're not hosting at the root of your domain
  // basePath: '',
}

module.exports = nextConfig
