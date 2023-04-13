import NextAuth from "next-auth";
import SpotifyProvider from "next-auth/providers/spotify";
import { JWT } from "next-auth/jwt";

import spotifyApi, { params } from "@/lib/spotify";
import config from "@/lib/config";

async function refreshAccessToken(token: JWT) {
  try {
    spotifyApi.setAccessToken(String(token.accessToken));
    spotifyApi.setRefreshToken(String(token.refreshToken));

    const { body: refreshedToken } = await spotifyApi.refreshAccessToken();

    return {
      ...token,
      accessToken: refreshedToken.access_token,
      accessTokenExpires: Date.now() + refreshedToken.expires_in * 1000, // = 1 hour
      refreshToken: refreshedToken.refresh_token ?? token.refreshToken,
    };
  } catch (error) {
    return {
      ...token,
      error: "RefreshAccessTokenError",
    };
  }
}

export default NextAuth({
  providers: [
    SpotifyProvider({
      authorization: spotifyApi.createAuthorizeURL(params.scopes, params.state),
      clientId: config.clientId ?? "",
      clientSecret: config.clientSecret ?? "",
    }),
  ],
  secret: config.jwtSecret,
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async jwt({ account, token, user }) {
      // Initial sign in
      if (account && user) {
        return {
          ...token,
          accessToken: account.access_token,
          refreshToken: account.refresh_token,
          username: account.providerAccountId,
          accessTokenExpires: account.expires_at
            ? account.expires_at * 1000
            : null,
        };
      }

      // Return previous token if the access token has not expired yet
      if (Date.now() < Number(token.accessTokenExpires)) {
        return token;
      }

      // Access token has expires, we need to refresh it
      return await refreshAccessToken(token);
    },

    async session({ session, token }) {
      const userSession = {
        ...session,
        user: {
          ...session.user,
          accessToken: token.accessToken,
          refreshToken: token.refreshToken,
          username: token.username,
        },
      };

      return userSession;
    },
  },
});
