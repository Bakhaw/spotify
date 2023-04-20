import { useCallback } from "react";

import useFetch from "@/hooks/useFetch";
import useSpotify from "@/hooks/useSpotify";
import TrackList from "../TrackList";

interface TopTracksProps {
  timeRange: "short_term" | "medium_term" | "long_term";
}

const TopTracks: React.FC<TopTracksProps> = () => {
  const spotifyApi = useSpotify();

  const getTopTracks = useCallback(
    () => spotifyApi.getMyTopTracks(),
    [spotifyApi]
  );

  const topTracks = useFetch(getTopTracks);

  if (!topTracks) return null;

  return (
    <div className="p-8">
      <TrackList showCover title="Mostly Played" tracks={topTracks.items} />
    </div>
  );
};

export default TopTracks;
