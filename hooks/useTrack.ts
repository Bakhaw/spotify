"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useSearchParams } from "next/navigation";

import { SearchProvider } from "@/types";

import useSpotify from "./useSpotify";

function useTrack(trackId?: string) {
  const spotifyApi = useSpotify();
  const { data: session } = useSession();
  const searchParams = useSearchParams();
  const provider = searchParams.get("provider") as SearchProvider;

  const [track, setTrack] = useState<SpotifyApi.TrackObjectFull>();

  useEffect(() => {
    if (spotifyApi.getAccessToken() && trackId) {
      const getTrack = async () => {
        if (provider === "youtube") return;

        const { body } = await spotifyApi.getTrack(trackId);
        setTrack(body);
      };

      getTrack();
    }
  }, [session, spotifyApi, trackId, provider]);

  return track;
}

export default useTrack;
