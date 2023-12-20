import { PauseIcon, PlayIcon } from "lucide-react";

import { usePlayerContext } from "@/context/PlayerContext";
import { useTimerContext } from "@/context/TimerContext";

import useSpotify from "@/hooks/useSpotify";
import useTrack from "@/hooks/useTrack";

import Visualizer from "@/components/Visualizer";

interface PlaybackControlsProps {
  order?: number | null;
  showPlayIcon: boolean;
  track: SpotifyApi.TrackObjectFull | SpotifyApi.TrackObjectSimplified;
}

const PlaybackControls: React.FC<PlaybackControlsProps> = ({
  order,
  showPlayIcon,
  track,
}) => {
  const spotifyApi = useSpotify();

  const {
    setCurrentPlaybackState,
    currentPlaybackState,
    hydratePlaybackState,
  } = usePlayerContext();
  const { setProgressMs } = useTimerContext();

  const isPlaying = currentPlaybackState?.is_playing;
  const currentTrackId = currentPlaybackState?.item?.id;
  const currentTrack = useTrack(track.id);

  function pauseSong() {
    setCurrentPlaybackState((state) => {
      if (!state) return null;

      return {
        ...state,
        is_playing: false,
      };
    });

    spotifyApi.pause();
  }

  async function playSong() {
    if (!currentTrack) return;

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
  }

  if (!order || !currentTrack) return null;

  return (
    <div className="text-center h-full px-4">
      {showPlayIcon ? (
        <>
          {currentTrack.id === currentTrackId && isPlaying ? (
            <PauseIcon
              className="h-5 w-5 cursor-pointer"
              onClick={pauseSong}
              role="button"
            />
          ) : (
            <PlayIcon
              className="h-5 w-5 cursor-pointer"
              onClick={playSong}
              role="button"
            />
          )}
        </>
      ) : currentTrackId === track.id && isPlaying ? (
        <div className="flex justify-center items-center h-5 w-5">
          <Visualizer />
        </div>
      ) : (
        <span className="block w-5">{order}</span>
      )}
    </div>
  );
};

export default PlaybackControls;
