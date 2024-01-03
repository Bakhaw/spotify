"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { debounce } from "lodash";

import { usePlayerStore } from "@/store/usePlayerStore";
import { useTimerStore } from "@/store/useTimerStore";

import useSpotify from "@/hooks/useSpotify";

import { Slider } from "@/components/ui/slider";

function Timer() {
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

  // used to catch if we approach the end of a song, the "refetch" value is true whenever it's the case (updates in setInterval)
  useEffect(() => {
    if (refetch) {
      const handleRefetch = async () => {
        const queue = await fetchQueue();

        if (!queue || !currentPlaybackState) return;

        // sometimes we have desynchro due to fetch duration, and the next track already started inside Spotify
        // so we check if the Spotify current playing track
        // if different from our playbackState => it means this is the nextTrack and we'll use it
        if (queue.currentlyPlaying.id !== currentPlaybackState.item.id) {
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
          // this case is fired most of the time
          const nextTrack = queue.queue[0];
          setNextTrack(nextTrack);
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
