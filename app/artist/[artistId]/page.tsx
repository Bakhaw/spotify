"use client";

import { useCallback, useState } from "react";
import { NextPage } from "next";
import { useParams } from "next/navigation";

import useFetch from "@/hooks/useFetch";
import useSpotify from "@/hooks/useSpotify";
import useDominantColor from "@/hooks/useDominantColor";

import generateRGBString from "@/lib/generateRGBString";
import { cn } from "@/lib/utils";

import Cover from "@/components/Cover";
import HorizontalSlider from "@/components/HorizontalSlider";

import { Button } from "@/components/ui/button";

import MonthlyListeners from "./MonthlyListeners";

const ArtistDetails: NextPage = () => {
  const { artistId } = useParams();
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

  // TODO skeleton

  return (
    <>
      <div
        className="flex flex-col justify-center items-center gap-2 bg-gradient-secondary py-8"
        style={{ backgroundColor: generateRGBString(color) }}
      >
        <Cover
          alt={`${artist?.name} cover`}
          rounded
          size="medium"
          src={artist?.images[0].url}
        />
        <h1 className="text-7xl font-bold text-white">{artist?.name}</h1>
        {artist && <MonthlyListeners artistId={artist.id} />}
      </div>

      <div
        style={{ backgroundColor: generateRGBString(color) }}
        className="flex flex-col gap-8 bg-gradient"
      >
        <div className="flex gap-4 p-4">
          <Button
            onClick={() => handleFilterClick("albums")}
            style={{
              backgroundColor:
                currentFilter === "albums" ? generateRGBString(color, 0.7) : "",
            }}
            size="sm"
            className={cn(
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
                currentFilter === "singles"
                  ? generateRGBString(color, 0.7)
                  : "",
            }}
            className={cn(
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
            title="albums"
          />
        )}
        {currentFilter === "singles" && (
          <HorizontalSlider items={singles} type="album" title="singles & ep" />
        )}

        {appearsOn?.length > 0 && (
          <HorizontalSlider items={appearsOn} type="album" title="appears on" />
        )}
      </div>
    </>
  );
};

export default ArtistDetails;
