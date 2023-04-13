import useSpotify from "@/hooks/useSpotify";
import Link from "next/link";
import { useEffect, useState } from "react";

function Playlists() {
  const spotifyApi = useSpotify();
  const token = spotifyApi.getAccessToken();
  const [userPlaylists, setUserPlaylists] =
    useState<SpotifyApi.PlaylistBaseObject[]>();

  async function getPlaylists() {
    const { body } = await spotifyApi.getUserPlaylists({ limit: 50 });

    setUserPlaylists(body.items);
  }

  useEffect(() => {
    if (token) {
      getPlaylists();
    }
  }, [token]);

  if (!userPlaylists) return null;

  return (
    <ul className="flex flex-col gap-2 w-full">
      {userPlaylists.map((playlist, index) => (
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
