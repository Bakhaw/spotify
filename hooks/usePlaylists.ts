"use client";

import { useQuery } from "@tanstack/react-query";

import useSpotify from "@/hooks/useSpotify";

function usePlaylists() {
  const spotifyApi = useSpotify();
  const getUserPlaylists = async () =>
    (await spotifyApi.getUserPlaylists()).body;

  const {
    isPending,
    error,
    data: playlists,
  } = useQuery({
    queryKey: ["getUserPlaylists"],
    queryFn: getUserPlaylists,
  });

  return {
    isPending,
    error,
    playlists,
  };
}

export default usePlaylists;
