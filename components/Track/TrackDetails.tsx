import { usePlayerContext } from "@/context/PlayerContext";

import ArtistLink from "@/components/ArtistLink";
import TrackLink from "@/components/TrackLink";

interface TrackDetailsProps {
  track: SpotifyApi.TrackObjectFull;
}
const TrackDetails: React.FC<TrackDetailsProps> = ({ track }) => {
  const { currentPlaybackState } = usePlayerContext();
  const currentTrackId = currentPlaybackState?.item?.id;

  return (
    <div className="flex flex-col max-w-[45vw] md:max-w-80">
      <TrackLink isActive={track.id === currentTrackId} track={track} />

      <span className="font-light">
        <ArtistLink artists={track.artists} />
      </span>
    </div>
  );
};

export default TrackDetails;
