import formatMs from "@/lib/formatMs";

import LikeButton from "@/components/LikeButton";

interface TrackActionsProps {
  track: SpotifyApi.TrackObjectFull;
}

const TrackActions: React.FC<TrackActionsProps> = ({ track }) => {
  return (
    <div className="flex justify-center items-center pr-5">
      <LikeButton track={track} />

      <div className="hidden md:block">
        {formatMs(track.duration_ms, "clock")}
      </div>
    </div>
  );
};

export default TrackActions;
