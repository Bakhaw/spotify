import { PauseIcon, PlayIcon } from "lucide-react";

import { usePlayerContext } from "@/context/PlayerContext";
import { useTimerContext } from "@/context/TimerContext";

import useSpotify from "@/hooks/useSpotify";
import useTrack from "@/hooks/useTrack";

import Cover from "@/components/Cover";

interface CoverWithPlayButtonProps {
  order?: number | null;
  showPlayIcon: boolean;
  track: SpotifyApi.TrackObjectFull | SpotifyApi.TrackObjectSimplified;
}

const CoverWithPlayButton: React.FC<CoverWithPlayButtonProps> = ({
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

  if (!currentTrack || !isPlaying) return null;

  return (
    <div className="h-[60px] w-[60px] mr-3 relative">
      <Cover alt="Cover" size="small" src={currentTrack.album.images[0].url} />

      {showPlayIcon && !order && (
        <div className="h-full w-full flex justify-center items-center top-0 absolute bg-black/90">
          {currentTrack.id === currentTrackId && isPlaying ? (
            <PauseIcon className="h-5 w-5 cursor-pointer" onClick={pauseSong} />
          ) : (
            <PlayIcon className="h-5 w-5 cursor-pointer" onClick={playSong} />
          )}
        </div>
      )}
    </div>
  );
};

export default CoverWithPlayButton;
