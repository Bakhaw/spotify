import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

import { Playlist, fetchPlaylist } from "@/API/playlists";
import useSpotify from "@/hooks/useSpotify";
import millisToMinutesAndSeconds from "@/lib/millisToMinutesAndSeconds";
import Cover from "@/components/Cover";
import TrackList from "@/components/TrackList";

function Playlist() {
  const { data: session } = useSession();
  const { query } = useRouter();
  const spotifyApi = useSpotify();

  const [playlist, setPlaylist] = useState<Playlist | null>();

  async function getPlaylist() {
    const playlist = await fetchPlaylist(spotifyApi, String(query.playlistId));
    setPlaylist(playlist);
  }

  useEffect(() => {
    if (spotifyApi.getAccessToken()) {
      getPlaylist();
    }
  }, [session, spotifyApi, query]);

  if (!playlist) return null;

  const duration = playlist.tracks.items.reduce(
    (acc, curr) => (curr?.duration_ms ? acc + curr.duration_ms : 0),
    0
  );

  const playlistDuration = millisToMinutesAndSeconds(duration);

  return (
    <div className="flex flex-col gap-8 p-8">
      <div className="flex flex-col md:flex-row items-center gap-6">
        <Cover src={playlist.images?.[0]?.url} />

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

      <TrackList showCover tracks={playlist.tracks.items} />
    </div>
  );
}

export default Playlist;
