const withPWA = require("next-pwa")({
  dest: "public",
  register: true,
  skipWaiting: true,
});

const nextConfig = withPWA({
  // next config
  images: {
    domains: ["i.scdn.co"],
  },
});

module.exports = nextConfig;
