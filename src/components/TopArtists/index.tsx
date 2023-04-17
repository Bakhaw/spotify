import { useEffect, useState } from "react";

import useSpotify from "@/hooks/useSpotify";
import HorizontalSlider from "../HorizontalSlider";
import { useSession } from "next-auth/react";

const TopArtists: React.FC = () => {
  const { data: session } = useSession();
  const spotifyApi = useSpotify();
  const [topArtists, setTopArtists] = useState<SpotifyApi.ArtistObjectFull[]>();

  async function getTopArtists() {
    const { body } = await spotifyApi.getMyTopArtists({ limit: 50 });

    setTopArtists(body.items);
  }

  useEffect(() => {
    if (spotifyApi.getAccessToken()) {
      getTopArtists();
    }
  }, [session, spotifyApi]);

  if (!topArtists) return null;

  return (
    <div className="w-full py-8">
      <HorizontalSlider items={topArtists} type="artist" title="Top Artists" />
    </div>
  );
};

export default TopArtists;
