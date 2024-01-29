"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import YTMusic from "ytmusic-api";

import { SearchProvider, SearchYoutubeResponse } from "@/types";

import { useSearchProviderStore } from "@/store/useSearchProviderStore";

import useSpotify from "@/hooks/useSpotify";

import searchMapper from "@/lib/searchMapper";

import BlurBackground from "@/components/BlurBackground";
import Container from "@/components/Container";
import HorizontalSlider from "@/components/HorizontalSlider";
import SearchBar from "@/components/SearchBar";
import TrackList from "@/components/TrackList";
import YouTubePlayer from "@/components/YoutubePlayer";

import { Button } from "@/components/ui/button";
import { useEffect } from "react";

type SearchType =
  | "album"
  | "artist"
  | "playlist"
  | "track"
  | "show"
  | "episode";

const Search = () => {
  const spotifyApi = useSpotify();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const setSearchProvider = useSearchProviderStore((s) => s.setSearchProvider);

  const query = searchParams.get("query");
  const provider = searchParams.get("provider") as SearchProvider;

  const ytmusic = new YTMusic();

  const search = async () => {
    if (!query) return;

    const types: SearchType[] = ["album", "artist", "playlist", "track"];

    const { body } = await spotifyApi.search(query, types, {
      limit: 5,
    });

    return body;
  };

  const { isPending, data: searchResponse } = useQuery({
    queryKey: ["search", query],
    queryFn: search,
    enabled: provider !== "youtube",
  });

  const searchYoutube = async () => {
    if (!query) return;

    try {
      await ytmusic.search(query);
    } catch (error) {
      console.log("heheheh", error);
    }

    const url = `https://youtube.googleapis.com/youtube/v3/search?part=snippet&q=${query}&key=${process.env.NEXT_PUBLIC_YOUTUBE_API_KEY}`;

    const res = await fetch(url);
    const result = await res.json();

    return result as SearchYoutubeResponse;
  };

  useEffect(() => {
    const init = async () => {
      await ytmusic.initialize(/* Optional: Custom cookies */);
    };

    init();
  }, [ytmusic]);

  const { isPending: isYtbPending, data: searchYoutubeResponse } = useQuery({
    queryKey: ["search-ytb", query],
    queryFn: searchYoutube,
    enabled: provider === "youtube",
  });

  const formattedSearchResponse = searchMapper(
    searchYoutubeResponse?.items ?? []
  );

  const artists = searchResponse?.artists?.items;
  const albums = searchResponse?.albums?.items;
  const playlists = searchResponse?.playlists?.items;

  function toggleSearchProvider() {
    const params = new URLSearchParams(searchParams);
    const provider = params.get("provider");

    if (provider === "youtube") {
      params.delete("provider");
      setSearchProvider("spotify");
    } else {
      params.set("provider", "youtube");
      setSearchProvider("youtube");
    }

    replace(`${pathname}?${params.toString()}`);
  }

  return (
    <Container>
      <BlurBackground />
      <div className="space-y-4 sm:space-y-8">
        <div>provider: {provider}</div>
        <Button onClick={toggleSearchProvider}>toggle provider</Button>

        <SearchBar />

        {provider !== "youtube" && isPending && (
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
              contextUri={tracks[0].album.uri}
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

        {provider === "youtube" && isYtbPending && (
          <div className="space-y-6">
            <h1 className="text-3xl font-bold lowercase mb-2">tracks</h1>
            <TrackList.Skeleton length={5} />
          </div>
        )}

        {searchYoutubeResponse && (
          <div className="flex items-center justify-between gap-6">
            <TrackList
              options={{
                showCoverWithPlayButton: true,
                showOrder: true,
                showVisualizer: true,
              }}
              tracks={formattedSearchResponse}
              title="tracks"
            />

            <YouTubePlayer />
          </div>
        )}
      </div>
    </Container>
  );
};

export default Search;
