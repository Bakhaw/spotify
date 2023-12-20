import { usePlayerContext } from "@/context/PlayerContext";
import { useTimerContext } from "@/context/TimerContext";

import useSpotify from "@/hooks/useSpotify";

const usePlaybackControls = () => {
  const spotifyApi = useSpotify();
  const {
    setCurrentPlaybackState,
    currentPlaybackState,
    hydratePlaybackState,
  } = usePlayerContext();
  const { setProgressMs } = useTimerContext();

  const playSong = async (currentTrack: SpotifyApi.TrackObjectFull | null) => {
    if (!currentTrack) return;

    const currentTrackId = currentPlaybackState?.item?.id;

    if (currentTrack.id === currentTrackId) {
      spotifyApi.play();

      setCurrentPlaybackState((state) => {
        if (!state) return null;

        return {
          ...state,
          is_playing: true,
        };
      });
    } else {
      const { body: devices } = await spotifyApi.getMyDevices();

      spotifyApi.play({
        context_uri: currentTrack.album.uri,
        offset: { uri: currentTrack.uri },
        device_id:
          currentPlaybackState?.device.id ?? String(devices.devices[0].id),
      });

      setTimeout(async () => {
        await hydratePlaybackState();
        setProgressMs(0);
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
