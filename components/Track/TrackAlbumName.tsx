import AlbumLink from "@/components/AlbumLink";

import { useTrackContext } from "./context";
import { TrackOrigin } from "@/types";

const TrackAlbumName = () => {
  const { track } = useTrackContext();

  if (!("album" in track)) return null;

  return track.origin === TrackOrigin.SPOTIFY ? (
    <AlbumLink
      albumId={track.album.id}
      className="truncate text-sm w-fit hover:underline"
    >
      {track.album.name}
    </AlbumLink>
  ) : (
    <h3>{track.album.name}</h3>
  );
};

export default TrackAlbumName;
