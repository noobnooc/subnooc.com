const {
  withContentlayer,
  createContentlayerPlugin,
} = require("next-contentlayer");

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  env: {
    projectId: "subjective-world",
  },
};

module.exports = withContentlayer(nextConfig);
