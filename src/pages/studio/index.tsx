import { useEffect } from "react";
import { NextPage } from "next";
import { useSession } from "next-auth/react";
import { NextSeo } from "next-seo";
import { useRecoilState } from "recoil";

import { currentTrackIdState, isPlayingState } from "@/atoms/trackAtom";

import useSpotify from "@/hooks/useSpotify";
import useTrack from "@/hooks/useTrack";

import Vinyl from "@/components/Vinyl";
import useDominantColor from "@/hooks/useDominantColor";

const Studio: NextPage = () => {
  const { data: session } = useSession();
  const spotifyApi = useSpotify();
  const [currentTrackId, setCurrentTrackId] =
    useRecoilState(currentTrackIdState);
  const [_, setIsPlaying] = useRecoilState(isPlayingState);
  const track = useTrack(currentTrackId);

  useEffect(() => {
    if (spotifyApi.getAccessToken() && !currentTrackId) {
      const getCurrentTrack = async () => {
        if (track) return;

        const { body: currentPlaybackState } =
          await spotifyApi.getMyCurrentPlaybackState();

        if (!currentPlaybackState) return;

        setIsPlaying(currentPlaybackState.is_playing);
        setCurrentTrackId(String(currentPlaybackState.item?.id));
      };

      getCurrentTrack();
    }
  }, [
    session,
    spotifyApi,
    currentTrackId,
    setCurrentTrackId,
    setIsPlaying,
    track,
  ]);

  const [r, g, b] = useDominantColor(track?.album);
  const rgb = `rgb(${r},${g},${b})`;

  return (
    <div className="flex justify-center items-center h-screen bg-gradient">
      <NextSeo title="music app - studio" description="music app - studio" />

      <Vinyl />
    </div>
  );
};

export default Studio;
