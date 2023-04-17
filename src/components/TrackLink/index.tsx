import Link from "next/link";

interface TrackLinkProps {
  track: SpotifyApi.TrackObjectFull;
}

const TrackLink: React.FC<TrackLinkProps> = ({ track }) => (
  <Link
    className="block overflow-hidden text-ellipsis whitespace-nowrap hover:underline"
    href={`/album/${track.album.id}`}
  >
    {track.name}
  </Link>
);

export default TrackLink;
