import Link from "next/link";

interface ArtistLinkProps {
  artists: SpotifyApi.ArtistObjectFull[] | SpotifyApi.ArtistObjectSimplified[];
}

const ArtistLink: React.FC<ArtistLinkProps> = ({ artists }) => {
  if (!artists) return null;

  return (
    <ul className="flex items-center overflow-hidden">
      {artists.map((artist, index) => (
        <li key={artist.id} className="flex whitespace-nowrap">
          <Link className="block hover:underline" href={`/artist/${artist.id}`}>
            {artist.name}
          </Link>
          {artists.length > 1 && index < artists.length - 1 && (
            <span>,&nbsp;</span>
          )}
        </li>
      ))}
    </ul>
  );
};

export default ArtistLink;
