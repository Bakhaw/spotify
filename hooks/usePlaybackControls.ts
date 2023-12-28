import { usePlayerStore } from "@/store/usePlayerStore";
import { useTimerStore } from "@/store/useTimerStore";

import useSpotify from "@/hooks/useSpotify";

const usePlaybackControls = () => {
  const spotifyApi = useSpotify();
  const { currentPlaybackState, setCurrentPlaybackState } = usePlayerStore();
  const setProgressMs = useTimerStore((s) => s.setProgressMs);

  const playSong = async (track: SpotifyApi.TrackObjectFull) => {
    if (!track || !currentPlaybackState) return;

    const currentTrackId = currentPlaybackState.item?.id;

    // resume the paused track
    if (track.id === currentTrackId) {
      spotifyApi.play();

      setCurrentPlaybackState({
        ...currentPlaybackState,
        is_playing: true,
      });
    } else {
      // play a new track
      setCurrentPlaybackState({
        ...currentPlaybackState,
        is_playing: true,
        item: track,
        progress_ms: 0,
      });

      setProgressMs(0);

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
    if (!currentPlaybackState) return;

    setCurrentPlaybackState({
      ...currentPlaybackState,
      is_playing: false,
    });

    spotifyApi.pause();
  };

  return { playSong, pauseSong };
};

export default usePlaybackControls;
