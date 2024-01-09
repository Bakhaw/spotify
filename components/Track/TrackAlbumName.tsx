import { useTrackContext } from "./context";
import Link from "next/link";

// TODO create <AlbumLink /> component
const TrackAlbumName = () => {
  const { track } = useTrackContext();

  return (
    <Link
      href={`/album/${track.album.id}`}
      className="truncate text-sm hover:underline"
    >
      {track.album.name}
    </Link>
  );
};

export default TrackAlbumName;
