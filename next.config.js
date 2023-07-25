/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: true,
  },
  images: {
    domains: ['lh3.googleusercontent.com', 'placekitten.com', 'picsum.photos'],
  },
}

module.exports = nextConfig
