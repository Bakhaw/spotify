"use client";

import { useQuery } from "@tanstack/react-query";

import { SearchProvider, YTMusicSongDetailed } from "@/types";

import useSpotify from "@/hooks/useSpotify";

import searchMapper from "@/lib/searchMapper";

import BlurBackground from "@/components/BlurBackground";
import Container from "@/components/Container";
import HorizontalSlider from "@/components/HorizontalSlider";
import SearchBar from "@/components/SearchBar";
import TrackList from "@/components/TrackList";

type SearchType =
  | "album"
  | "artist"
  | "playlist"
  | "track"
  | "show"
  | "episode";

const Search = ({
  searchParams,
}: {
  searchParams: { provider?: SearchProvider; query?: string };
}) => {
  const spotifyApi = useSpotify();
  const { provider, query } = searchParams;

  const search = async () => {
    if (!query) return;

    const types: SearchType[] = ["album", "artist", "playlist", "track"];

    const { body } = await spotifyApi.search(query, types, {
      limit: 5,
    });

    return body;
  };

  const { isFetching, data: searchResponse } = useQuery({
    queryKey: ["search", query],
    queryFn: search,
    enabled: Boolean(query) && provider !== "youtube",
  });

  const artists = searchResponse?.artists?.items;
  const albums = searchResponse?.albums?.items;
  const playlists = searchResponse?.playlists?.items;

  const searchYoutube = async () => {
    if (!query) return;

    try {
      const res = await fetch(`/api/search/youtube?query=${query}`);
      const json = await res.json();

      const result = json.result as YTMusicSongDetailed[];

      return result;
    } catch (error) {
      console.error(error);
    }
  };

  const { isFetching: isYtbFetching, data: searchYoutubeResponse } = useQuery({
    queryKey: ["search-ytb", query],
    queryFn: searchYoutube,
    enabled: Boolean(query) && provider === "youtube",
  });

  const formattedSearchResponse = searchMapper(searchYoutubeResponse ?? []);

  return (
    <Container>
      <BlurBackground />
      <div className="space-y-4 sm:space-y-8">
        <SearchBar />

        {provider !== "youtube" && isFetching && (
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold lowercase mb-2">tracks</h1>
              <TrackList.Skeleton length={5} />
            </div>

            <div className="space-y-2">
              <h1 className="text-3xl lowercase">artists</h1>
              <HorizontalSlider.Skeleton />
            </div>
            <div className="space-y-2">
              <h1 className="text-3xl lowercase">albums</h1>
              <HorizontalSlider.Skeleton />
            </div>
            <div className="space-y-2">
              <h1 className="text-3xl lowercase">playlists</h1>
              <HorizontalSlider.Skeleton />
            </div>
          </div>
        )}

        {provider !== "youtube" && searchResponse && (
          <div className="space-y-6">
            <TrackList
              options={{
                showCoverWithPlayButton: true,
                showOrder: true,
                showVisualizer: true,
              }}
              tracks={searchResponse?.tracks?.items}
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

        {provider === "youtube" && isYtbFetching && (
          <div className="space-y-6">
            <h1 className="text-3xl font-bold lowercase mb-2">tracks</h1>
            <TrackList.Skeleton length={5} />
          </div>
        )}

        {searchYoutubeResponse && (
          <div className="flex items-start justify-between gap-4">
            <div className="w-full">
              <TrackList
                options={{
                  showCoverWithPlayButton: true,
                  showOrder: true,
                  showVisualizer: true,
                }}
                tracks={formattedSearchResponse}
                title="tracks"
              />
            </div>
          </div>
        )}
      </div>
    </Container>
  );
};

export default Search;
