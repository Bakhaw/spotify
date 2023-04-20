import { useCallback } from "react";

import useFetch from "@/hooks/useFetch";
import useSpotify from "@/hooks/useSpotify";
import TrackList from "@/components/TrackList";

function SavedTracks() {
  const spotifyApi = useSpotify();

  const getSavedTracks = useCallback(
    () => spotifyApi.getMySavedTracks(),
    [spotifyApi]
  );
  const savedTracks = useFetch(getSavedTracks);
  const formattedSavedTracks = savedTracks?.items.map((item) => item.track);

  if (!savedTracks) return null;

  return (
    <div className="p-8">
      <TrackList showCover title="saved tracks" tracks={formattedSavedTracks} />
    </div>
  );
}

export default SavedTracks;
