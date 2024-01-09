"use client";

import { useCallback } from "react";
import { NextPage } from "next";
import { useParams } from "next/navigation";

import useDominantColor from "@/hooks/useDominantColor";
import useFetch from "@/hooks/useFetch";
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

  const getAlbum = useCallback(
    () => spotifyApi.getAlbum(String(albumId)),
    [spotifyApi, albumId]
  );

  const album = useFetch<SpotifyApi.SingleAlbumResponse>(getAlbum, [albumId]);

  const dominantColor = useDominantColor(album?.images[0].url);
  const backgroundColor = generateRGBString(dominantColor);

  return (
    <>
      <div className="sm:relative">
        <AppHeader backgroundColor={backgroundColor} />
      </div>

      <Container className="p-0 sm:p-0">
        <div className="flex flex-col">
          <TrackListHeader album={album} />

          <div style={{ backgroundColor }} className="bg-gradient px-2 sm:px-8">
            <TrackList
              options={{
                showAlbumName: false,
                showPlaybackControls: true,
              }}
              tracks={album?.tracks.items}
            />
          </div>

          {album && (
            <div className="p-4 sm:px-8">
              <AlbumReleaseDate releaseDate={album.release_date} />
              <AlbumCopyrights copyrights={album.copyrights} />
            </div>
          )}
        </div>
      </Container>
    </>
  );
};

export default Album;
