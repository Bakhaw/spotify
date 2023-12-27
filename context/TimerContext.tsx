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
  const { currentPlaybackState, setCurrentPlaybackState } = usePlayerContext();

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
        setProgressMs(0);
      } else {
        setProgressMs(progressMs + 1000);
      }
    }, 1000);

    return () => clearInterval(intervalId);
  }, [currentPlaybackState, progressMs]);

  // used to reset the progressMs when we play a new track
  useEffect(() => {
    if (currentPlaybackState?.progress_ms === 0) {
      setProgressMs(0);

      setCurrentPlaybackState((state) => {
        if (!state) return null;

        return {
          ...state,
          progress_ms: 1,
        };
      });
    }
  }, [currentPlaybackState?.progress_ms, setCurrentPlaybackState]);

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
