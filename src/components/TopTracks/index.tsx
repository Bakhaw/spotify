import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

import useSpotify from "@/hooks/useSpotify";
import TrackList from "../TrackList";

interface TopTracksProps {
  timeRange: "short_term" | "medium_term" | "long_term";
}

const TopTracks: React.FC<TopTracksProps> = () => {
  const { data: session } = useSession();
  const spotifyApi = useSpotify();
  const [topTracks, setTopTracks] = useState<SpotifyApi.TrackObjectFull[]>();

  async function getTopTracks() {
    const { body } = await spotifyApi.getMyTopTracks();
    setTopTracks(body.items);
  }

  useEffect(() => {
    if (spotifyApi.getAccessToken()) {
      getTopTracks();
    }
  }, [session, spotifyApi]);

  if (!topTracks) return null;

  return (
    <div className="p-8">
      <TrackList showCover title="Mostly Played" tracks={topTracks} />
    </div>
  );
};

export default TopTracks;
