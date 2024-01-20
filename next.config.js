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
  "thisis-images.spotifycdn.com",
  "seeded-session-images.scdn.co",
  "seed-mix-image.spotifycdn.com",
  "newjams-images.scdn.co",
];

const nextConfig = withPWA({
  images: {
    remotePatterns: hosts.map((host) => ({
      hostname: host,
    })),
  },
});

module.exports = nextConfig;
