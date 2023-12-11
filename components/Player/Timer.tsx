import { ChangeEvent, useContext, useEffect } from "react";

import { PlayerContext } from "@/context/PlayerContext";

import useSpotify from "@/hooks/useSpotify";

function Timer() {
  const spotifyApi = useSpotify();
  const playerContext = useContext(PlayerContext);

  function onProgressChange(e: ChangeEvent<HTMLInputElement>) {
    const newProgressMs = Number(e.target.value);

    if (
      !newProgressMs ||
      newProgressMs === playerContext?.currentPlaybackState?.progress_ms
    )
      return;

    playerContext?.setCurrentPlaybackState((state) => {
      if (!state) return null;

      return {
        ...state,
        progress_ms: newProgressMs,
      };
    });

    spotifyApi.seek(newProgressMs);
  }

  useEffect(() => {
    if (
      !playerContext?.currentPlaybackState?.item ||
      !playerContext?.currentPlaybackState.is_playing
    )
      return;

    const intervalId = setInterval(() => {
      playerContext.setCurrentPlaybackState((state) => {
        if (!state || !state.progress_ms || !state.item) return null;

        if (state.progress_ms > state.item.duration_ms - 1000) {
          playerContext.hydratePlaybackState();
          return state;
        } else {
          return {
            ...state,
            progress_ms: state.progress_ms + 1000,
          };
        }
      });
    }, 1000);

    return () => clearInterval(intervalId);
  }, [playerContext]);

  if (
    !playerContext?.currentPlaybackState?.progress_ms ||
    !playerContext?.currentPlaybackState?.item
  )
    return null;

  const currentMinutes = Math.floor(
    (playerContext.currentPlaybackState.progress_ms / 1000 / 60) << 0
  );
  const currentSeconds = Math.floor(
    (playerContext.currentPlaybackState.progress_ms / 1000) % 60
  );
  const maxMinutes = Math.floor(
    (playerContext.currentPlaybackState.item.duration_ms / 1000 / 60) << 0
  );
  const maxSeconds = Math.floor(
    (playerContext.currentPlaybackState.item.duration_ms / 1000) % 60
  );

  return (
    <div className="flex justify-center items-center w-full gap-2">
      <span>
        {currentMinutes}:{currentSeconds.toString().padStart(2, "0")}
      </span>

      <input
        className="w-full"
        min={0}
        max={playerContext.currentPlaybackState.item.duration_ms}
        onChange={onProgressChange}
        type="range"
        value={playerContext.currentPlaybackState.progress_ms}
      />

      <span>
        {maxMinutes}:{maxSeconds.toString().padStart(2, "0")}
      </span>
    </div>
  );
}

export default Timer;
