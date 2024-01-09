import { usePlayerStore } from "@/store/usePlayerStore";

import ArtistLink from "@/components/ArtistLink";
import TrackLink from "@/components/TrackLink";
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

  return (
    <div className="flex flex-col max-w-[45vw] md:max-w-80">
      <div className="flex items-baseline gap-2">
        {showVisualizer && isTrackActive && isPlaying && <Visualizer />}

        <TrackLink isActive={isTrackActive} track={track} />
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

        <ArtistLink artists={track.artists} />
      </span>
    </div>
  );
};

export default TrackDetails;
