import Link from "next/link";

interface ArtistLinkProps {
  artist: SpotifyApi.ArtistObjectFull | SpotifyApi.ArtistObjectSimplified;
}

const ArtistLink: React.FC<ArtistLinkProps> = ({ artist }) => (
  <Link
    className="block overflow-hidden text-ellipsis whitespace-nowrap hover:underline"
    href={`/artist/${artist.id}`}
  >
    {artist.name}
  </Link>
);

export default ArtistLink;
