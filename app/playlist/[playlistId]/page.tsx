"use client";

import { useCallback } from "react";
import { NextPage } from "next";
import { useParams } from "next/navigation";

import formatMs from "@/lib/formatMs";

import useFetch from "@/hooks/useFetch";
import useSpotify from "@/hooks/useSpotify";

import Container from "@/components/Container";
import Cover from "@/components/Cover";
import TrackList from "@/components/TrackList";

const Playlist: NextPage = () => {
  const { playlistId } = useParams();
  const spotifyApi = useSpotify();

  const getPlaylist = useCallback(
    () => spotifyApi.getPlaylist(String(playlistId)),
    [spotifyApi, playlistId]
  );

  const playlist = useFetch(getPlaylist, [playlistId]);

  if (!playlist) return null;

  const formattedPlaylist = {
    ...playlist,
    tracks: {
      ...playlist.tracks,
      items: playlist.tracks.items.map((item) => item.track),
    },
  };

  const duration = formattedPlaylist.tracks.items.reduce(
    (acc, curr) => (curr?.duration_ms ? acc + curr.duration_ms : 0),
    0
  );

  const playlistDuration = formatMs(duration);

  return (
    <Container>
      <div className="flex flex-col gap-8 px-8 py-4">
        <div className="flex flex-col md:flex-row items-center gap-6">
          <Cover
            alt={`${playlist.name} cover`}
            src={playlist.images?.[0]?.url}
          />

          <div className="flex flex-col justify-between">
            <div>
              <h1 className="capitalize">{playlist.type}</h1>
              <h1 className="text-6xl font-bold mb-10">{playlist.name}</h1>
            </div>

            <div className="flex gap-2">
              <h1>
                {playlist.tracks.total}{" "}
                {playlist.tracks.total > 1 ? "tracks" : "track"}
              </h1>
              <h1>{playlistDuration}</h1>
            </div>
          </div>
        </div>

        <TrackList
          showCover
          showOrder
          tracks={formattedPlaylist.tracks.items}
        />
      </div>
    </Container>
  );
};

export default Playlist;
