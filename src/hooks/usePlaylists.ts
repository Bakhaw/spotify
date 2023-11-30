"use client";

import { useCallback } from "react";

import useSpotify from "./useSpotify";
import useFetch from "./useFetch";

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
