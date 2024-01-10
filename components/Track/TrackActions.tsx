import LikeButton from "@/components/LikeButton";

import { useTrackContext } from "./context";

const TrackActions = () => {
  const { track } = useTrackContext();

  return <LikeButton trackId={track.id} />;
};

export default TrackActions;
