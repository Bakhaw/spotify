const withPWA = require("next-pwa")({
  dest: "public",
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === "development",
});

// from spotify api
const hosts = [
  "i.scdn.co",
  "t.scdn.co",
  "mosaic.scdn.co",
  "blend-playlist-covers.spotifycdn.com",
  "wrapped-images.spotifycdn.com",
  "lineup-images.scdn.co",
  "platform-lookaside.fbsbx.com",
  "image-cdn-ak.spotifycdn.com",
  "image-cdn-fa.spotifycdn.com",
];

const nextConfig = withPWA({
  // next config
  images: {
    remotePatterns: hosts.map((host) => ({
      hostname: host,
    })),
  },
});

module.exports = nextConfig;
