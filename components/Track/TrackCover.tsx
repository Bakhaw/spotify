import Cover from "@/components/Cover";

import { useTrackContext } from "./context";

function TrackCover() {
  const { track } = useTrackContext();

  return <Cover alt="Cover" size="small" src={track.album.images[0].url} />;
}

export default TrackCover;
