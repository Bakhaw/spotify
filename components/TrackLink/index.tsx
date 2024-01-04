import Link from "next/link";

import { cn } from "@/lib/utils";

interface TrackLinkProps {
  isActive?: boolean;
  onClick?: () => void;
  track: SpotifyApi.TrackObjectFull;
}

const TrackLink: React.FC<TrackLinkProps> = ({ isActive, onClick, track }) => (
  <div className="box-border min-w-0">
    <Link
      className={cn(
        "block truncate text-left text-sm sm:text-base hover:underline",
        isActive && "text-green-primary"
      )}
      href={`/album/${track.album.id}`}
      onClick={onClick}
    >
      {track.name}
    </Link>
  </div>
);

export default TrackLink;
