import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

const nextConfig: NextConfig = {
  experimental: {
    optimizeCss: false,
  },
  poweredByHeader: false,
  compress: true,
};

export default withNextIntl(nextConfig);
