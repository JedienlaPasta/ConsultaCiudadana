import type { NextConfig } from 'next';
import type { Configuration } from 'webpack';

const nextConfig: NextConfig = {
  output: "standalone",
  experimental: {
    optimizePackageImports: ["leaflet"],
    serverComponentsExternalPackages: ["exceljs", "rimraf", "fstream"],
  },
  serverExternalPackages: ["exceljs"],
  webpack: (config: Configuration, { isServer }: { isServer: boolean }) => {
    if (isServer) {
      // Asegurar que externals existe y es un array
      if (!config.externals) {
        config.externals = [];
      }
      if (Array.isArray(config.externals)) {
        config.externals.push("exceljs");
      }
    }
    return config;
  },
};

export default nextConfig;
