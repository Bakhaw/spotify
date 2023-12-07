import { useEffect, useState } from "react";
import { NextPage } from "next";
import { useSession } from "next-auth/react";
import { NextSeo } from "next-seo";
import { useRecoilState } from "recoil";
import { LightbulbIcon, LightbulbOffIcon } from "lucide-react";

import { currentTrackIdState, isPlayingState } from "@/atoms/trackAtom";
import useDominantColor from "@/hooks/useDominantColor";
import useSpotify from "@/hooks/useSpotify";
import useTrack from "@/hooks/useTrack";
import generateRGBString from "@/lib/generateRGBString";

import Vinyl from "@/components/Vinyl";

import { Button } from "@/components/ui/button";

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

  const [useAlbumColor, setUseAlbumColor] = useState(true);
  const color = useDominantColor(track?.album.images[0].url);

  return (
    <div
      className="flex flex-col justify-center items-center h-screen bg-gradient-secondary overflow-hidden"
      style={{
        backgroundColor: useAlbumColor ? generateRGBString(color) : "#000",
      }}
    >
      <NextSeo title="music app - studio" description="music app - studio" />

      <Button
        className="border absolute top-4 right-8"
        onClick={() => setUseAlbumColor((useAlbumColor) => !useAlbumColor)}
        size="icon"
        variant="ghost"
      >
        {useAlbumColor ? <LightbulbIcon /> : <LightbulbOffIcon />}
      </Button>

      <Vinyl />
    </div>
  );
};

export default Studio;
