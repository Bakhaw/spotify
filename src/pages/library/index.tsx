import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

import useSpotify from "@/hooks/useSpotify";
import TrackList from "@/components/TrackList";

function Library() {
  const { data: session } = useSession();
  const spotifyApi = useSpotify();

  const [savedTracks, setSavedTracks] =
    useState<SpotifyApi.TrackObjectFull[]>();

  async function getSavedTracks() {
    const { body } = await spotifyApi.getMySavedTracks({ limit: 50 });
    const tracks = body.items.map((item) => item.track);
    setSavedTracks(tracks);
  }

  useEffect(() => {
    if (spotifyApi.getAccessToken()) {
      getSavedTracks();
    }
  }, [session, spotifyApi]);

  if (!savedTracks) return null;

  return (
    <div className="p-8">
      <TrackList showCover title="saved tracks" tracks={savedTracks} />
    </div>
  );
}

export default Library;
