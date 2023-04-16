import Link from "next/link";

interface ArtistLinkProps {
  artist: SpotifyApi.ArtistObjectFull | SpotifyApi.ArtistObjectSimplified;
}

const ArtistLink: React.FC<ArtistLinkProps> = ({ artist }) => {
  return (
    <Link href={`/artist/${artist.id}`} className="hover:underline w-max">
      {artist.name}
    </Link>
  );
};

export default ArtistLink;
