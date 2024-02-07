import { useSearchParams } from "next/navigation";

import { SearchProvider, Track, TrackOrigin } from "@/types";

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

  const currentTrackId = currentPlaybackState?.item?.id;

  const resumeSong = () => {
    if (!currentPlaybackState) return;

    setCurrentPlaybackState({
      ...currentPlaybackState,
      is_playing: true,
    });

    if (provider === "youtube") {
      player?.playVideo();
    } else {
      spotifyApi.play();
    }
  };

  const playSong = async (track: Track, contextUri?: string) => {
    const isReplayingSameTrack =
      track.id === currentTrackId && currentPlaybackState?.is_playing; // prevent from <Restriction violated UNKNOWN> spotify error

    if (!track || isReplayingSameTrack) return;

    const { body: devices } = await spotifyApi.getMyDevices();
    const device = devices.devices[0];

    if (track.id === currentTrackId) {
      resumeSong();

      return;
    }

    if (provider === "youtube") {
      setCurrentPlaybackState({
        device: null,
        is_playing: true,
        item: {
          ...track,
          origin: TrackOrigin.YOUTUBE,
        },
        progress_ms: 0,
      });

      setProgressMs(0);

      if (device.is_active) {
        spotifyApi.pause();
      }

      return;
    } else {
      if (devices.devices.length === 0) {
        throw new Error("No active device found");
      }

      setCurrentPlaybackState({
        device,
        is_playing: true,
        item: {
          ...track,
          origin: TrackOrigin.YOUTUBE,
        },
        progress_ms: 0,
      });

      setProgressMs(0);

      spotifyApi.play({
        device_id: currentPlaybackState?.device?.id ?? String(device.id),
        context_uri: "album" in track ? track.album.uri : contextUri,
        offset: { uri: track.uri },
      });
    }
  };

  const pauseSong = () => {
    if (!currentPlaybackState) return;

    setCurrentPlaybackState({
      ...currentPlaybackState,
      is_playing: false,
    });

    if (provider === "youtube") {
      player?.pauseVideo();
    } else {
      spotifyApi.pause();
    }
  };

  return { playSong, pauseSong, resumeSong };
};

export default usePlaybackControls;
