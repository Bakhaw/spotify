import { PauseIcon, PlayIcon } from "lucide-react";

import { usePlayerContext } from "@/context/PlayerContext";

import usePlaybackControls from "@/hooks/usePlaybackControls";
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
  const { currentPlaybackState } = usePlayerContext();
  const { pauseSong, playSong } = usePlaybackControls();

  const isPlaying = currentPlaybackState?.is_playing;
  const currentTrackId = currentPlaybackState?.item?.id;
  const currentTrack = useTrack(track.id);

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
              onClick={() => playSong(currentTrack)}
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
