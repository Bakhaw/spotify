import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import Link from "next/link";

import useSpotify from "@/hooks/useSpotify";
import { playlistState } from "@/atoms/playlistAtom";

function Playlists() {
  const spotifyApi = useSpotify();
  const token = spotifyApi.getAccessToken();
  const [playlists, setPlaylists] =
    useRecoilState<SpotifyApi.PlaylistBaseObject[]>(playlistState);

  async function getPlaylists() {
    try {
      const { body } = await spotifyApi.getUserPlaylists({ limit: 50 });
      setPlaylists(body.items);
    } catch (error) {
      console.log("Error when fetching", error);
    }
  }

  useEffect(() => {
    if (token) {
      getPlaylists();
    }
  }, [token]);

  if (!playlists) return null;

  return (
    <ul className="flex flex-col gap-2 w-full">
      {playlists.map((playlist, index) => (
        <Link
          key={index}
          href={`/playlist/${playlist.id}`}
          className="max-w-fit overflow-hidden text-ellipsis whitespace-nowrap"
        >
          {playlist.name}
        </Link>
      ))}
    </ul>
  );
}

export default Playlists;
