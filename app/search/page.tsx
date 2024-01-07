"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import { IoSearchOutline } from "react-icons/io5";

import useSpotify from "@/hooks/useSpotify";
import useQueryParams from "@/hooks/useQueryParams";

import Container from "@/components/Container";
import HorizontalSlider from "@/components/HorizontalSlider";
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
  }, [query, spotifyApi]);

  const tracks = searchResponse?.tracks?.items ?? [];
  const artists = searchResponse?.artists?.items ?? [];
  const albums = searchResponse?.albums?.items ?? [];

  return (
    <Container>
      <div className="space-y-2 sm:space-y-8">
        <form className="py-5" onSubmit={onSubmit}>
          <div className="w-2/6 rounded-full flex items-center">
            <IoSearchOutline className="absolute ml-4 w-5 h-5" />
            <input
              className="w-full p-4 pl-12 rounded-full"
              placeholder="Search"
              defaultValue={queryParams.search}
              ref={inputRef}
              type="text"
            />
          </div>
        </form>

        {searchResponse && (
          <div className="space-y-6">
            <TrackList showCover tracks={tracks} title="tracks" />

            <h1 className="text-3xl font-bold lowercase">artists</h1>
            <HorizontalSlider items={artists} type="artist" />

            <h1 className="text-3xl font-bold lowercase">albums</h1>
            <HorizontalSlider items={albums} type="album" />
          </div>
        )}
      </div>
    </Container>
  );
};

export default Search;