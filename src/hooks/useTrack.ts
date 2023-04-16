import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";

import { currentTrackIdState } from "@/atoms/trackAtom";
import useSpotify from "./useSpotify";

function useTrack(trackId?: string) {
  const spotifyApi = useSpotify();
  const [currentTrackId, setCurrentTrackId] =
    useRecoilState(currentTrackIdState);
  const [track, setTrack] = useState<SpotifyApi.TrackObjectFull>();

  async function getTrack() {
    if (currentTrackId) {
      const { body } = await spotifyApi.getTrack(trackId ?? currentTrackId);
      setTrack(body);
    }
  }

  useEffect(() => {
    getTrack();
  }, [currentTrackId, spotifyApi]);

  return track;
}

export default useTrack;
