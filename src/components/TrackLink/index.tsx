import Link from "next/link";

interface TrackLinkProps {
  track: SpotifyApi.TrackObjectFull;
}

const TrackLink: React.FC<TrackLinkProps> = ({ track }) => {
  return (
    <Link href={`/album/${track.album.id}`} className="hover:underline w-max">
      {track.name}
    </Link>
  );
};

export default TrackLink;
