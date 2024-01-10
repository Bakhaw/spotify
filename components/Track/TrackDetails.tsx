import { usePlayerStore } from "@/store/usePlayerStore";

import { cn } from "@/lib/utils";

import AlbumLink from "@/components/AlbumLink";
import ArtistLink from "@/components/ArtistLink";
import Visualizer from "@/components/Visualizer";

import { useTrackContext } from "./context";

interface TrackDetailsProps {
  showVisualizer?: boolean; // default false
}
const TrackDetails: React.FC<TrackDetailsProps> = ({
  showVisualizer = false,
}) => {
  const { track } = useTrackContext();
  const currentPlaybackState = usePlayerStore((s) => s.currentPlaybackState);

  const currentTrackId = currentPlaybackState?.item?.id;
  const isTrackActive = track.id === currentTrackId;
  const isPlaying = currentPlaybackState?.is_playing;

  const isFullTrack = "album" in track;

  return (
    <div className="flex flex-col max-w-[45vw] md:max-w-80">
      <div className="flex items-baseline gap-2">
        {showVisualizer && isTrackActive && isPlaying && <Visualizer />}

        {isFullTrack ? (
          <AlbumLink isActive={isTrackActive} albumId={track.album.id}>
            {track.name}
          </AlbumLink>
        ) : (
          <h2
            className={cn(
              "block truncate text-left text-sm text-foreground",
              isTrackActive && "text-green-primary"
            )}
          >
            {track.name}
          </h2>
        )}
      </div>

      <span className="flex gap-1 items-center font-light">
        {track.explicit && (
          <svg
            viewBox="0 0 24 24"
            focusable="false"
            className="style-scope w-[16px] h-[16px] block fill-foreground"
          >
            <g>
              <path d="M3,3v18h18V3H3z M16,9h-6v2h6v2h-6v2h6v2H8V7h8V9z"></path>
            </g>
          </svg>
        )}

        {"artists" in track && <ArtistLink artists={track.artists} />}
      </span>
    </div>
  );
};

export default TrackDetails;
