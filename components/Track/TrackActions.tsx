import formatMs from "@/lib/formatMs";

import LikeButton from "@/components/LikeButton";

interface TrackActionsProps {
  track: SpotifyApi.TrackObjectFull;
}

// TODO move formatMs from here => not an action
const TrackActions: React.FC<TrackActionsProps> = ({ track }) => {
  return (
    <div className="flex justify-center items-center gap-2 px-4">
      {/* <LikeButton track={track} /> */}

      <span className="hidden md:block">
        {formatMs(track.duration_ms, "clock")}
      </span>
    </div>
  );
};

export default TrackActions;
