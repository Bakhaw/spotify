import { useSearchParams } from "next/navigation";

import { SearchProvider, Track } from "@/types";

import { usePlayerStore } from "@/store/usePlayerStore";
import { useTimerStore } from "@/store/useTimerStore";

import useSpotify from "@/hooks/useSpotify";

const usePlaybackControls = () => {
  const spotifyApi = useSpotify();
  const { currentPlaybackState, setCurrentPlaybackState } = usePlayerStore();
  const searchParams = useSearchParams();
  const provider = searchParams.get("provider") as SearchProvider;

  const setProgressMs = useTimerStore((s) => s.setProgressMs);

  const playSong = async (track: Track, contextUri?: string) => {
    if (!track) return;

    if (provider === "youtube") {
      setCurrentPlaybackState({
        device: null,
        is_playing: true,
        item: track,
        progress_ms: 0,
      });

      // spotifyApi.pause();

      console.log("youtube provider function");

      return;
    }

    const currentTrackId = currentPlaybackState?.item?.id;

    // resume the paused track
    if (currentPlaybackState && track.id === currentTrackId) {
      spotifyApi.play();

      setCurrentPlaybackState({
        ...currentPlaybackState,
        is_playing: true,
      });
    } else {
      // play a new track
      const { body: devices } = await spotifyApi.getMyDevices();

      setCurrentPlaybackState({
        device: devices.devices[0],
        is_playing: true,
        item: track,
        progress_ms: 0,
      });

      setProgressMs(0);

      if (devices.devices.length === 0) {
        throw new Error("No active device found");
      }

      console.log("reached here");

      spotifyApi.play({
        device_id:
          currentPlaybackState?.device?.id ?? String(devices.devices[0].id),
        context_uri: "album" in track ? track.album.uri : contextUri,
        offset: { uri: track.uri },
      });
    }
  };

  const pauseSong = () => {
    if (!currentPlaybackState) return;

    if (provider === "youtube") {
      setCurrentPlaybackState({
        ...currentPlaybackState,
        is_playing: false,
      });
    } else {
      setCurrentPlaybackState({
        ...currentPlaybackState,
        is_playing: false,
      });
      spotifyApi.pause();
    }
  };

  return { playSong, pauseSong };
};

export default usePlaybackControls;
