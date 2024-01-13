"use client";

import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";

import useSpotify from "@/hooks/useSpotify";

import Container from "@/components/Container";
import HorizontalSlider from "@/components/HorizontalSlider";

function User() {
  const { userId } = useParams();
  const spotifyApi = useSpotify();

  const getUserPlaylists = async () =>
    (await spotifyApi.getUserPlaylists(String(userId))).body.items;

  const {
    isPending,
    error,
    data: userPlaylists,
  } = useQuery({
    queryKey: ["getUserPlaylists", userId],
    queryFn: getUserPlaylists,
  });

  return (
    <Container>
      <h1 className="text-3xl">{userId}</h1>

      <HorizontalSlider items={userPlaylists} type="playlist" />
    </Container>
  );
}

export default User;
