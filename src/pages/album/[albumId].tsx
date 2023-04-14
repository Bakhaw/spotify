import { useEffect, useState } from "react";
import { useRouter } from "next/router";

import millisToMinutesAndSeconds from "@/lib/millisToMinutesAndSeconds";
import useSpotify from "@/hooks/useSpotify";
import TrackList from "@/components/TrackList";
import Cover from "@/components/Cover";

const Album: React.FC = () => {
  const {
    query: { albumId },
  } = useRouter();
  const spotifyApi = useSpotify();
  const token = spotifyApi.getAccessToken();
  const [album, setAlbum] = useState<SpotifyApi.AlbumObjectFull>();

  async function getAlbum() {
    if (!albumId) return;

    const { body: album } = await spotifyApi.getAlbum(String(albumId));
    setAlbum(album);
  }

  useEffect(() => {
    if (token) {
      getAlbum();
    }
  }, [albumId, token]);

  if (!album) return null;

  const duration = album.tracks.items.reduce(
    (acc, curr) => acc + curr.duration_ms,
    0
  );
  const albumDuration = millisToMinutesAndSeconds(duration);
  const albumReleaseDate = new Date(album.release_date).getFullYear();

  return (
    <div className="flex flex-col gap-8 p-8">
      <div className="flex items-center gap-5">
        <Cover src={album.images[0].url} />

        <div className="flex flex-col justify-between">
          <div>
            <h1 className="capitalize">{album.album_type}</h1>
            <h1 className="text-6xl font-bold mb-10">{album.name}</h1>
          </div>

          <div className="flex gap-2">
            <h1>{album.artists[0].name}</h1>
            <h1>{albumReleaseDate}</h1>
            <h1>
              {album.total_tracks} {album.total_tracks > 1 ? "tracks" : "track"}
            </h1>
            <h1>{albumDuration}</h1>
          </div>
        </div>
      </div>

      <TrackList showOrder tracks={album.tracks.items} />
    </div>
  );
};

export default Album;
