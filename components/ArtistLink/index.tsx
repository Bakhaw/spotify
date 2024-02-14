import Link from "next/link";

import { cn } from "@/lib/utils";

interface ArtistLinkProps {
  artists: SpotifyApi.ArtistObjectFull[] | SpotifyApi.ArtistObjectSimplified[];
  className?: string;
  onClick?: () => void;
}

const ArtistLink: React.FC<ArtistLinkProps> = ({
  artists,
  className,
  onClick,
}) => {
  if (!artists) return null;

  return (
    <ul className="flex items-center">
      {artists.map((artist, index) => (
        <li key={artist.id} className="flex text-foreground">
          <Link
            className={cn("block text-left hover:underline", className)}
            href={`/artist/${artist.id}`}
            onClick={onClick}
          >
            {artist.name}
          </Link>
          {artists.length > 1 && index < artists.length - 1 && (
            <span className="self-end">,&nbsp;</span>
          )}
        </li>
      ))}
    </ul>
  );
};

export default ArtistLink;
