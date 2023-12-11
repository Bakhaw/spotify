import { useContext } from "react";

import { FaCirclePlay, FaCirclePause } from "react-icons/fa6";
import { IoPlaySkipBack, IoPlaySkipForward } from "react-icons/io5";

import { PlayerContext } from "@/context/PlayerContext";

import useSpotify from "@/hooks/useSpotify";

const Controls = () => {
  const spotifyApi = useSpotify();
  const playerContext = useContext(PlayerContext);

  async function onBackwardButtonClick() {
    await spotifyApi.skipToPrevious();

    // set timeout is used to make sure the previous song has finished fetching
    setTimeout(async () => {
      await playerContext?.hydratePlaybackState();
    }, 500);
  }

  async function onForwardButtonClick() {
    await spotifyApi.skipToNext();

    // set timeout is used to make sure the next song has finished fetching
    setTimeout(async () => {
      await playerContext?.hydratePlaybackState();
    }, 500);
  }

  async function onTogglePlay() {
    if (playerContext?.currentPlaybackState?.is_playing) {
      spotifyApi.pause();

      setTimeout(async () => {
        await playerContext?.hydratePlaybackState();
      }, 500);
    } else {
      spotifyApi.play();

      setTimeout(async () => {
        await playerContext?.hydratePlaybackState();
      }, 500);
    }
  }

  return (
    <div className="flex justify-center items-center gap-4 h-full w-full">
      <IoPlaySkipBack
        className="h-6 w-6 transition-all	hover:scale-110"
        role="button"
        onClick={onBackwardButtonClick}
      />
      {playerContext?.currentPlaybackState?.is_playing ? (
        <FaCirclePause
          className="h-9 w-9 transition-all	hover:scale-110"
          onClick={onTogglePlay}
          role="button"
        />
      ) : (
        <FaCirclePlay
          className="h-9 w-9 transition-all	hover:scale-110"
          onClick={onTogglePlay}
          role="button"
        />
      )}
      <IoPlaySkipForward
        className="h-6 w-6 transition-all	hover:scale-110"
        role="button"
        onClick={onForwardButtonClick}
      />
    </div>
  );
};

export default Controls;
