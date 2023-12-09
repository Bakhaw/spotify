"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRecoilState } from "recoil";

import { currentTrackIdState, isPlayingState } from "@/atoms/trackAtom";
import useSpotify from "@/hooks/useSpotify";
import useTrack from "@/hooks/useTrack";

function useTimer() {
  const spotifyApi = useSpotify();
  const { data: session } = useSession();

  const [currentTrackId, setCurrentTrackId] =
    useRecoilState(currentTrackIdState);
  const [_isPlaying, setIsPlaying] = useRecoilState(isPlayingState);
  const track = useTrack(currentTrackId);

  const [timer, setTimer] = useState<number | null>(track?.duration_ms ?? null);

  const hydratePlaybackState = async () => {
    const { body: currentPlaybackState } =
      await spotifyApi.getMyCurrentPlaybackState();

    if (!currentPlaybackState) return;

    setCurrentTrackId(String(currentPlaybackState?.item?.id));
    setTimer(Number(currentPlaybackState?.progress_ms));
    setIsPlaying(currentPlaybackState?.is_playing);

    return currentPlaybackState;
  };

  useEffect(() => {
    if (spotifyApi.getAccessToken()) {
      hydratePlaybackState();
    }
  }, [spotifyApi, session]);

  useEffect(() => {
    if (!track) return;

    const intervalId = setInterval(() => {
      setTimer((state) => {
        if (state && state > track.duration_ms - 1000) {
          hydratePlaybackState();
          return state;
        } else {
          return state ? state + 1000 : 0;
        }
      });
    }, 1000);

    return () => clearInterval(intervalId);
  }, [track]);

  return [timer, setTimer] as const;
}

export default useTimer;
