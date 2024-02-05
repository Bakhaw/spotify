import { useSearchParams } from "next/navigation";

import { SearchProvider, Track } from "@/types";

import { usePlayerStore } from "@/store/usePlayerStore";
import { useTimerStore } from "@/store/useTimerStore";
import { useYTPlayerStore } from "@/store/useYTPlayerStore";

import useSpotify from "@/hooks/useSpotify";

const usePlaybackControls = () => {
  const spotifyApi = useSpotify();
  const searchParams = useSearchParams();
  const provider = searchParams.get("provider") as SearchProvider;

  const { currentPlaybackState, setCurrentPlaybackState } = usePlayerStore();
  const setProgressMs = useTimerStore((s) => s.setProgressMs);
  const player = useYTPlayerStore((s) => s.player);

  const resumeSong = () => {
    if (!currentPlaybackState) return;

    if (provider === "youtube") {
      player?.playVideo();
    } else {
      setCurrentPlaybackState({
        ...currentPlaybackState,
        is_playing: true,
      });

      spotifyApi.play();
    }
  };

  const playSong = async (track: Track, contextUri?: string) => {
    const isReplayingSameTrack =
      track.id === currentPlaybackState?.item.id &&
      currentPlaybackState?.is_playing; // prevent from <Restriction violated UNKNOWN> spotify error

    if (!track || isReplayingSameTrack) return;

    const { body: devices } = await spotifyApi.getMyDevices();

    const currentTrackId = currentPlaybackState?.item?.id;
    if (track.id === currentTrackId) {
      resumeSong();

      return;
    }

    if (provider === "youtube") {
      setCurrentPlaybackState({
        device: null,
        is_playing: true,
        item: track,
        progress_ms: 0,
      });

      if (devices.devices[0].is_active) {
        spotifyApi.pause();
      }

      return;
    } else {
      // play a new track
      setCurrentPlaybackState({
        device: devices.devices[0],
        is_playing: true,
        item: track,
        progress_ms: 0,
      });

      setProgressMs(0);

      spotifyApi.play({
        device_id:
          currentPlaybackState?.device?.id ?? String(devices.devices[0].id),
        context_uri: contextUri,
        offset: { uri: track.uri },
      });
    }
  };

  const pauseSong = () => {
    if (!currentPlaybackState) return;

    if (provider === "youtube") {
      if (!player) return;

      setCurrentPlaybackState({
        ...currentPlaybackState,
        is_playing: false,
      });

      player.pauseVideo();
    } else {
      setCurrentPlaybackState({
        ...currentPlaybackState,
        is_playing: false,
      });

      spotifyApi.pause();
    }
  };

  return { playSong, pauseSong, resumeSong };
};

export default usePlaybackControls;
