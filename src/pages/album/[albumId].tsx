import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

import useSpotify from "@/hooks/useSpotify";
import TrackList from "@/components/TrackList";
import TrackListHeader from "@/components/TrackListHeader";

const Album: React.FC = () => {
  const { data: session } = useSession();
  const {
    query: { albumId },
  } = useRouter();
  const spotifyApi = useSpotify();

  const [album, setAlbum] = useState<SpotifyApi.AlbumObjectFull>();

  async function getAlbum() {
    if (!albumId) return;

    const { body: album } = await spotifyApi.getAlbum(String(albumId));
    setAlbum(album);
  }

  useEffect(() => {
    if (spotifyApi.getAccessToken()) {
      getAlbum();
    }
  }, [albumId, session, spotifyApi]);

  if (!album) return null;

  return (
    <div className="flex flex-col gap-8 p-8">
      <TrackListHeader album={album} />
      <TrackList showOrder tracks={album.tracks.items} />
    </div>
  );
};

export default Album;
