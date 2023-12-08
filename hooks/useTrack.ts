"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRecoilValue } from "recoil";

import { currentTrackIdState } from "@/atoms/trackAtom";

import useSpotify from "./useSpotify";

function useTrack(trackId?: string) {
  const { data: session } = useSession();
  const spotifyApi = useSpotify();

  const currentTrackId = useRecoilValue(currentTrackIdState);
  const [track, setTrack] = useState<SpotifyApi.TrackObjectFull>();

  useEffect(() => {
    if (spotifyApi.getAccessToken() && trackId) {
      const getTrack = async () => {
        const { body } = await spotifyApi.getTrack(trackId);
        setTrack(body);
      };

      getTrack();
    }
  }, [session, spotifyApi, currentTrackId, trackId]);

  return track;
}

export default useTrack;
