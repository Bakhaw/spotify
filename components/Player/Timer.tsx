"use client";

import { ChangeEvent } from "react";
import { useRecoilValue } from "recoil";

import { currentTrackIdState } from "@/atoms/trackAtom";
import useSpotify from "@/hooks/useSpotify";
import useTrack from "@/hooks/useTrack";
import useTimer from "@/hooks/useTimer";

function Timer() {
  const spotifyApi = useSpotify();
  const [timer, setTimer] = useTimer();

  const currentTrackId = useRecoilValue(currentTrackIdState);
  const track = useTrack(currentTrackId);

  function onProgressChange(e: ChangeEvent<HTMLInputElement>) {
    const newProgressMs = Number(e.target.value);
    setTimer(newProgressMs);
    spotifyApi.seek(newProgressMs);
  }

  if (!timer || !track) return null;

  const currentMinutes = Math.floor((timer / 1000 / 60) << 0);
  const currentSeconds = Math.floor((timer / 1000) % 60);
  const maxMinutes = Math.floor((track.duration_ms / 1000 / 60) << 0);
  const maxSeconds = Math.floor((track.duration_ms / 1000) % 60);

  return (
    <div>
      <input
        min={0}
        max={track.duration_ms}
        onChange={onProgressChange}
        type="range"
        value={timer}
      />

      <div className="flex justify-between items-center">
        <span>
          {currentMinutes}:{currentSeconds.toString().padStart(2, "0")}
        </span>
        <span>
          {maxMinutes}:{maxSeconds.toString().padStart(2, "0")}
        </span>
      </div>
    </div>
  );
}

export default Timer;
