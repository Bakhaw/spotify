import Link from "next/link";

interface ArtistLinkProps {
  artists: SpotifyApi.ArtistObjectFull[] | SpotifyApi.ArtistObjectSimplified[];
  onClick?: () => void;
}

const ArtistLink: React.FC<ArtistLinkProps> = ({ artists, onClick }) => {
  if (!artists) return null;

  return (
    <ul className="flex text-span items-center overflow-hidden">
      {artists.map((artist, index) => (
        <li key={artist.id} className="flex whitespace-nowrap">
          <Link
            className="block text-left hover:underline"
            href={`/artist/${artist.id}`}
            onClick={onClick}
          >
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
