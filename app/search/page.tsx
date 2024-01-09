"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

import useSpotify from "@/hooks/useSpotify";

import Container from "@/components/Container";
import HorizontalSlider from "@/components/HorizontalSlider";
import SearchBar from "@/components/SearchBar";
import TrackList from "@/components/TrackList";
import BlurBackground from "@/components/BlurBackground";

type SearchType =
  | "album"
  | "artist"
  | "playlist"
  | "track"
  | "show"
  | "episode";

const Search = ({ searchParams }: { searchParams?: { query: string } }) => {
  const spotifyApi = useSpotify();
  const { data: session } = useSession();

  const [searchResponse, setSearchResponse] =
    useState<SpotifyApi.SearchResponse | null>(null);

  useEffect(() => {
    if (!spotifyApi.getAccessToken() || !searchParams?.query) return;

    const search = async (query: string) => {
      const types: SearchType[] = ["album", "artist", "playlist", "track"];

      try {
        const { body } = await spotifyApi.search(query, types, {
          limit: 5,
        });

        setSearchResponse(body);
      } catch (error) {
        console.log(error);
      }
    };

    search(searchParams.query);
  }, [searchParams?.query, spotifyApi, session]);

  const tracks = searchResponse?.tracks?.items ?? [];
  const artists = searchResponse?.artists?.items ?? [];
  const albums = searchResponse?.albums?.items ?? [];
  const playlists = searchResponse?.playlists?.items ?? [];

  return (
    <Container>
      <BlurBackground />
      <div className="space-y-4 sm:space-y-8">
        <SearchBar />

        {searchResponse && (
          <div className="space-y-6">
            <TrackList
              options={{
                showOrder: true,
                showCoverWithPlayButton: true,
                showVisualizer: true,
              }}
              tracks={tracks}
              title="tracks"
            />

            <div className="space-y-2">
              <h1 className="text-3xl lowercase">artists</h1>
              <HorizontalSlider items={artists} type="artist" />
            </div>

            <div className="space-y-2">
              <h1 className="text-3xl lowercase">albums</h1>
              <HorizontalSlider items={albums} type="album" />
            </div>

            <div className="space-y-2">
              <h1 className="text-3xl lowercase">playlists</h1>
              <HorizontalSlider items={playlists} type="playlist" />
            </div>
          </div>
        )}
      </div>
    </Container>
  );
};

export default Search;
