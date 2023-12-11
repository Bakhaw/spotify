"use client";

import React, {
  Dispatch,
  SetStateAction,
  createContext,
  useEffect,
  useState,
} from "react";
import { useSession } from "next-auth/react";
import { useRecoilState } from "recoil";

import { currentTrackIdState, isPlayingState } from "@/atoms/trackAtom";
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

  const [_, setCurrentTrackId] = useRecoilState(currentTrackIdState);
  const [__, setIsPlaying] = useRecoilState(isPlayingState);

  const [currentPlaybackState, setCurrentPlaybackState] =
    useState<SpotifyApi.CurrentPlaybackResponse | null>(null);

  const hydratePlaybackState = async () => {
    const { body } = await spotifyApi.getMyCurrentPlaybackState();

    if (!body || !body.item) return;

    setCurrentTrackId(String(body.item.id));
    setIsPlaying(body.is_playing);

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
