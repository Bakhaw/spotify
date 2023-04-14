import { useEffect, useState } from "react";
import { useRouter } from "next/router";

import useSpotify from "@/hooks/useSpotify";
import Cover from "@/components/Cover";
import HorizontalSlider from "@/components/HorizontalSlider";

function ArtistDetails() {
  const {
    query: { artistId },
  } = useRouter();
  const spotifyApi = useSpotify();

  const [artist, setArtist] = useState<SpotifyApi.ArtistObjectFull>();
  const [projects, setProjects] =
    useState<SpotifyApi.AlbumObjectSimplified[]>();

  async function getArtistData() {
    if (!artistId) return;

    const { body: artist } = await spotifyApi.getArtist(String(artistId));
    setArtist(artist);

    const { body: projects } = await spotifyApi.getArtistAlbums(
      String(artistId),
      { limit: 50 }
    );
    setProjects(projects.items);
  }

  useEffect(() => {
    getArtistData();
  }, [artistId]);

  if (!artist || !projects) return null;

  const seen = new Set();
  const removeDuplicatesAlbums = projects
    .filter((project) => project.album_group === "album")
    .filter((el) => {
      const duplicate = seen.has(el.name);
      seen.add(el.name);

      return Boolean(!duplicate);
    });

  const singles = projects.filter(
    (project) => project.album_group === "single"
  );
  const appearsOn = projects.filter(
    (project) => project.album_group === "appears_on"
  );

  return (
    <div className="py-8">
      <div className="flex flex-col justify-center items-center gap-2">
        <Cover rounded size="large" src={artist.images[0].url} />
        <h1 className="text-4xl font-bold">{artist.name}</h1>
        <h1 className="font-light">
          {artist.followers.total.toLocaleString()} followers
        </h1>
      </div>

      <div className="flex flex-col gap-12">
        <HorizontalSlider
          items={removeDuplicatesAlbums}
          type="album"
          title="albums"
        />
        <HorizontalSlider items={singles} type="album" title="singles & ep" />
        <HorizontalSlider items={appearsOn} type="album" title="appears on" />
      </div>
    </div>
  );
}

export default ArtistDetails;
