import Link from "next/link";

import { cn } from "@/lib/utils";

interface TrackLinkProps {
  className?: string;
  isActive?: boolean;
  onClick?: () => void;
  track: SpotifyApi.TrackObjectFull;
}

const TrackLink: React.FC<TrackLinkProps> = ({
  className,
  isActive,
  onClick,
  track,
}) => (
  <div className="box-border min-w-0">
    <Link
      className={cn(
        "block truncate text-left text-sm hover:underline",
        isActive && "text-green-primary",
        className
      )}
      href={`/album/${track.album.id}`}
      onClick={onClick}
    >
      {track.name}
    </Link>
  </div>
);

export default TrackLink;
