import Link from "next/link";

import { cn } from "@/lib/utils";

interface TrackLinkProps {
  isActive?: boolean;
  onClick?: () => void;
  track: SpotifyApi.TrackObjectFull;
}

const TrackLink: React.FC<TrackLinkProps> = ({ isActive, onClick, track }) => (
  <div className="box-border">
    <Link
      className={cn(
        "flex overflow-hidden text-ellipsis text-left whitespace-nowrap hover:underline",
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
