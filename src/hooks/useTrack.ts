import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";

import { currentTrackIdState } from "@/atoms/trackAtom";
import useSpotify from "./useSpotify";

function useTrack(trackId?: string) {
  const spotifyApi = useSpotify();
  const token = spotifyApi.getAccessToken();
  const [currentTrackId, setCurrentTrackId] =
    useRecoilState(currentTrackIdState);
  const [track, setTrack] = useState<SpotifyApi.TrackObjectFull>();

  async function getTrack() {
    if (!trackId) return;

    const { body } = await spotifyApi.getTrack(trackId);
    setTrack(body);
  }

  useEffect(() => {
    if (token) {
      getTrack();
    }
  }, [currentTrackId, spotifyApi, token]);

  return track;
}

export default useTrack;
