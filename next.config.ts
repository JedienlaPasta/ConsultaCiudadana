import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  output: "standalone",
  experimental: {
    optimizePackageImports: ["leaflet"],
  },
  serverExternalPackages: ["exceljs", "rimraf", "fstream"],
};

export default nextConfig;
