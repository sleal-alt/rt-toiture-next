/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    unoptimized: true,
  },
  async redirects() {
    return [
      {
        source: '/hydrofuge-toiture',
        destination: '/services/traitement-hydrofuge-toiture',
        permanent: true,
      },
    ]
  },
}

export default nextConfig
