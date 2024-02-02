import { PauseIcon, PlayIcon } from "lucide-react";

import { cn } from "@/lib/utils";

import { usePlayerStore } from "@/store/usePlayerStore";

import usePlaybackControls from "@/hooks/usePlaybackControls";

import Visualizer from "@/components/Visualizer";

import { useTrackContext } from "./context";

interface PlaybackControlsProps {
  trackNumber?: number;
}

const PlaybackControls: React.FC<PlaybackControlsProps> = ({ trackNumber }) => {
  const { contextUri, track } = useTrackContext();
  const currentPlaybackState = usePlayerStore((s) => s.currentPlaybackState);
  const { pauseSong, playSong } = usePlaybackControls();

  async function handlePlayClick() {
    try {
      await playSong(track, contextUri);
    } catch (error) {
      if (error === "NO_ACTIVE_DEVICE_FOUND") {
        console.log("NO_ACTIVE_DEVICE_FOUND");
        // todo show alert message to the user
      }
    }
  }

  const isPlaying = currentPlaybackState?.is_playing;
  const currentTrackId = currentPlaybackState?.item?.id;

  const isCurrentTrack = track.id === currentTrackId;
  const isCurrentTrackPlaying = track.id === currentTrackId && isPlaying;

  return (
    <div className="text-center h-full px-2 sm:px-4">
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
            onClick={handlePlayClick}
            role="button"
          />
        )}
      </div>

      {isCurrentTrackPlaying && (
        <div className="group-hover:hidden flex justify-center items-center h-5 w-5">
          <Visualizer />
        </div>
      )}

      {!isCurrentTrack && trackNumber && (
        <span className="block w-5 group-hover:hidden">{trackNumber}</span>
      )}
    </div>
  );
};

export default PlaybackControls;
