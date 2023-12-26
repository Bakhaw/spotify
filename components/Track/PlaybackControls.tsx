import { PauseIcon, PlayIcon } from "lucide-react";

import { usePlayerContext } from "@/context/PlayerContext";

import usePlaybackControls, { PlayOptions } from "@/hooks/usePlaybackControls";

import Visualizer from "@/components/Visualizer";

interface PlaybackControlsProps {
  order?: number | null;
  showPlayIcon: boolean;
  track: SpotifyApi.TrackObjectFull;
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

  if (!order) return null;

  const playOptions: PlayOptions = {
    context_uri: track.album.uri,
    offset: { uri: track.uri },
  };

  return (
    <div className="text-center h-full px-4">
      {showPlayIcon ? (
        <>
          {track.id === currentTrackId && isPlaying ? (
            <PauseIcon
              className="h-5 w-5 cursor-pointer"
              onClick={pauseSong}
              role="button"
            />
          ) : (
            <PlayIcon
              className="h-5 w-5 cursor-pointer"
              onClick={() => playSong(track.id, playOptions)}
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
