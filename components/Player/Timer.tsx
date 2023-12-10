"use client";

import { useRecoilValue } from "recoil";

import { currentTrackIdState } from "@/atoms/trackAtom";
import useSpotify from "@/hooks/useSpotify";
import useTrack from "@/hooks/useTrack";
import useTimer from "@/hooks/useTimer";

import { Slider } from "@/components/ui/slider";
import { cn } from "@/lib/utils";

function Timer() {
  const spotifyApi = useSpotify();
  const [timer, setTimer] = useTimer();

  const currentTrackId = useRecoilValue(currentTrackIdState);
  const track = useTrack(currentTrackId);

  function onProgressChange(newProgressMsArray: number[]) {
    const newProgressMs = newProgressMsArray[0];
    setTimer(newProgressMs);
    spotifyApi.seek(newProgressMs);
  }

  if (!timer || !track) return null;

  const currentMinutes = Math.floor((timer / 1000 / 60) << 0);
  const currentSeconds = Math.floor((timer / 1000) % 60);

  const maxMinutes = Math.floor((track.duration_ms / 1000 / 60) << 0);
  const maxSeconds = Math.round((track.duration_ms / 1000) % 60);

  return (
    <div className="flex items-center justify-around w-[500px] gap-5">
      <span>
        {currentMinutes}:{currentSeconds.toString().padStart(2, "0")}
      </span>
      <Slider
        min={0}
        max={track.duration_ms}
        onValueChange={(event) => onProgressChange(event)}
        value={[timer]}
        className={cn("w-[100%]")}
      />
      <span>
        {maxMinutes}:{maxSeconds.toString().padStart(2, "0")}
      </span>
    </div>
  );
}

export default Timer;
