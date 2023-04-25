import Link from "next/link";

interface TrackLinkProps {
  onClick?: () => void;
  track: SpotifyApi.TrackObjectFull;
}

const TrackLink: React.FC<TrackLinkProps> = ({ onClick, track }) => (
  <div className="box-border">
    <Link
      className="block overflow-hidden text-ellipsis whitespace-nowrap hover:underline"
      href={`/album/${track.album.id}`}
      onClick={onClick}
    >
      {track.name}
    </Link>
  </div>
);

export default TrackLink;
