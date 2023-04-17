const withPWA = require("next-pwa")({
  dest: "public",
  register: true,
  skipWaiting: true,
});

const nextConfig = withPWA({
  // next config
  images: {
    domains: [
      // served from spotify api
      "i.scdn.co",
      "mosaic.scdn.co",
      "blend-playlist-covers.spotifycdn.com",
      "wrapped-images.spotifycdn.com",
      "lineup-images.scdn.co",
    ],
  },
});

module.exports = nextConfig;
