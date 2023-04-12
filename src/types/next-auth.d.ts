import { type DefaultSession } from "next-auth";

// https://stackoverflow.com/a/75705869
declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    error: string;
    user?: {
      id: string;
      role?: string;
      username?: string;
      accessToken: string;
      refreshToken: string;
    } & DefaultSession["user"];
  }
}
