import { useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRecoilState } from "recoil";

import { currentTrackIdState, isPlayingState } from "@/atoms/trackAtom";
import useSpotify from "@/hooks/useSpotify";
import useTrack from "@/hooks/useTrack";
import Vinyl from "@/components/Vinyl";

function Studio() {
  const { data: session } = useSession();
  const spotifyApi = useSpotify();
  const [currentTrackId, setCurrentTrackId] =
    useRecoilState(currentTrackIdState);
  const [_, setIsPlaying] = useRecoilState(isPlayingState);
  const track = useTrack(currentTrackId);

  async function getCurrentTrack() {
    if (track) return;

    const { body: currentPlaybackState } =
      await spotifyApi.getMyCurrentPlaybackState();

    if (!currentPlaybackState) return;

    setIsPlaying(currentPlaybackState.is_playing);
    setCurrentTrackId(String(currentPlaybackState.item?.id));
  }

  useEffect(() => {
    if (spotifyApi.getAccessToken() && !currentTrackId) {
      getCurrentTrack();
    }
  }, [currentTrackIdState, spotifyApi, session]);

  return (
    <div className="flex justify-center items-center h-screen">
      <Vinyl />
    </div>
  );
}

export default Studio;
