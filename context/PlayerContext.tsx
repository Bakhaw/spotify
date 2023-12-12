"use client";

import React, {
  Dispatch,
  SetStateAction,
  createContext,
  useEffect,
  useState,
} from "react";
import { useSession } from "next-auth/react";

import useSpotify from "@/hooks/useSpotify";

interface PlayerContext {
  currentPlaybackState: SpotifyApi.CurrentPlaybackResponse | null;
  hydratePlaybackState: () => Promise<void>;
  setCurrentPlaybackState: Dispatch<
    SetStateAction<SpotifyApi.CurrentPlaybackResponse | null>
  >;
}

export const PlayerContext = createContext<PlayerContext | null>(null);

function PlayerContextProvider({ children }: { children: React.ReactNode }) {
  const spotifyApi = useSpotify();
  const { data: session } = useSession();

  const [currentPlaybackState, setCurrentPlaybackState] =
    useState<SpotifyApi.CurrentPlaybackResponse | null>(null);

  const hydratePlaybackState = async () => {
    const { body } = await spotifyApi.getMyCurrentPlaybackState();

    if (!body || !body.item) return;

    setCurrentPlaybackState(body);
  };

  useEffect(() => {
    if (spotifyApi.getAccessToken()) {
      hydratePlaybackState();
    }
  }, [spotifyApi, session]);

  return (
    <PlayerContext.Provider
      value={{
        currentPlaybackState,
        setCurrentPlaybackState,
        hydratePlaybackState,
      }}
    >
      {children}
    </PlayerContext.Provider>
  );
}

export default PlayerContextProvider;
