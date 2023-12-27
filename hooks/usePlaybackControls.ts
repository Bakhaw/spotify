import { usePlayerContext } from "@/context/PlayerContext";

import useSpotify from "@/hooks/useSpotify";

const usePlaybackControls = () => {
  const spotifyApi = useSpotify();
  const { setCurrentPlaybackState, currentPlaybackState } = usePlayerContext();

  const playSong = async (track: SpotifyApi.TrackObjectFull) => {
    if (!track) return;

    const currentTrackId = currentPlaybackState?.item?.id;

    // resume the paused track
    if (track.id === currentTrackId) {
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
      setCurrentPlaybackState((state) => {
        if (!state) return null;

        return {
          ...state,
          is_playing: true,
          item: track,
          progress_ms: 0,
        };
      });

      const { body: devices } = await spotifyApi.getMyDevices();

      spotifyApi.play({
        device_id:
          currentPlaybackState?.device.id ?? String(devices.devices[0].id),
        context_uri: track.album.uri,
        offset: { uri: track.uri },
      });
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
