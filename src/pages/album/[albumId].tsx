import { useCallback } from "react";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { NextSeo } from "next-seo";

import useFetch from "@/hooks/useFetch";
import useSpotify from "@/hooks/useSpotify";

import TrackList from "@/components/TrackList";
import TrackListHeader from "@/components/TrackListHeader";

import AlbumCopyrights from "./AlbumCopyrights";
import AlbumReleaseDate from "./AlbumReleaseDate";
import useDominantColor from "@/hooks/useDominantColor";

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
  const [r, g, b] = useDominantColor(album);

  return (
    <div className="flex flex-col p-8">
      <NextSeo
        title={`music app - ${album?.name}`}
        description={`music app - ${album?.name}`}
      />

      <TrackListHeader album={album} />
      <div style={{ backgroundColor: `rgb(${r},${g},${b})` }} className="test">
        <TrackList showOrder tracks={album?.tracks.items} />
      </div>

      {album && (
        <div>
          <AlbumReleaseDate releaseDate={album.release_date} />
          <AlbumCopyrights copyrights={album.copyrights} />
        </div>
      )}
    </div>
  );
};

export default Album;
