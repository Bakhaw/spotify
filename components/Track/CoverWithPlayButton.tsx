import { PauseIcon, PlayIcon } from "lucide-react";

import { usePlayerContext } from "@/context/PlayerContext";

import usePlaybackControls, { PlayOptions } from "@/hooks/usePlaybackControls";

import Cover from "@/components/Cover";

interface CoverWithPlayButtonProps {
  order?: number | null;
  showPlayIcon: boolean;
  track: SpotifyApi.TrackObjectFull;
}

const CoverWithPlayButton: React.FC<CoverWithPlayButtonProps> = ({
  order,
  showPlayIcon,
  track,
}) => {
  const { currentPlaybackState } = usePlayerContext();
  const { pauseSong, playSong } = usePlaybackControls();

  const isPlaying = currentPlaybackState?.is_playing;
  const currentTrackId = currentPlaybackState?.item?.id;

  const playOptions: PlayOptions = {
    context_uri: track.album.uri,
    offset: { uri: track.uri },
  };

  return (
    <div className="h-[60px] w-[60px] mr-3 relative">
      <Cover alt="Cover" size="small" src={track.album.images[0].url} />

      {showPlayIcon && !order && (
        <div className="h-full w-full flex justify-center items-center top-0 absolute bg-black/90">
          {track.id === currentTrackId && isPlaying ? (
            <PauseIcon className="h-5 w-5 cursor-pointer" onClick={pauseSong} />
          ) : (
            <PlayIcon
              className="h-5 w-5 cursor-pointer"
              onClick={() => playSong(track.id, playOptions)}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default CoverWithPlayButton;
