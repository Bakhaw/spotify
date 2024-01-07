"use client";

import { Suspense, useEffect, useState } from "react";

import useQueryParams from "@/hooks/useQueryParams";
import useSpotify from "@/hooks/useSpotify";

import Container from "@/components/Container";
import HorizontalSlider from "@/components/HorizontalSlider";
import SearchBar from "@/components/SearchBar";
import SearchBarFallback from "@/components/SearchBar/SearchBarFallback";
import TrackList from "@/components/TrackList";

type QueryParams = {
  search: string;
};

type SearchType =
  | "album"
  | "artist"
  | "playlist"
  | "track"
  | "show"
  | "episode";

const Search = () => {
  const spotifyApi = useSpotify();
  const { queryParams } = useQueryParams<QueryParams>();

  const [searchResponse, setSearchResponse] =
    useState<SpotifyApi.SearchResponse | null>(null);

  useEffect(() => {
    if (!queryParams.search) return;

    const search = async (query: string) => {
      const types: SearchType[] = ["album", "artist", "track"];

      try {
        const { body } = await spotifyApi.search(query, types, {
          limit: 5,
        });

        setSearchResponse(body);
      } catch (error) {
        console.log(error);
      }
    };

    search(queryParams.search);
  }, [queryParams, spotifyApi]);

  const tracks = searchResponse?.tracks?.items ?? [];
  const artists = searchResponse?.artists?.items ?? [];
  const albums = searchResponse?.albums?.items ?? [];

  return (
    <Container>
      <div className="space-y-4 sm:space-y-8">
        <Suspense fallback={<SearchBarFallback />}>
          <SearchBar />
        </Suspense>

        {searchResponse && (
          <div className="space-y-6">
            <TrackList showCover tracks={tracks} title="tracks" />

            <div className="space-y-2">
              <h1 className="text-3xl font-bold lowercase">artists</h1>
              <HorizontalSlider items={artists} type="artist" />
            </div>

            <div className="space-y-2">
              <h1 className="text-3xl font-bold lowercase">albums</h1>
              <HorizontalSlider items={albums} type="album" />
            </div>
          </div>
        )}
      </div>
    </Container>
  );
};

export default Search;
