const config = {
  clientId: process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID,
  clientSecret: process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_SECRET,
  jwtSecret: process.env.NEXT_PUBLIC_JWT_SECRET,
  redirectUri: process.env.NEXT_PUBLIC_SPOTIFY_REDIRECT_URI,
};

export default config;
