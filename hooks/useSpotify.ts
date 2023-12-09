"use client";

import { useEffect } from "react";
import { signOut, useSession } from "next-auth/react";

import spotifyApi from "@/lib/spotify";

function useSpotify() {
  const { data: session } = useSession();

  useEffect(() => {
    if (session) {
      if (session.error === "RefreshAccessTokenError") {
        signOut();
      }

      if (session.accessToken) {
        spotifyApi.setAccessToken(session.accessToken);
      }
    }
  }, [session]);

  return spotifyApi;
}

export default useSpotify;
