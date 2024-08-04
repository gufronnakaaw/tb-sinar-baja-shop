/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "storage.googleapis.com",
      },
      {
        protocol: "https",
        hostname: "api.sinarbajakediri.my.id",
      },
    ],
  },
  experimental: {
    optimizePackageImports: ["@phosphor-icons/react", "@nextui-org/react"],
  },
};

export default nextConfig;
