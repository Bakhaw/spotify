"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { useSession } from "next-auth/react";

import { usePlayerContext } from "@/context/PlayerContext";

import useSpotify from "@/hooks/useSpotify";

interface TimerContext {
  progressMs: number;
  setProgressMs: React.Dispatch<React.SetStateAction<number>>;
}

export const TimerContext = createContext<TimerContext | null>(null);

function TimerContextProvider({ children }: { children: React.ReactNode }) {
  const spotifyApi = useSpotify();
  const { data: session } = useSession();
  const { currentPlaybackState, hydratePlaybackState } = usePlayerContext();

  const [progressMs, setProgressMs] = useState<number>(
    currentPlaybackState?.progress_ms ?? 0
  );

  // initialize the timer using getMyCurrentPlaybackState()
  useEffect(() => {
    if (!spotifyApi.getAccessToken()) return;

    const initProgressMs = async () => {
      const { body } = await spotifyApi.getMyCurrentPlaybackState();

      if (!body || !body.progress_ms) return;

      setProgressMs(body.progress_ms);
    };

    initProgressMs();
  }, [spotifyApi, session]);

  // used to increment progressMs value every second
  useEffect(() => {
    if (!currentPlaybackState?.is_playing) return;

    const intervalId = setInterval(() => {
      if (!currentPlaybackState?.item) return;

      if (progressMs > currentPlaybackState.item.duration_ms) {
        hydratePlaybackState();
        setProgressMs(0);
      } else {
        setProgressMs(progressMs + 1000);
      }
    }, 1000);

    return () => clearInterval(intervalId);
  }, [progressMs]);

  // used to reset the progressMs when we play a new track
  useEffect(() => {
    setProgressMs(0);
  }, [currentPlaybackState?.item?.id]);

  return (
    <TimerContext.Provider
      value={{
        progressMs,
        setProgressMs,
      }}
    >
      {children}
    </TimerContext.Provider>
  );
}

export default TimerContextProvider;

export function useTimerContext() {
  const timerContext = useContext(TimerContext);

  if (!timerContext) {
    throw new Error("TimerContext must be used within a TimerContextProvider");
  }

  return timerContext;
}
