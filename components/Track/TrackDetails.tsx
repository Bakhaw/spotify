import { usePlayerStore } from "@/store/usePlayerStore";

import ArtistLink from "@/components/ArtistLink";
import TrackLink from "@/components/TrackLink";
import Visualizer from "@/components/Visualizer";

interface TrackDetailsProps {
  showVisualizer?: boolean; // default false
  track: SpotifyApi.TrackObjectFull;
}
const TrackDetails: React.FC<TrackDetailsProps> = ({
  showVisualizer = false,
  track,
}) => {
  const currentPlaybackState = usePlayerStore((s) => s.currentPlaybackState);

  const currentTrackId = currentPlaybackState?.item?.id;
  const isTrackActive = track.id === currentTrackId;
  const isPlaying = currentPlaybackState?.is_playing;

  return (
    <div className="flex flex-col max-w-[45vw] md:max-w-80">
      <div className="flex gap-2">
        {showVisualizer && isTrackActive && isPlaying && <Visualizer />}

        <TrackLink isActive={isTrackActive} track={track} />
      </div>

      <span className="flex gap-1 items-center font-light">
        {track.explicit && (
          <svg
            viewBox="0 0 24 24"
            preserveAspectRatio="xMidYMid meet"
            focusable="false"
            className="style-scope yt-icon w-[16px] h-[16px] block fill-[rgba(255,255,255,.7)]"
          >
            <g className="style-scope yt-icon">
              <path
                d="M3,3v18h18V3H3z M16,9h-6v2h6v2h-6v2h6v2H8V7h8V9z"
                className="style-scope yt-icon"
              ></path>
            </g>
          </svg>
        )}

        <ArtistLink artists={track.artists} />
      </span>
    </div>
  );
};

export default TrackDetails;
