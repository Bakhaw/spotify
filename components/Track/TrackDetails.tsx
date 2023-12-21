import { usePlayerContext } from "@/context/PlayerContext";

import ArtistLink from "@/components/ArtistLink";
import TrackLink from "@/components/TrackLink";
import Visualizer from "../Visualizer";

interface TrackDetailsProps {
  showVisualizer?: boolean; // default false
  track: SpotifyApi.TrackObjectFull;
}
const TrackDetails: React.FC<TrackDetailsProps> = ({
  showVisualizer = false,
  track,
}) => {
  const { currentPlaybackState } = usePlayerContext();
  const currentTrackId = currentPlaybackState?.item?.id;
  const isTrackActive = track.id === currentTrackId;

  return (
    <div className="flex flex-col max-w-[45vw] md:max-w-80">
      <div className="flex gap-2">
        {showVisualizer && isTrackActive && <Visualizer />}
        <TrackLink isActive={isTrackActive} track={track} />
      </div>

      <span className="font-light">
        <ArtistLink artists={track.artists} />
      </span>
    </div>
  );
};

export default TrackDetails;
