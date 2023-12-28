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

      <span className="font-light">
        <ArtistLink artists={track.artists} />
      </span>
    </div>
  );
};

export default TrackDetails;
