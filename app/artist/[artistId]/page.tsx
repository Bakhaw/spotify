"use client";

import { NextPage } from "next";
import { useParams, usePathname, useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";

import useDominantColor from "@/hooks/useDominantColor";
import useSpotify from "@/hooks/useSpotify";

import generateRGBString from "@/lib/generateRGBString";

import AppHeader from "@/components/AppHeader";
import Container from "@/components/Container";
import HorizontalSlider from "@/components/HorizontalSlider";

import { Button } from "@/components/ui/button";

import ArtistHeader from "./ArtistHeader";

type FilterType = "album" | "single" | "appears_on";

const ArtistDetails: NextPage = ({
  searchParams,
}: {
  searchParams?: { filter: FilterType };
}) => {
  const spotifyApi = useSpotify();

  const { artistId } = useParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const currentFilter: FilterType = searchParams?.filter ?? "album";

  const handleFilterClick = (filter: FilterType) => {
    if (filter === currentFilter) return;

    const params = new URLSearchParams(searchParams);

    if (filter) {
      params.set("filter", filter);
    } else {
      params.delete("filter");
    }

    replace(`${pathname}?${params.toString()}`);
  };

  const getArtist = async () =>
    (await spotifyApi.getArtist(String(artistId))).body;

  const {
    isPending,
    error,
    data: artist,
  } = useQuery({
    queryKey: ["getArtist", artistId],
    queryFn: getArtist,
  });

  const getProjects = async (filter: FilterType) => {
    const { body } = await spotifyApi.getArtistAlbums(String(artistId), {
      include_groups: filter,
    });

    return body.items;
  };

  const { data: albums } = useQuery({
    queryKey: ["getProjects", artistId, currentFilter],
    queryFn: () => getProjects("album"),
    enabled: currentFilter === "album",
  });

  const { data: singles } = useQuery({
    queryKey: ["getProjects", artistId, currentFilter],
    queryFn: () => getProjects("single"),
    enabled: currentFilter === "single",
  });

  const { data: appearsOn } = useQuery({
    queryKey: ["getProjects", artistId, currentFilter],
    queryFn: () => getProjects("appears_on"),
    enabled: currentFilter === "appears_on",
  });

  const dominantColor = useDominantColor(artist?.images[0].url);
  const backgroundColor = generateRGBString(dominantColor);

  // TODO skeleton
  return (
    <>
      <div className="sm:relative">
        <AppHeader backgroundColor={backgroundColor} />
      </div>

      <Container className="p-0 sm:p-0">
        {artist && (
          <ArtistHeader artist={artist} backgroundColor={backgroundColor} />
        )}

        <div
          style={{ backgroundColor }}
          className="flex flex-col gap-8 bg-gradient py-4"
        >
          <div className="flex gap-4 px-4 sm:px-8">
            <Button
              className="w-auto justify-start rounded-full text-xs"
              onClick={() => handleFilterClick("album")}
              size="sm"
              style={{
                ...(currentFilter === "album" && {
                  backgroundColor: generateRGBString(dominantColor, 0.7),
                }),
              }}
            >
              Albums
            </Button>
            <Button
              className="w-auto justify-start rounded-full text-xs"
              onClick={() => handleFilterClick("single")}
              size="sm"
              style={{
                ...(currentFilter === "single" && {
                  backgroundColor: generateRGBString(dominantColor, 0.7),
                }),
              }}
            >
              Singles & EP
            </Button>
            <Button
              className="w-auto justify-start rounded-full text-xs"
              onClick={() => handleFilterClick("appears_on")}
              size="sm"
              style={{
                ...(currentFilter === "appears_on" && {
                  backgroundColor: generateRGBString(dominantColor, 0.7),
                }),
              }}
            >
              Appears on
            </Button>
          </div>

          {currentFilter === "album" && (
            <div className="space-y-2 px-4 sm:px-8">
              <h1 className="text-3xl font-bold lowercase">albums</h1>

              <HorizontalSlider
                items={albums}
                type="album"
                showArtistName={false}
              />
            </div>
          )}

          {currentFilter === "single" && (
            <div className="space-y-2 px-4 sm:px-8">
              <h1 className="text-3xl font-bold lowercase">singles & ep</h1>

              <HorizontalSlider
                items={singles}
                type="album"
                showArtistName={false}
              />
            </div>
          )}

          {currentFilter === "appears_on" && (
            <div className="space-y-2 px-4 sm:px-8">
              <h1 className="text-3xl font-bold lowercase">appears on</h1>

              <HorizontalSlider items={appearsOn} type="album" />
            </div>
          )}
        </div>
      </Container>
    </>
  );
};

export default ArtistDetails;
