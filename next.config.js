require('dotenv').config();
const withFonts = require('next-fonts');

module.exports = withFonts({
  eslint: {
    ignoreDuringBuilds: true,
  },
  experimental: {
    scrollRestoration: false,
  },
  images: {
    unoptimized: true,
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'heydealer-api.s3.amazonaws.com',
      },
    ],
  },
  webpack: config => {
    config.module.rules.push({
      test: /\.(eot|woff|woff2|ttf|svg|png|jpg|gif)$/,
      use: {
        loader: 'url-loader',
        options: {
          limit: 100000,
          name: '[name].[ext]',
        },
      },
    });
    return config;
  },
});
