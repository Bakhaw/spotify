import { usePlayerContext } from "@/context/PlayerContext";

import useSpotify from "@/hooks/useSpotify";

export interface PlayOptions {
  context_uri?: string | undefined;
  uris?: readonly string[] | undefined;
  offset?: { position: number } | { uri: string } | undefined;
  position_ms?: number | undefined;
}

const usePlaybackControls = () => {
  const spotifyApi = useSpotify();
  const {
    setCurrentPlaybackState,
    currentPlaybackState,
    hydratePlaybackState,
  } = usePlayerContext();

  const playSong = async (trackId: string, playOptions: PlayOptions) => {
    if (!trackId) return;

    const currentTrackId = currentPlaybackState?.item?.id;

    // resume the paused track
    if (trackId === currentTrackId) {
      spotifyApi.play();

      setCurrentPlaybackState((state) => {
        if (!state) return null;

        return {
          ...state,
          is_playing: true,
        };
      });
    } else {
      // play a new track
      const { body: devices } = await spotifyApi.getMyDevices();

      spotifyApi.play({
        device_id:
          currentPlaybackState?.device.id ?? String(devices.devices[0].id),
        ...playOptions,
      });

      setTimeout(async () => {
        await hydratePlaybackState();
      }, 1000);
    }
  };

  const pauseSong = () => {
    setCurrentPlaybackState((state) => {
      if (!state) return null;

      return {
        ...state,
        is_playing: false,
      };
    });

    spotifyApi.pause();
  };

  return { playSong, pauseSong };
};

export default usePlaybackControls;
