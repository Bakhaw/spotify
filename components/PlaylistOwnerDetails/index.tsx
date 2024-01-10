"use client";

import { useCallback } from "react";

import useFetch from "@/hooks/useFetch";
import useSpotify from "@/hooks/useSpotify";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

function PlaylistOwnerDetails({
  playlist,
}: {
  playlist: SpotifyApi.SinglePlaylistResponse;
}) {
  const spotifyApi = useSpotify();

  const getUserAvatar = useCallback(
    () => spotifyApi.getUser(playlist?.owner.id),
    [spotifyApi, playlist]
  );

  const userAvatar = useFetch(getUserAvatar)?.images?.[0].url;
  const formattedPlaylist = {
    owner: {
      ...playlist.owner,
      image: userAvatar,
    },
  };

  return (
    <div className="group flex items-center gap-2">
      <Avatar className="h-6 w-6">
        <AvatarImage
          src={formattedPlaylist.owner.image}
          alt={formattedPlaylist.owner.display_name}
        />
        <AvatarFallback />
      </Avatar>

      <span className="group-hover:underline">
        {playlist.owner.display_name}
      </span>
    </div>
  );
}

export default PlaylistOwnerDetails;
