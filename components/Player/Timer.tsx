import { useContext } from "react";
import { debounce } from "lodash";

import { PlayerContext } from "@/context/PlayerContext";
import { TimerContext } from "@/context/TimerContext";

import useSpotify from "@/hooks/useSpotify";

import { Slider } from "@/components/ui/slider";

function Timer() {
  const spotifyApi = useSpotify();
  const playerContext = useContext(PlayerContext);
  const timerContext = useContext(TimerContext);

  function onProgressChange(value: number[]) {
    const newProgressMs = value[0];

    if (!newProgressMs || newProgressMs === timerContext?.progressMs) return;

    timerContext?.setProgressMs(newProgressMs);
    spotifyApi.seek(newProgressMs);
  }

  const debounceOnProgressChange = debounce((value: number[]) => {
    onProgressChange(value);
  }, 300);

  if (!playerContext?.currentPlaybackState?.item) return null;

  const currentMinutes = Math.floor((timerContext.progressMs / 1000 / 60) << 0);
  const currentSeconds = Math.floor((timerContext.progressMs / 1000) % 60);
  const maxMinutes = Math.floor(
    (playerContext.currentPlaybackState.item.duration_ms / 1000 / 60) << 0
  );
  const maxSeconds = Math.floor(
    (playerContext.currentPlaybackState.item.duration_ms / 1000) % 60
  );

  return (
    <div className="flex justify-around w-[300px] lg:w-full gap-2">
      <span>
        {currentMinutes}:{currentSeconds.toString().padStart(2, "0")}
      </span>

      <Slider
        min={0}
        max={playerContext.currentPlaybackState.item.duration_ms}
        onValueChange={debounceOnProgressChange}
        value={[timerContext.progressMs]}
      />

      <span>
        {maxMinutes}:{maxSeconds.toString().padStart(2, "0")}
      </span>
    </div>
  );
}

export default Timer;
