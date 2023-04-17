import Link from "next/link";

interface TrackLinkProps {
  track: SpotifyApi.TrackObjectFull;
}

const TrackLink: React.FC<TrackLinkProps> = ({ track }) => (
  <div className="box-border">
    <Link
      className="block overflow-hidden text-ellipsis whitespace-nowrap hover:underline"
      href={`/album/${track.album.id}`}
    >
      {track.name}
    </Link>
  </div>
);

export default TrackLink;
