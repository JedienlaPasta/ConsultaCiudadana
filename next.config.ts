/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  experimental: {
    optimizePackageImports: ["leaflet"],
  },
};

module.exports = nextConfig;
