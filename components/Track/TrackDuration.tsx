import formatMs from "@/lib/formatMs";

import { useTrackContext } from "./context";

const TrackDuration = () => {
  const { track } = useTrackContext();

  return <span className="block">{formatMs(track.duration_ms, "clock")}</span>;
};

export default TrackDuration;
