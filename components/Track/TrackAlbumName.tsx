import AlbumLink from "@/components/AlbumLink";

import { useTrackContext } from "./context";

const TrackAlbumName = () => {
  const { track } = useTrackContext();

  if (!("album" in track)) return null;

  return (
    <AlbumLink
      albumId={track.album.id}
      className="truncate text-sm w-fit hover:underline"
    >
      {track.album.name}
    </AlbumLink>
  );
};

export default TrackAlbumName;
