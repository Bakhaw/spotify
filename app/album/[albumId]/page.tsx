"use client";

import { NextPage } from "next";
import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";

import useDominantColor from "@/hooks/useDominantColor";
import useSpotify from "@/hooks/useSpotify";

import generateRGBString from "@/lib/generateRGBString";

import AppHeader from "@/components/AppHeader";
import Container from "@/components/Container";
import TrackList from "@/components/TrackList";
import TrackListHeader from "@/components/TrackListHeader";

import AlbumCopyrights from "./AlbumCopyrights";
import AlbumReleaseDate from "./AlbumReleaseDate";

const Album: NextPage = () => {
  const { albumId } = useParams();
  const spotifyApi = useSpotify();

  const getAlbum = async () =>
    (await spotifyApi.getAlbum(String(albumId))).body;

  const {
    isPending,
    error,
    data: album,
  } = useQuery({
    queryKey: ["getAlbum", albumId],
    queryFn: getAlbum,
  });

  const dominantColor = useDominantColor(album?.images[0].url);
  const backgroundColor = generateRGBString(dominantColor);

  if (error) return "Error....";

  return (
    <>
      <div className="sm:relative">
        <AppHeader backgroundColor={backgroundColor} />
      </div>

      <Container className="p-0 sm:p-0">
        {isPending ? (
          "Loading...."
        ) : (
          <div className="flex flex-col gap-0">
            <TrackListHeader album={album} />

            <div
              style={{ backgroundColor }}
              className="bg-gradient px-2 sm:px-8 py-4"
            >
              <TrackList
                contextUri={album.uri}
                options={{
                  showAlbumName: false,
                  showPlaybackControls: true,
                }}
                tracks={album?.tracks.items}
              />
            </div>

            <div className="p-4 sm:px-8">
              <AlbumReleaseDate releaseDate={album.release_date} />
              <AlbumCopyrights copyrights={album.copyrights} />
            </div>
          </div>
        )}
      </Container>
    </>
  );
};

export default Album;
