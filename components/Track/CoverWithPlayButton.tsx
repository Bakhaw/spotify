import { PauseIcon, PlayIcon } from "lucide-react";

import { usePlayerContext } from "@/context/PlayerContext";

import usePlaybackControls from "@/hooks/usePlaybackControls";
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
  const { currentPlaybackState } = usePlayerContext();

  const isPlaying = currentPlaybackState?.is_playing;
  const currentTrackId = currentPlaybackState?.item?.id;
  const currentTrack = useTrack(track.id);

  const { pauseSong, playSong } = usePlaybackControls();

  if (!currentTrack || !isPlaying) return null;

  return (
    <div className="h-[60px] w-[60px] mr-3 relative">
      <Cover alt="Cover" size="small" src={currentTrack.album.images[0].url} />

      {showPlayIcon && !order && (
        <div className="h-full w-full flex justify-center items-center top-0 absolute bg-black/90">
          {currentTrack.id === currentTrackId && isPlaying ? (
            <PauseIcon className="h-5 w-5 cursor-pointer" onClick={pauseSong} />
          ) : (
            <PlayIcon
              className="h-5 w-5 cursor-pointer"
              onClick={() => playSong(currentTrack)}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default CoverWithPlayButton;
