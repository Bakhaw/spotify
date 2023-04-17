import { useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRecoilState } from "recoil";
import Link from "next/link";

import useSpotify from "@/hooks/useSpotify";
import { playlistState } from "@/atoms/playlistAtom";
import Cover from "@/components/Cover";

function Playlists() {
  const { data: session } = useSession();
  const spotifyApi = useSpotify();

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
    if (spotifyApi.getAccessToken()) {
      getPlaylists();
    }
  }, [session, spotifyApi]);

  if (!playlists) return null;

  return (
    <ul className="flex flex-wrap justify-center items-center gap-10 w-full p-8">
      {playlists.map((playlist, index) => {
        console.log("image:", playlist.images);

        return (
          <Link
            key={index}
            href={`/playlist/${playlist.id}`}
            className="flex-grow max-w-fit overflow-hidden text-ellipsis whitespace-nowrap"
          >
            <Cover
              src={playlist.images.length > 0 ? playlist.images[0].url : null}
            />
            {playlist.name}
          </Link>
        );
      })}
    </ul>
  );
}

export default Playlists;
