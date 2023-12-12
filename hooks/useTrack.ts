"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

import useSpotify from "./useSpotify";

function useTrack(trackId?: string) {
  const spotifyApi = useSpotify();
  const { data: session } = useSession();

  const [track, setTrack] = useState<SpotifyApi.TrackObjectFull>();

  useEffect(() => {
    if (spotifyApi.getAccessToken() && trackId) {
      const getTrack = async () => {
        const { body } = await spotifyApi.getTrack(trackId);
        setTrack(body);
      };

      getTrack();
    }
  }, [session, spotifyApi, trackId]);

  return track;
}

export default useTrack;
