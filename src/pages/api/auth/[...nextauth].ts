import NextAuth from "next-auth";
import SpotifyProvider from "next-auth/providers/spotify";

import { LOGIN_URL } from "@/lib/spotify";

export const authOptions = {
  providers: [
    SpotifyProvider({
      authorization: LOGIN_URL,
      clientId: process.env.SPOTIFY_CLIENT_ID ?? "",
      clientSecret: process.env.SPOTIFY_CLIENT_SECRET ?? "",
    }),
  ],
  secret: process.env.JWT_SECRET,
};
export default NextAuth(authOptions);
