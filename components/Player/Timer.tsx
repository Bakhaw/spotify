"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { debounce } from "lodash";

import { usePlayerStore } from "@/store/usePlayerStore";
import { useTimerStore } from "@/store/useTimerStore";

import useSpotify from "@/hooks/useSpotify";

import { cn } from "@/lib/utils";

import { Slider } from "@/components/ui/slider";

interface TimerProps {
  className?: string;
}

const Timer: React.FC<TimerProps> = ({ className }) => {
  const spotifyApi = useSpotify();
  const { data: session } = useSession();

  const { currentPlaybackState, fetchQueue, setCurrentPlaybackState } =
    usePlayerStore();
  const { progressMs, refetch, setProgressMs, setRefetch } = useTimerStore();

  const [nextTrack, setNextTrack] = useState<SpotifyApi.TrackObjectFull | null>(
    null
  );

  useEffect(() => {
    if (!spotifyApi.getAccessToken()) return;

    const initProgressMs = async () => {
      const { body } = await spotifyApi.getMyCurrentPlaybackState();

      if (!body || !body.progress_ms) return;

      setProgressMs(body.progress_ms);
    };

    initProgressMs();
  }, [spotifyApi, session, setProgressMs]);

  // [Progress MS -> Next Track]
  // used to increment progressMs value every second AND to handle nextTrack
  useEffect(() => {
    if (!currentPlaybackState?.is_playing) return;

    const intervalId = setInterval(() => {
      if (progressMs === null || !currentPlaybackState?.item) return;

      if (nextTrack && progressMs > currentPlaybackState.item.duration_ms) {
        setCurrentPlaybackState({
          ...currentPlaybackState,
          is_playing: true,
          item: nextTrack,
          progress_ms: 0,
        });

        setProgressMs(0);

        setRefetch(false);
      } else if (progressMs > currentPlaybackState.item.duration_ms - 5000) {
        // fetch next track 5 seconds before the current playing track ends
        setRefetch(true);
        setProgressMs(progressMs + 1000);
      } else {
        setProgressMs(progressMs + 1000);
      }
    }, 1000);

    return () => clearInterval(intervalId);
  }, [
    currentPlaybackState,
    nextTrack,
    progressMs,
    setCurrentPlaybackState,
    setProgressMs,
    setRefetch,
  ]);

  // [Next Track]
  // used to catch if we approach the end of a song, the "refetch" value is true whenever it's the case (updates in setInterval)
  useEffect(() => {
    if (refetch) {
      const handleRefetch = async () => {
        try {
          const queue = await fetchQueue();

          if (!queue || !currentPlaybackState) return;

          const { currentlyPlaying } = queue;
          const { item: currentPlaybackItem } = currentPlaybackState;

          if (currentlyPlaying.id !== currentPlaybackItem.id) {
            // Desynchronization check due to fetch duration.
            // If the Spotify currentPlayingTrack is different from our playbackState,
            // it means the "currentlyPlaying" response from Spotify is the next track.
            // Otherwise, the next track stored in "currentlyPlaying" will be skipped.
            const { body } = await spotifyApi.getMyCurrentPlaybackState();

            if (!body.item) return;

            setCurrentPlaybackState({
              device: body.device,
              item: body.item,
              is_playing: body.is_playing,
              progress_ms: body.progress_ms,
            });

            setProgressMs(body.progress_ms);
            setRefetch(false);
          } else {
            // Default behavior when next track is not detected.
            // This case is fired most of the time.
            const nextTrack = queue.queue[0];
            setNextTrack(nextTrack);
          }
        } catch (error) {
          console.error("Error handling refetch:", error);
        }
      };

      handleRefetch();
    }
  }, [
    refetch,
    currentPlaybackState,
    spotifyApi,
    fetchQueue,
    setCurrentPlaybackState,
    setProgressMs,
    setRefetch,
  ]);

  function onProgressChange(value: number[]) {
    const newProgressMs = value[0];

    if (!newProgressMs || newProgressMs === progressMs) return;

    setProgressMs(newProgressMs);
    spotifyApi.seek(newProgressMs);
  }

  const debounceOnProgressChange = debounce((value: number[]) => {
    onProgressChange(value);
  }, 300);

  if (progressMs === null || !currentPlaybackState?.item) return null;

  const currentMinutes = Math.floor((progressMs / 1000 / 60) << 0);
  const currentSeconds = Math.floor((progressMs / 1000) % 60);
  const maxMinutes = Math.floor(
    (currentPlaybackState.item.duration_ms / 1000 / 60) << 0
  );
  const maxSeconds = Math.floor(
    (currentPlaybackState.item.duration_ms / 1000) % 60
  );

  return (
    <div
      className={cn("flex justify-around w-[300px] lg:w-full gap-2", className)}
    >
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
};

export default Timer;
