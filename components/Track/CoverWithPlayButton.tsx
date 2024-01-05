import { IoPlay } from "react-icons/io5";
import { IoIosPause } from "react-icons/io";

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

      <div className="hidden h-full w-full group-hover:flex justify-center items-center top-0 absolute bg-black/60">
        {track.id === currentTrackId && isPlaying ? (
          <IoIosPause className="h-5 w-5 cursor-pointer" onClick={pauseSong} />
        ) : (
          <IoPlay
            className="h-5 w-5 cursor-pointer"
            onClick={() => playSong(track)}
          />
        )}
      </div>
    </div>
  );
};

export default CoverWithPlayButton;
