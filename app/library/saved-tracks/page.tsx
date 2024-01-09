"use client";

import { useCallback } from "react";

import useFetch from "@/hooks/useFetch";
import useSpotify from "@/hooks/useSpotify";

import Container from "@/components/Container";
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
    <Container>
      <TrackList
        options={{
          showCover: true,
          showPlaybackControls: true,
        }}
        title="saved tracks"
        tracks={formattedSavedTracks}
      />
    </Container>
  );
}

export default SavedTracks;
