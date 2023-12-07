import { useCallback } from "react";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { NextSeo } from "next-seo";

import useFetch from "@/hooks/useFetch";
import useSpotify from "@/hooks/useSpotify";

import Cover from "@/components/Cover";
import HorizontalSlider from "@/components/HorizontalSlider";

import MonthlyListeners from "./MonthlyListeners";

const ArtistDetails: NextPage = () => {
  const {
    query: { artistId },
  } = useRouter();
  const spotifyApi = useSpotify();

  const getArtist = useCallback(
    () => spotifyApi.getArtist(String(artistId)),
    [spotifyApi, artistId]
  );

  const getProjects = useCallback(
    () => spotifyApi.getArtistAlbums(String(artistId)),
    [spotifyApi, artistId]
  );

  const artist = useFetch<SpotifyApi.ArtistObjectFull>(getArtist, [artistId]);
  const projects = useFetch<SpotifyApi.ArtistsAlbumsResponse>(getProjects, [
    artistId,
  ]);

  const seen = new Set();
  const removeDuplicatesAlbums = projects?.items
    .filter((project) => project.album_group === "album")
    .filter((el) => {
      const duplicate = seen.has(el.name);
      seen.add(el.name);

      return Boolean(!duplicate);
    });

  const singles = projects?.items.filter(
    (project) => project.album_group === "single"
  );
  const appearsOn = projects?.items.filter(
    (project) => project.album_group === "appears_on"
  );

  return (
    <div className="px-8 w-full">
      {artist && (
        <NextSeo
          title={`music app - ${artist.name}`}
          description={`music app - ${artist.name}`}
        />
      )}

      <div className="flex flex-col justify-center items-center gap-2">
        <Cover
          alt={`${artist?.name} cover`}
          rounded
          size="large"
          src={artist?.images[0].url}
        />
        <h1 className="text-4xl font-bold">{artist?.name}</h1>

        {artist && <MonthlyListeners artistId={artist.id} />}
      </div>

      <div className="flex flex-col gap-12">
        <HorizontalSlider
          items={removeDuplicatesAlbums}
          type="album"
          title="albums"
        />
        <HorizontalSlider items={singles} type="album" title="singles & ep" />
        <HorizontalSlider items={appearsOn} type="album" title="appears on" />
      </div>
    </div>
  );
};

export default ArtistDetails;
