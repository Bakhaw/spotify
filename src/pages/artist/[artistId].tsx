import { useCallback, useState } from "react";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { NextSeo } from "next-seo";
import classNames from "classnames";

import useFetch from "@/hooks/useFetch";
import useSpotify from "@/hooks/useSpotify";
import isWhite from "@/lib/isWhite";

import Cover from "@/components/Cover";
import HorizontalSlider from "@/components/HorizontalSlider";

import MonthlyListeners from "./MonthlyListeners";
import generateRGBString from "@/lib/generateRGBString";
import useDominantColor from "@/hooks/useDominantColor";
import { Button } from "@/components/ui/button";

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

  const color = useDominantColor(artist?.images[0].url);

  const [currentFilter, setCurrentFilter] = useState<string>("albums");
  const handleFilterClick = (filter: string) => {
    setCurrentFilter(filter);
  };

  return (
    <div className="w-full sm:px-8">
      {artist && (
        <NextSeo
          title={`music app - ${artist.name}`}
          description={`music app - ${artist.name}`}
        />
      )}

      <div
        className="flex flex-col justify-center items-center gap-2  bg-gradient-secondary pt-20 px-3 pb-3"
        style={{ backgroundColor: generateRGBString(color) }}
      >
        <Cover
          alt={`${artist?.name} cover`}
          rounded
          size="medium"
          src={artist?.images[0].url}
        />
        <h1
          className={classNames(
            "text-3xl font-bold w-full",
            isWhite(color) ? "text-black" : "text-white"
          )}
        >
          {artist?.name}
        </h1>

        {artist && <MonthlyListeners artistId={artist.id} />}
      </div>

      <div
        style={{ backgroundColor: generateRGBString(color) }}
        className="flex flex-col gap-12 bg-gradient pt-5"
      >
        <div className="flex gap-4 pl-3">
          <Button
            onClick={() => handleFilterClick("albums")}
            style={{
              backgroundColor:
                currentFilter === "albums" ? generateRGBString(color) : "",
            }}
            size="sm"
            className={classNames(
              "w-auto justify-start rounded-full text-xs",
              currentFilter === "albums" && "text-white hover:bg-white"
            )}
          >
            Albums
          </Button>
          <Button
            size="sm"
            style={{
              backgroundColor:
                currentFilter === "singles" ? generateRGBString(color) : "",
            }}
            className={classNames(
              "w-auto justify-start rounded-full text-xs",
              currentFilter === "singles" && "text-white hover:bg-white"
            )}
            onClick={() => handleFilterClick("singles")}
          >
            Singles & EP
          </Button>
        </div>
        {currentFilter === "albums" && (
          <HorizontalSlider
            items={removeDuplicatesAlbums}
            type="album"
            title="Albums"
          />
        )}
        {currentFilter === "singles" && (
          <HorizontalSlider items={singles} type="album" title="Singles & EP" />
        )}
        <HorizontalSlider items={appearsOn} type="album" title="Appears On" />
      </div>
    </div>
  );
};

export default ArtistDetails;
