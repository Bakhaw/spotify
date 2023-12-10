import { debounce } from "lodash";

import { usePlayerContext } from "@/context/PlayerContext";
import { useTimerContext } from "@/context/TimerContext";

import useSpotify from "@/hooks/useSpotify";

import { Slider } from "@/components/ui/slider";

function Timer() {
  const spotifyApi = useSpotify();
  const { currentPlaybackState } = usePlayerContext();
  const { progressMs, setProgressMs } = useTimerContext();

  function onProgressChange(value: number[]) {
    const newProgressMs = value[0];

    if (!newProgressMs || newProgressMs === progressMs) return;

    setProgressMs(newProgressMs);
    spotifyApi.seek(newProgressMs);
  }

  const debounceOnProgressChange = debounce((value: number[]) => {
    onProgressChange(value);
  }, 300);

  if (!currentPlaybackState?.item) return null;

  const currentMinutes = Math.floor((progressMs / 1000 / 60) << 0);
  const currentSeconds = Math.floor((progressMs / 1000) % 60);
  const maxMinutes = Math.floor(
    (currentPlaybackState.item.duration_ms / 1000 / 60) << 0
  );
  const maxSeconds = Math.floor(
    (currentPlaybackState.item.duration_ms / 1000) % 60
  );

  return (
    <div className="flex justify-around w-[300px] lg:w-full gap-2">
      <span>
        {currentMinutes}:{currentSeconds.toString().padStart(2, "0")}
      </span>

      <Slider
        min={0}
        max={currentPlaybackState.item.duration_ms}
        onValueChange={debounceOnProgressChange}
        value={[progressMs]}
      />

      <span>
        {maxMinutes}:{maxSeconds.toString().padStart(2, "0")}
      </span>
    </div>
  );
}

export default Timer;
