import { useEffect, useState } from "react";
import TrackList from "../TrackList";
import useSpotify from "@/hooks/useSpotify";

interface TopTracksProps {
  timeRange: "short_term" | "medium_term" | "long_term";
}

const TopTracks: React.FC<TopTracksProps> = () => {
  const spotifyApi = useSpotify();
  const token = spotifyApi.getAccessToken();
  const [topTracks, setTopTracks] = useState<SpotifyApi.TrackObjectFull[]>();

  async function getTopTracks() {
    const { body } = await spotifyApi.getMyTopTracks();
    setTopTracks(body.items);
  }

  useEffect(() => {
    if (token) {
      getTopTracks();
    }
  }, [token]);

  if (!topTracks) return null;

  return (
    <div className="p-8">
      <TrackList showCover title="Mostly Played" fullTracks={topTracks} />
    </div>
  );
};

export default TopTracks;
