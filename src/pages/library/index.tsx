import TrackList from "@/components/TrackList";
import useSpotify from "@/hooks/useSpotify";
import { useEffect, useState } from "react";

function Library() {
  const spotifyApi = useSpotify();
  const token = spotifyApi.getAccessToken();
  const [savedTracks, setSavedTracks] =
    useState<SpotifyApi.TrackObjectFull[]>();

  async function getSavedTracks() {
    const { body } = await spotifyApi.getMySavedTracks({ limit: 50 });
    const tracks = body.items.map((item) => item.track);
    setSavedTracks(tracks);
  }

  useEffect(() => {
    if (token) {
      getSavedTracks();
    }
  }, [token]);

  if (!savedTracks) return null;

  return (
    <div className="p-8">
      <TrackList showCover title="saved tracks" tracks={savedTracks} />
    </div>
  );
}

export default Library;
