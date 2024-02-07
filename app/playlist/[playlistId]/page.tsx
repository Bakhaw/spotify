"use client";

import { useMemo } from "react";
import { NextPage } from "next";
import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";

import { FullTrack, TrackOrigin } from "@/types";

import useDominantColor from "@/hooks/useDominantColor";
import useSpotify from "@/hooks/useSpotify";

import formatMs from "@/lib/formatMs";
import generateRGBString from "@/lib/generateRGBString";

import AppHeader from "@/components/AppHeader";
import Container from "@/components/Container";
import Cover from "@/components/Cover";
import PlaylistOwnerDetails from "@/components/PlaylistOwnerDetails";
import TrackList from "@/components/TrackList";

const Playlist: NextPage = () => {
  const { playlistId } = useParams();
  const spotifyApi = useSpotify();

  const getPlaylist = async () =>
    (await spotifyApi.getPlaylist(String(playlistId))).body;

  const {
    isPending,
    error,
    data: playlist,
  } = useQuery({
    queryKey: ["getPlaylist", playlistId],
    queryFn: getPlaylist,
  });

  const dominantColor = useDominantColor(playlist?.images[0].url);
  const backgroundColor = generateRGBString(dominantColor);

  const formattedItems: FullTrack[] | undefined = useMemo(
    () =>
      playlist?.tracks.items
        .filter((item) => !item.is_local) // TODO remove this filter when LocalTrack component is ready
        .map((item) => ({
          ...(item.track as SpotifyApi.TrackObjectFull),
          origin: TrackOrigin.SPOTIFY,
        })),
    [playlist]
  );

  if (error || isPending) return null;

  const formattedTracks = {
    ...playlist?.tracks,
    items: formattedItems ?? [],
  };

  const duration = formattedTracks.items.reduce(
    (acc, curr) => (curr?.duration_ms ? acc + curr.duration_ms : 0),
    0
  );

  const playlistDuration = formatMs(duration);
  const totalTracks = formattedTracks.items.length;

  return (
    <>
      <div className="sm:relative">
        <AppHeader backgroundColor={backgroundColor} />
      </div>

      <Container className="p-0 sm:p-0">
        <div
          className="flex flex-col md:flex-row items-center gap-5 p-4 sm:p-8 bg-gradient-secondary"
          style={{ backgroundColor }}
        >
          <Cover
            alt={`${playlist.name} cover`}
            src={playlist.images?.[0]?.url}
          />

          <div className="flex flex-col justify-between gap-4">
            <div>
              <h2 className="capitalize">{playlist.type}</h2>
              <h1 className="text-3xl sm:text-6xl font-bold">
                {playlist.name}
              </h1>
              <h2 className="text-sm">{playlist.description}</h2>
            </div>

            <PlaylistOwnerDetails playlist={playlist} />

            <div className="flex gap-2">
              <h2>
                {totalTracks} {totalTracks > 1 ? "tracks" : "track"}
              </h2>
              <h2>{playlistDuration}</h2>
            </div>
          </div>
        </div>

        <div
          style={{ backgroundColor }}
          className="bg-gradient px-2 sm:px-8 py-4"
        >
          <TrackList
            contextUri={playlist.uri}
            options={{
              showCover: true,
              showPlaybackControls: true,
            }}
            tracks={formattedTracks.items}
          />
        </div>
      </Container>
    </>
  );
};

export default Playlist;
