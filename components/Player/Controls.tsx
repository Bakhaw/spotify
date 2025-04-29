import { useSearchParams } from "next/navigation";

import { TrackOrigin } from "@/types";

import { usePlayerStore } from "@/store/usePlayerStore";
import { useTimerStore } from "@/store/useTimerStore";
import { useYTPlayerStore } from "@/store/useYTPlayerStore";

import isWhite from "@/lib/isWhite";

import useDominantColor from "@/hooks/useDominantColor";
import usePlaybackControls from "@/hooks/usePlaybackControls";
import useSpotify from "@/hooks/useSpotify";
import useTrack from "@/hooks/useTrack";

import { Button } from "../ui/button";

const Controls = () => {
  const spotifyApi = useSpotify();
  const searchParams = useSearchParams();
  const provider = searchParams.get("provider");

  const { pauseSong, resumeSong } = usePlaybackControls();
  const {
    currentPlaybackState,
    fetchPlaybackState,
    fetchQueue,
    setCurrentPlaybackState,
  } = usePlayerStore();
  const YTPlayer = useYTPlayerStore((s) => s.player);
  const setProgressMs = useTimerStore((s) => s.setProgressMs);
  const currentTrack = useTrack(currentPlaybackState?.item?.id);

  // TODO handle back button using queue
  async function onBackwardButtonClick() {
    await spotifyApi.skipToPrevious();

    // set timeout is used to make sure the previous song has finished fetching
    setTimeout(async () => {
      await fetchPlaybackState();
    }, 500);
  }

  async function nextSong() {
    const queue = await fetchQueue();
    const nextTrack = queue?.queue[0];

    if (!currentPlaybackState || !nextTrack) return;

    setCurrentPlaybackState({
      ...currentPlaybackState,
      item: {
        ...nextTrack,
        origin: TrackOrigin.SPOTIFY,
      },
      is_playing: true,
      progress_ms: 0,
    });

    setProgressMs(0);

    await spotifyApi.skipToNext();
  }

  function onTogglePlay() {
    if (!currentPlaybackState) return;

    if (currentPlaybackState.is_playing) {
      pauseSong();
    } else {
      resumeSong();
    }
  }

  const dominantColor = useDominantColor(currentTrack?.album.images[0].url);
  const isWhiteBg = isWhite(dominantColor);

  return (
    <div className="flex justify-center items-center gap-4 h-full w-full">
      <Button
        disabled={provider === "youtube"}
        variant="ghost"
        className="h-full p-2 cursor-pointer transition-all	hover:scale-105"
        onClick={onBackwardButtonClick}
      >
        <svg
          data-encore-id="icon"
          role="button"
          aria-hidden="true"
          viewBox="0 0 16 16"
          className="h-6 w-6 sm:h-4 sm:w-4 fill-white"
        >
          <path d="M3.3 1a.7.7 0 0 1 .7.7v5.15l9.95-5.744a.7.7 0 0 1 1.05.606v12.575a.7.7 0 0 1-1.05.607L4 9.149V14.3a.7.7 0 0 1-.7.7H1.7a.7.7 0 0 1-.7-.7V1.7a.7.7 0 0 1 .7-.7h1.6z"></path>
        </svg>
      </Button>

      {currentPlaybackState?.is_playing ? (
        <Button
          disabled={provider === "youtube" && !YTPlayer}
          variant="ghost"
          className="h-full p-2 rounded-full bg-white cursor-pointer transition-all hover:scale-105 hover:bg-white"
          onClick={onTogglePlay}
        >
          <svg
            data-encore-id="icon"
            role="button"
            aria-hidden="true"
            viewBox="0 0 16 16"
            className="h-6 w-6 sm:h-4 sm:w-4 fill-black"
          >
            <path d="M2.7 1a.7.7 0 0 0-.7.7v12.6a.7.7 0 0 0 .7.7h2.6a.7.7 0 0 0 .7-.7V1.7a.7.7 0 0 0-.7-.7H2.7zm8 0a.7.7 0 0 0-.7.7v12.6a.7.7 0 0 0 .7.7h2.6a.7.7 0 0 0 .7-.7V1.7a.7.7 0 0 0-.7-.7h-2.6z"></path>
          </svg>
        </Button>
      ) : (
        <Button
          disabled={provider === "youtube" && !YTPlayer}
          variant="ghost"
          className="h-full p-2 rounded-full bg-white cursor-pointer transition-all	hover:scale-105 hover:bg-white"
          onClick={onTogglePlay}
        >
          <svg
            data-encore-id="icon"
            role="button"
            aria-hidden="true"
            viewBox="0 0 16 16"
            className="h-6 w-6 sm:h-4 sm:w-4 fill-black"
          >
            <path d="M3 1.713a.7.7 0 0 1 1.05-.607l10.89 6.288a.7.7 0 0 1 0 1.212L4.05 14.894A.7.7 0 0 1 3 14.288V1.713z"></path>
          </svg>
        </Button>
      )}

      <Button
        disabled={provider === "youtube"}
        variant="ghost"
        className="h-full p-2 cursor-pointer transition-all	hover:scale-105"
        onClick={nextSong}
      >
        <svg
          data-encore-id="icon"
          role="button"
          aria-hidden="true"
          viewBox="0 0 16 16"
          className="h-6 w-6 sm:h-4 sm:w-4 fill-white"
        >
          <path d="M12.7 1a.7.7 0 0 0-.7.7v5.15L2.05 1.107A.7.7 0 0 0 1 1.712v12.575a.7.7 0 0 0 1.05.607L12 9.149V14.3a.7.7 0 0 0 .7.7h1.6a.7.7 0 0 0 .7-.7V1.7a.7.7 0 0 0-.7-.7h-1.6z"></path>
        </svg>
      </Button>
    </div>
  );
};

export default Controls;
