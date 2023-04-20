import { useCallback } from "react";

import useFetch from "@/hooks/useFetch";
import useSpotify from "@/hooks/useSpotify";
import HorizontalSlider from "../HorizontalSlider";

const TopArtists: React.FC = () => {
  const spotifyApi = useSpotify();

  const getTopArtists = useCallback(
    () => spotifyApi.getMyTopArtists(),
    [spotifyApi]
  );

  const topArtists =
    useFetch<SpotifyApi.UsersTopArtistsResponse>(getTopArtists);

  if (!topArtists) return null;

  return (
    <div className="w-full py-8">
      <HorizontalSlider
        items={topArtists.items}
        type="artist"
        title="Top Artists"
      />
    </div>
  );
};

export default TopArtists;
