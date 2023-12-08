"use client";

import { useCallback } from "react";
import { NextPage } from "next";
import { useParams } from "next/navigation";

import useFetch from "@/hooks/useFetch";
import useSpotify from "@/hooks/useSpotify";
import useDominantColor from "@/hooks/useDominantColor";
import generateRGBString from "@/lib/generateRGBString";

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
  const color = useDominantColor(album?.images[0].url);

  return (
    <div className="flex flex-col sm:px-8 pt-0">
      <TrackListHeader album={album} />

      <div
        style={{ backgroundColor: generateRGBString(color) }}
        className="bg-gradient px-3 sm:px-0"
      >
        <TrackList showOrder tracks={album?.tracks.items} />
      </div>

      {album && (
        <div className="my-8 px-7 sm:px-0">
          <AlbumReleaseDate releaseDate={album.release_date} />
          <AlbumCopyrights copyrights={album.copyrights} />
        </div>
      )}
    </div>
  );
};

export default Album;