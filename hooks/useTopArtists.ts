import { useCallback } from "react";
import { TimeRange } from "@/types";
import useFetch from "@/hooks/useFetch";
import useSpotify from "@/hooks/useSpotify";

function useTopArtists(
  timeRange: TimeRange
): SpotifyApi.UsersTopArtistsResponse {
  const spotifyApi = useSpotify();

  const getTopArtists = useCallback(
    () => spotifyApi.getMyTopArtists({ time_range: timeRange }),
    [spotifyApi, timeRange]
  );

  const topArtists =
    useFetch<SpotifyApi.UsersTopArtistsResponse>(getTopArtists);

  return topArtists;
}

export default useTopArtists;
