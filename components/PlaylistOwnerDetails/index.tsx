import Link from "next/link";
import { useQuery } from "@tanstack/react-query";

import useSpotify from "@/hooks/useSpotify";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface PlaylistOwnerDetailsProps {
  playlist: SpotifyApi.SinglePlaylistResponse;
}

const PlaylistOwnerDetails: React.FC<PlaylistOwnerDetailsProps> = ({
  playlist,
}) => {
  const spotifyApi = useSpotify();

  const getUser = async () =>
    (await spotifyApi.getUser(playlist.owner.id)).body;

  const {
    isPending,
    error,
    data: user,
  } = useQuery({
    queryKey: ["getUser", playlist.owner.id],
    queryFn: getUser,
  });

  const userAvatar = user?.images?.[0].url;

  const formattedPlaylist = {
    owner: {
      ...playlist.owner,
      image: userAvatar,
    },
  };

  if (error || isPending) return null;

  return (
    <div className="group flex items-center gap-2">
      <Avatar className="h-6 w-6">
        <AvatarImage
          src={formattedPlaylist.owner.image}
          alt={formattedPlaylist.owner.display_name}
        />
        <AvatarFallback />
      </Avatar>

      <Link
        className="group-hover:underline"
        href={`/user/${formattedPlaylist.owner.id}`}
      >
        {formattedPlaylist.owner.display_name}
      </Link>
    </div>
  );
};

export default PlaylistOwnerDetails;
