import { useEffect, useState } from "react";

import useSpotify from "@/hooks/useSpotify";
import HorizontalSlider from "../HorizontalSlider";

const TopArtists: React.FC = () => {
  const spotifyApi = useSpotify();
  const token = spotifyApi.getAccessToken();
  const [topArtists, setTopArtists] = useState<SpotifyApi.ArtistObjectFull[]>();

  async function getTopArtists() {
    const { body } = await spotifyApi.getMyTopArtists({ limit: 50 });

    setTopArtists(body.items);
  }

  useEffect(() => {
    if (token) {
      getTopArtists();
    }
  }, [token]);

  console.log(topArtists);

  if (!topArtists) return null;

  return (
    <div className="w-full py-8">
      <HorizontalSlider items={topArtists} type="artist" title="Top Artists" />
    </div>
  );
};

export default TopArtists;
