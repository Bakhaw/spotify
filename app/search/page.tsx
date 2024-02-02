"use client";

import { useQuery } from "@tanstack/react-query";

import useSpotify from "@/hooks/useSpotify";

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

const Search = ({ searchParams }: { searchParams?: { query: string } }) => {
  const spotifyApi = useSpotify();

  const search = async () => {
    if (!searchParams?.query) return;

    const types: SearchType[] = ["album", "artist", "playlist", "track"];

    const { body } = await spotifyApi.search(searchParams.query, types, {
      limit: 5,
    });

    return body;
  };

  const {
    isPending,
    error,
    data: searchResponse,
  } = useQuery({
    queryKey: ["search", searchParams?.query],
    queryFn: search,
  });

  const tracks = searchResponse?.tracks?.items ?? [];
  const artists = searchResponse?.artists?.items ?? [];
  const albums = searchResponse?.albums?.items ?? [];
  const playlists = searchResponse?.playlists?.items ?? [];

  return (
    <Container>
      <BlurBackground />
      <div className="space-y-4 sm:space-y-8">
        <SearchBar />

        {isPending && (
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
              contextUri={tracks[0].album.uri}
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
      </div>
    </Container>
  );
};

export default Search;
