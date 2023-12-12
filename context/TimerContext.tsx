"use client";

import { createContext, useContext, useEffect, useState } from "react";

import { PlayerContext } from "@/context/PlayerContext";
import useSpotify from "@/hooks/useSpotify";
import { useSession } from "next-auth/react";

interface TimerContext {
  progressMs: number;
  setProgressMs: React.Dispatch<React.SetStateAction<number>>;
}

export const TimerContext = createContext<TimerContext>({
  progressMs: 0,
  setProgressMs: () => {},
});

function TimerContextProvider({ children }: { children: React.ReactNode }) {
  const spotifyApi = useSpotify();
  const { data: session } = useSession();
  const playerContext = useContext(PlayerContext);

  const [progressMs, setProgressMs] = useState<number>(
    playerContext?.currentPlaybackState?.progress_ms ?? 0
  );

  useEffect(() => {
    const initProgressMs = async () => {
      const { body } = await spotifyApi.getMyCurrentPlaybackState();

      if (!body.progress_ms) return;

      setProgressMs(body.progress_ms);
    };

    if (spotifyApi.getAccessToken()) {
      initProgressMs();
    }
  }, [spotifyApi, session]);

  useEffect(() => {
    if (!playerContext || !playerContext.currentPlaybackState?.is_playing)
      return;

    const intervalId = setInterval(() => {
      if (!playerContext.currentPlaybackState?.item) return;

      if (progressMs > playerContext.currentPlaybackState.item.duration_ms) {
        playerContext.hydratePlaybackState();
        setProgressMs(0);
      } else {
        setProgressMs(progressMs + 1000);
      }
    }, 1000);

    return () => clearInterval(intervalId);
  }, [playerContext, progressMs]);

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
