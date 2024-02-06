"use client";

import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";

import useSpotify from "@/hooks/useSpotify";

import Container from "@/components/Container";
import HorizontalSlider from "@/components/HorizontalSlider";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

function User() {
  const { userId } = useParams();
  const spotifyApi = useSpotify();

  const getUser = async () => (await spotifyApi.getUser(String(userId))).body;

  const { data: user } = useQuery({
    queryKey: ["getUser", userId],
    queryFn: getUser,
  });

  const getUserPlaylists = async () =>
    (await spotifyApi.getUserPlaylists(String(userId))).body.items;

  const { data: userPlaylists } = useQuery({
    queryKey: ["getUserPlaylists", userId],
    queryFn: getUserPlaylists,
  });

  if (!user) return null;

  return (
    <Container className="space-y-8">
      <div className="flex items-center gap-1 mr-auto w-fit rounded-full text-foreground p-2 bg-green-primary/40 ring-2 ring-green-primary">
        <Avatar className="h-12 w-12">
          <AvatarImage alt={user.display_name} src={user.images?.[0].url} />
          <AvatarFallback />
        </Avatar>

        <h1 className="text-2xl font-mono">@{userId}</h1>
      </div>

      <div className="space-y-2">
        <h1 className="text-3xl font-bold lowercase">playlists</h1>

        <HorizontalSlider items={userPlaylists} type="playlist" />
      </div>
    </Container>
  );
}

export default User;
