"use client";

import { useQuery } from "@tanstack/react-query";

import {
  SearchProvider,
  useSearchProviderStore,
} from "@/store/useSearchProviderStore";

import useSpotify from "@/hooks/useSpotify";

import BlurBackground from "@/components/BlurBackground";
import Container from "@/components/Container";
import HorizontalSlider from "@/components/HorizontalSlider";
import SearchBar from "@/components/SearchBar";
import TrackList from "@/components/TrackList";
import { Button } from "@/components/ui/button";

type SearchType =
  | "album"
  | "artist"
  | "playlist"
  | "track"
  | "show"
  | "episode";

const Search = ({ searchParams }: { searchParams?: { query: string } }) => {
  const spotifyApi = useSpotify();
  const { searchProvider, setSearchProvider } = useSearchProviderStore();

  const search = async () => {
    if (!searchParams?.query) return;

    const types: SearchType[] = ["album", "artist", "playlist", "track"];

    const { body } = await spotifyApi.search(searchParams.query, types, {
      limit: 5,
    });

    return body;
  };

  const { isFetching, data: searchResponse } = useQuery({
    queryKey: ["search", searchParams?.query],
    queryFn: search,
    enabled: searchProvider === "spotify",
  });

  const searchYtb = async () => {
    if (!searchParams?.query) return;

    const url = `https://youtube.googleapis.com/youtube/v3/search?part=snippet&q=${searchParams.query}&key=${process.env.NEXT_PUBLIC_YOUTUBE_API_KEY}`;

    const res = await fetch(url);
    const json = await res.json();

    return json;
  };

  const { isFetching: isYtbFetching, data: searchYtbResponse } = useQuery({
    queryKey: ["search-ytb", searchParams?.query],
    queryFn: searchYtb,
    enabled: searchProvider === "youtube",
  });

  const formatted = searchYtbResponse?.items?.map(
    (item: any, index: number) => ({
      id: index,
      album: {
        images: [
          {
            url: item.snippet.thumbnails.high.url,
          },
        ],
      },
      artists: [
        {
          id: index,
          name: item.snippet.channelTitle,
        },
      ],
      // explicit: true,
      name: item.snippet.title,
    })
  );

  // console.log(formatted);

  const artists = searchResponse?.artists?.items;
  const albums = searchResponse?.albums?.items;
  const playlists = searchResponse?.playlists?.items;
  const tracks =
    searchProvider === "youtube" ? formatted : searchResponse?.tracks?.items;

  function toggleSearchProvider() {
    const newProvider: SearchProvider =
      searchProvider === "spotify" ? "youtube" : "spotify";
    setSearchProvider(newProvider);
  }

  return (
    <Container>
      <BlurBackground />
      <div className="space-y-4 sm:space-y-8">
        <div>provider: {searchProvider}</div>
        <Button onClick={toggleSearchProvider}>toggle provider</Button>

        <SearchBar />

        {isFetching && (
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

        {searchResponse && (
          <div className="space-y-6">
            <TrackList
              options={{
                showCoverWithPlayButton: true,
                showOrder: true,
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

        {isYtbFetching && (
          <div className="space-y-6">
            <h1 className="text-3xl font-bold lowercase mb-2">tracks</h1>
            <TrackList.Skeleton length={5} />
          </div>
        )}

        {searchYtbResponse && (
          <div className="space-y-6">
            <TrackList
              options={{
                showCoverWithPlayButton: true,
                showOrder: true,
                showVisualizer: true,
              }}
              tracks={tracks}
              title="tracks"
            />
          </div>
        )}
      </div>
    </Container>
  );
};

export default Search;
