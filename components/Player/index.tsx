import { ChangeEvent, useCallback, useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import { useRecoilState } from "recoil";
import { debounce } from "lodash";

import { currentTrackIdState, isPlayingState } from "@/atoms/trackAtom";

import useSpotify from "@/hooks/useSpotify";
import useDominantColor from "@/hooks/useDominantColor";
import useTrack from "@/hooks/useTrack";
import generateRGBString from "@/lib/generateRGBString";
import isWhite from "@/lib/isWhite";

import ClosedPlayer from "./ClosedPlayer";
import OpenedPlayer from "./OpenedPlayer";
import useTimer from "@/hooks/useTimer";

export interface PlayerProps {
  onBackwardButtonClick: () => void;
  onForwardButtonClick: () => void;
  onTogglePlay: () => void;
}

const Player: React.FC = () => {
  const pathname = usePathname();
  const spotifyApi = useSpotify();

  const [currentTrackId, setCurrentTrackId] =
    useRecoilState(currentTrackIdState);
  const [_isPlaying, setIsPlaying] = useRecoilState(isPlayingState);
  const track = useTrack(currentTrackId);

  const [volume, setVolume] = useState(20);
  // const [timer, setTimer] = useTimer();
  const [showFullPlayer, setShowFullPlayer] = useState(false);

  async function onPreviousTrackClick() {
    // await spotifyApi.skipToPrevious();
    // await getCurrentTrack();
  }

  async function onNextTrackClick() {
    // await spotifyApi.skipToNext();
    // await getCurrentTrack();
  }

  async function togglePlay() {
    // const { body: currentPlaybackState } =
    //   await spotifyApi.getMyCurrentPlaybackState();
    // if (currentPlaybackState?.is_playing) {
    //   spotifyApi.pause();
    //   setIsPlaying(false);
    // } else {
    //   spotifyApi.play();
    //   setIsPlaying(true);
    // }
  }

  // volume handling
  // function onVolumeChange(e: React.ChangeEvent<HTMLInputElement>) {
  //   setVolume(parseInt(e.target.value));
  // }

  // const debounceAdjustVolume = useCallback(
  //   debounce((volume) => {
  //     spotifyApi.setVolume(volume);
  //   }, 300),
  //   []
  // );

  // useEffect(() => {
  //   if (spotifyApi.getAccessToken()) {
  //     if (volume > 0 && volume < 100) {
  //       debounceAdjustVolume(volume);
  //     }
  //   }
  // }, [spotifyApi, volume]);

  // player opened/closed handling
  useEffect(() => {
    setShowFullPlayer(false);
  }, [pathname]);

  const color = useDominantColor(track?.album.images[0].url);

  if (pathname === "/login" || pathname === "/studio") return null;

  const playerProps: PlayerProps = {
    onBackwardButtonClick: onPreviousTrackClick,
    onForwardButtonClick: onNextTrackClick,
    onTogglePlay: togglePlay,
  };

  return (
    <div
      className="fixed bottom-0 p-2 z-10 bg-transparent"
      style={{
        color: isWhite(color) ? "text-black" : "#fff",
        height: showFullPlayer ? "100vh" : "auto",
        transition: "0.3s",
        width: showFullPlayer ? "100%" : "calc(100% - 7px)",
        padding: showFullPlayer ? "0" : "0.5rem",
      }}
    >
      <div
        className="flex justify-center items-center h-full w-full  bg-gradient-secondary p-4 rounded"
        style={{
          backgroundColor: generateRGBString(color),
        }}
      >
        {showFullPlayer ? (
          <OpenedPlayer
            onClose={() => setShowFullPlayer(false)}
            {...playerProps}
          />
        ) : (
          <ClosedPlayer
            onOpen={() => setShowFullPlayer(true)}
            {...playerProps}
          />
        )}
      </div>
    </div>
  );
};

export default Player;
