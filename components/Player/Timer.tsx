"use client";

import { useEffect } from "react";
import { useSession } from "next-auth/react";
import { debounce } from "lodash";

import { usePlayerStore } from "@/store/usePlayerStore";
import { useTimerStore } from "@/store/useTimerStore";

import useSpotify from "@/hooks/useSpotify";

import { Slider } from "@/components/ui/slider";

function Timer() {
  const spotifyApi = useSpotify();
  const { data: session } = useSession();

  const { currentPlaybackState, fetchNextTrack, setCurrentPlaybackState } =
    usePlayerStore();
  const { progressMs, refetch, setProgressMs, setRefetch } = useTimerStore();

  // initialize the timer using getMyCurrentPlaybackState()
  useEffect(() => {
    if (!spotifyApi.getAccessToken()) return;

    const initProgressMs = async () => {
      const { body } = await spotifyApi.getMyCurrentPlaybackState();

      if (!body || !body.progress_ms) return;

      setProgressMs(body.progress_ms);
    };

    initProgressMs();
  }, [spotifyApi, session, setProgressMs]);

  // used to increment progressMs value every second AND to update currentPlaybackState with the nextTrack
  useEffect(() => {
    if (!currentPlaybackState?.is_playing) return;

    const intervalId = setInterval(() => {
      if (!currentPlaybackState?.item) return;

      if (progressMs > currentPlaybackState.item.duration_ms - 2000) {
        setRefetch(true);
        setProgressMs(0);
      } else {
        setProgressMs(progressMs + 1000);
      }
    }, 1000);

    return () => clearInterval(intervalId);
  }, [
    currentPlaybackState,
    progressMs,
    setCurrentPlaybackState,
    setProgressMs,
    setRefetch,
  ]);

  // used to catch if we approach the end of a song, the "refetch" value is true whenever it's the case (updates in setInterval)
  useEffect(() => {
    if (refetch) {
      fetchNextTrack();
      setRefetch(false); // reinitialize refetch
    }
  }, [refetch, fetchNextTrack, setRefetch]);

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
