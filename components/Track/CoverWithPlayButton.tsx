import { PauseIcon, PlayIcon } from "lucide-react";

import { usePlayerStore } from "@/store/usePlayerStore";

import usePlaybackControls from "@/hooks/usePlaybackControls";

import Cover from "@/components/Cover";

interface CoverWithPlayButtonProps {
  track: SpotifyApi.TrackObjectFull;
}

const CoverWithPlayButton: React.FC<CoverWithPlayButtonProps> = ({ track }) => {
  const currentPlaybackState = usePlayerStore((s) => s.currentPlaybackState);
  const { pauseSong, playSong } = usePlaybackControls();

  const isPlaying = currentPlaybackState?.is_playing;
  const currentTrackId = currentPlaybackState?.item?.id;

  return (
    <div className="h-[60px] w-[60px] mr-3 relative">
      <Cover alt="Cover" size="small" src={track.album.images[0].url} />

      <div className="hidden h-full w-full group-hover:flex justify-center items-center top-0 absolute bg-black/90">
        {track.id === currentTrackId && isPlaying ? (
          <PauseIcon className="h-5 w-5 cursor-pointer" onClick={pauseSong} />
        ) : (
          <PlayIcon
            className="h-5 w-5 cursor-pointer"
            onClick={() => playSong(track)}
          />
        )}
      </div>
    </div>
  );
};

export default CoverWithPlayButton;
