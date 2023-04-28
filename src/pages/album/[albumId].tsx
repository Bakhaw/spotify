import { useCallback } from "react";
import { NextPage } from "next";
import { useRouter } from "next/router";

import useFetch from "@/hooks/useFetch";
import useSpotify from "@/hooks/useSpotify";

import TrackList from "@/components/TrackList";
import TrackListHeader from "@/components/TrackListHeader";

const Album: NextPage = () => {
  const {
    query: { albumId },
  } = useRouter();
  const spotifyApi = useSpotify();

  const getAlbum = useCallback(
    () => spotifyApi.getAlbum(String(albumId)),
    [spotifyApi, albumId]
  );

  const album = useFetch<SpotifyApi.SingleAlbumResponse>(getAlbum, [albumId]);

  if (!album) return null;

  return (
    <div className="flex flex-col gap-8 p-8">
      <TrackListHeader album={album} />
      <TrackList showOrder tracks={album.tracks.items} />
    </div>
  );
};

export default Album;
