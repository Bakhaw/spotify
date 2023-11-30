const withPWA = require("next-pwa")({
  dest: "public",
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === "development",
});

const nextConfig = withPWA({
  images: {
    domains: [
      // from spotify api
      "i.scdn.co",
      "t.scdn.co",
      "mosaic.scdn.co",
      "blend-playlist-covers.spotifycdn.com",
      "wrapped-images.spotifycdn.com",
      "lineup-images.scdn.co",
      "platform-lookaside.fbsbx.com",
      "image-cdn-ak.spotifycdn.com",
    ],
  },
});

module.exports = nextConfig;
