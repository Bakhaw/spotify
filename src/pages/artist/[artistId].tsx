import Cover from "@/components/Cover";
import HorizontalSlider from "@/components/HorizontalSlider";
import useSpotify from "@/hooks/useSpotify";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

function ArtistDetails() {
  const {
    query: { artistId },
  } = useRouter();
  const spotifyApi = useSpotify();

  const [artist, setArtist] = useState<SpotifyApi.ArtistObjectFull>();
  const [albums, setAlbums] = useState<SpotifyApi.AlbumObjectSimplified[]>();
  const [singles, setSingles] = useState<SpotifyApi.AlbumObjectSimplified[]>();

  async function getArtistData() {
    if (!artistId) return;

    const { body: artist } = await spotifyApi.getArtist(String(artistId));
    setArtist(artist);

    const { body: projects } = await spotifyApi.getArtistAlbums(
      String(artistId)
    );

    const albums = projects.items.filter(
      (project) => project.album_type === "album"
    );
    const singles = projects.items.filter(
      (project) => project.album_type !== "album"
    );

    setAlbums(albums);
    setSingles(singles);
  }

  useEffect(() => {
    getArtistData();
  }, [artistId]);

  if (!artist || !albums || !singles) return null;

  return (
    <div className="py-8">
      <div className="flex flex-col justify-center items-center gap-2">
        <Cover rounded size="large" src={artist.images[0].url} />
        <h1 className="text-4xl font-bold">{artist.name}</h1>
        <h1 className="font-light">
          {artist.followers.total.toLocaleString()} followers
        </h1>
      </div>

      <div className="flex flex-col gap-20">
        <HorizontalSlider items={albums} type="album" title="Albums" />
        <HorizontalSlider items={singles} type="album" title="Singles & EP" />
      </div>
    </div>
  );
}

export default ArtistDetails;
