import millisToMinutesAndSeconds from "@/lib/millisToMinutesAndSeconds";

import ArtistLink from "../ArtistLink";
import Cover from "../Cover";

interface TrackListHeaderProps {
  album: SpotifyApi.AlbumObjectFull;
}

const TrackListHeader: React.FC<TrackListHeaderProps> = ({ album }) => {
  const duration = album.tracks.items.reduce(
    (acc, curr) => acc + curr.duration_ms,
    0
  );
  const albumDuration = millisToMinutesAndSeconds(duration);
  const albumReleaseDate = new Date(album.release_date).getFullYear();

  return (
    <div className="flex flex-col md:flex-row items-center gap-5">
      <Cover src={album.images[0].url} />

      <div className="flex flex-col justify-between">
        <div>
          <h1 className="capitalize">{album.album_type}</h1>
          <h1 className="text-6xl font-bold mb-10">{album.name}</h1>
        </div>

        <div className="flex gap-2">
          <ArtistLink artists={album.artists} />
          <h1>{albumReleaseDate}</h1>
          <h1>
            {album.total_tracks} {album.total_tracks > 1 ? "tracks" : "track"}
          </h1>
          <h1>{albumDuration}</h1>
        </div>
      </div>
    </div>
  );
};

export default TrackListHeader;
