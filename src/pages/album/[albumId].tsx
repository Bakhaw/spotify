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
    <div className="flex flex-col zgap-4 p-8 pt-0">
      <NextSeo
        title={`music app - ${album?.name}`}
        description={`music app - ${album?.name}`}
      />

      <div className="zpx-8">
        <TrackListHeader album={album} />
      </div>

      <div
        style={{ backgroundColor: `rgb(${r},${g},${b})` }}
        className="bg-gradient"
      >
        <TrackList showOrder tracks={album?.tracks.items} />
      </div>

      {album && (
        <div className="mt-8">
          <AlbumReleaseDate releaseDate={album.release_date} />
          <AlbumCopyrights copyrights={album.copyrights} />
        </div>
      )}
    </div>
  );
};

export default Album;
