import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
};

export default nextConfig;

module.exports = {
  serverRuntimeConfig: {
    azureSqlPassword: process.env.AZURE_SQL_PASSWORD,
  },
  publicRuntimeConfig: {
    azureSqlServer: process.env.AZURE_SQL_SERVER,
  }
};



module.exports = nextConfig;