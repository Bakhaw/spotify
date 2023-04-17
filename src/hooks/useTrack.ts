import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRecoilState } from "recoil";

import { currentTrackIdState } from "@/atoms/trackAtom";
import useSpotify from "./useSpotify";

function useTrack(trackId?: string) {
  const { data: session } = useSession();
  const spotifyApi = useSpotify();

  const [currentTrackId, setCurrentTrackId] =
    useRecoilState(currentTrackIdState);
  const [track, setTrack] = useState<SpotifyApi.TrackObjectFull>();

  async function getTrack() {
    if (!trackId) return;

    const { body } = await spotifyApi.getTrack(trackId);
    setTrack(body);
  }

  useEffect(() => {
    if (spotifyApi.getAccessToken()) {
      getTrack();
    }
  }, [currentTrackId, session, spotifyApi]);

  return track;
}

export default useTrack;
