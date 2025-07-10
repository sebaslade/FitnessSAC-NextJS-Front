import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["res.cloudinary.com"],
  },
  redirects: async () => [
    {
      source: "/",
      destination: "/entrenamientos",
      permanent: true,
    },
  ],
}

export default nextConfig
