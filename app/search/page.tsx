"use client";

import { FormEvent, useEffect, useRef, useState } from "react";

import useSpotify from "@/hooks/useSpotify";
import useQueryParams from "@/hooks/useQueryParams";
import TrackList from "@/components/TrackList";
import HorizontalSlider from "@/components/HorizontalSlider";

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
  const { queryParams, setQueryParams } = useQueryParams<QueryParams>();
  const inputRef = useRef<HTMLInputElement>(null);

  const [searchResponse, setSearchResponse] =
    useState<SpotifyApi.SearchResponse | null>(null);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const query = inputRef?.current?.value;

    if (!query) return;

    setQueryParams({ search: inputRef?.current?.value });
  }

  const query = inputRef?.current?.value;
  useEffect(() => {
    if (!query) return;

    const search = async () => {
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

    search();
  }, [query]);

  const tracks = searchResponse?.tracks?.items ?? [];
  const artists = searchResponse?.artists?.items ?? [];
  const albums = searchResponse?.albums?.items ?? [];

  return (
    <div className="space-y-2 sm:space-y-8">
      <h1>Search Page</h1>

      <form onSubmit={onSubmit}>
        <input
          placeholder="Search"
          defaultValue={queryParams.search}
          ref={inputRef}
          type="text"
        />
        <button>Submit</button>
      </form>

      {searchResponse && (
        <div className="space-y-6">
          <TrackList showCover tracks={tracks} title="tracks" />
          <HorizontalSlider items={artists} type="artist" title="artists" />
          <HorizontalSlider items={albums} type="album" title="albums" />
        </div>
      )}
    </div>
  );
};

export default Search;
