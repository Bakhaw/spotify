import { FaCirclePlay, FaCirclePause } from "react-icons/fa6";
import { IoPlaySkipBack, IoPlaySkipForward } from "react-icons/io5";

import { usePlayerContext } from "@/context/PlayerContext";

import useSpotify from "@/hooks/useSpotify";

const Controls = () => {
  const { currentPlaybackState, hydratePlaybackState } = usePlayerContext();
  const spotifyApi = useSpotify();

  async function onBackwardButtonClick() {
    await spotifyApi.skipToPrevious();

    // set timeout is used to make sure the previous song has finished fetching
    setTimeout(async () => {
      await hydratePlaybackState();
    }, 500);
  }

  async function onForwardButtonClick() {
    await spotifyApi.skipToNext();

    // set timeout is used to make sure the next song has finished fetching
    setTimeout(async () => {
      await hydratePlaybackState();
    }, 500);
  }

  async function onTogglePlay() {
    if (currentPlaybackState?.is_playing) {
      spotifyApi.pause();

      setTimeout(async () => {
        await hydratePlaybackState();
      }, 500);
    } else {
      spotifyApi.play();

      setTimeout(async () => {
        await hydratePlaybackState();
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
      {currentPlaybackState?.is_playing ? (
        <div
          className="h-full p-2 rounded-full bg-white cursor-pointer transition-all hover:scale-105"
          onClick={onTogglePlay}
        >
          <svg
            data-encore-id="icon"
            role="button"
            aria-hidden="true"
            viewBox="0 0 16 16"
            className="h-4 w-4"
          >
            <path d="M2.7 1a.7.7 0 0 0-.7.7v12.6a.7.7 0 0 0 .7.7h2.6a.7.7 0 0 0 .7-.7V1.7a.7.7 0 0 0-.7-.7H2.7zm8 0a.7.7 0 0 0-.7.7v12.6a.7.7 0 0 0 .7.7h2.6a.7.7 0 0 0 .7-.7V1.7a.7.7 0 0 0-.7-.7h-2.6z"></path>
          </svg>
        </div>
      ) : (
        <div
          className="h-full p-2 rounded-full bg-white cursor-pointer transition-all	hover:scale-105"
          onClick={onTogglePlay}
        >
          <svg
            data-encore-id="icon"
            role="button"
            aria-hidden="true"
            viewBox="0 0 16 16"
            className="h-4 w-4"
          >
            <path d="M3 1.713a.7.7 0 0 1 1.05-.607l10.89 6.288a.7.7 0 0 1 0 1.212L4.05 14.894A.7.7 0 0 1 3 14.288V1.713z"></path>
          </svg>
        </div>
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
