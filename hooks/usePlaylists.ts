"use client";

import { useCallback } from "react";

import useSpotify from "@/hooks/useSpotify";
import useFetch from "@/hooks/useFetch";

function usePlaylists() {
  const spotifyApi = useSpotify();

  const getPlaylists = useCallback(
    () => spotifyApi.getUserPlaylists(),
    [spotifyApi]
  );

  const playlists = useFetch(getPlaylists);
  return playlists;
}

export default usePlaylists;
