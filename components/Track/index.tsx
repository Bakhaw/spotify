import Link from "next/link";

import usePlaybackControls from "@/hooks/usePlaybackControls";
import useTrack from "@/hooks/useTrack";

import Cover from "@/components/Cover";
import { Button } from "@/components/ui/button";

import CoverWithPlayButton from "./CoverWithPlayButton";
import PlaybackControls from "./PlaybackControls";
import TrackActions from "./TrackActions";
import TrackDetails from "./TrackDetails";

export interface TrackProps {
  order?: number | null;
  showAlbumName?: boolean; // default true
  showCover?: boolean; // default false
  showVisualizer?: boolean; // default false
  track: SpotifyApi.TrackObjectFull | SpotifyApi.TrackObjectSimplified;
}

const Track: React.FC<TrackProps> = ({
  order,
  showAlbumName = true,
  showCover = false,
  showVisualizer = false,
  track,
}) => {
  const { playSong } = usePlaybackControls();
  const currentTrack = useTrack(track.id);

  if (!currentTrack) return null;

  return (
    <Button
      className="group transition-all duration-300 flex justify-between items-center p-0 min-h-[56px] h-full w-full cursor-default bg-transparent hover:bg-[#66677070] hover:text-white"
      onDoubleClick={() => playSong(currentTrack)}
    >
      <div className="flex justify-between items-center w-full">
        <div className="flex justify-start items-center w-full">
          <PlaybackControls order={order} track={currentTrack} />

          {showCover && (
            <>
              {order ? (
                // <div className="h-[60px] w-[60px] border mr-3 relative">
                <Cover
                  alt="Cover"
                  size="small"
                  src={currentTrack.album.images[0].url}
                />
              ) : (
                // </div>
                <CoverWithPlayButton track={currentTrack} />
              )}
            </>
          )}

          <TrackDetails showVisualizer={showVisualizer} track={currentTrack} />
        </div>

        {showAlbumName && (
          <span className="hidden lg:block text-left w-full hover:underline">
            <Link href={`/album/${currentTrack.album.id}`}>
              {currentTrack.album.name}
            </Link>
          </span>
        )}

        <TrackActions track={currentTrack} />
      </div>
    </Button>
  );
};

export default Track;
