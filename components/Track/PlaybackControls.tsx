import { PauseIcon, PlayIcon } from "lucide-react";
import { cn } from "@/lib/utils";

import { usePlayerStore } from "@/store/usePlayerStore";

import usePlaybackControls from "@/hooks/usePlaybackControls";

import Visualizer from "@/components/Visualizer";

interface PlaybackControlsProps {
  order?: number | null;
  track: SpotifyApi.TrackObjectFull;
}

const PlaybackControls: React.FC<PlaybackControlsProps> = ({
  order,
  track,
}) => {
  const currentPlaybackState = usePlayerStore((s) => s.currentPlaybackState);
  const { pauseSong, playSong } = usePlaybackControls();

  const isPlaying = currentPlaybackState?.is_playing;
  const currentTrackId = currentPlaybackState?.item?.id;

  if (!order) return null;

  const isCurrentTrack = track.id === currentTrackId;
  const isCurrentTrackPlaying = track.id === currentTrackId && isPlaying;

  return (
    <div className="text-center h-full px-4">
      <div
        className={cn(
          "group-hover:block transition-all duration-300",
          track.id === currentTrackId && !isPlaying ? "block" : "hidden"
        )}
      >
        {isCurrentTrackPlaying ? (
          <PauseIcon
            className="h-5 w-5 cursor-pointer"
            onClick={pauseSong}
            role="button"
          />
        ) : (
          <PlayIcon
            className="h-5 w-5 cursor-pointer"
            onClick={() => playSong(track)}
            role="button"
          />
        )}
      </div>

      {isCurrentTrackPlaying && (
        <div className="group-hover:hidden flex justify-center items-center h-5 w-5">
          <Visualizer />
        </div>
      )}

      {!isCurrentTrack && (
        <span className="block w-5 group-hover:hidden">{order}</span>
      )}
    </div>
  );
};

export default PlaybackControls;
