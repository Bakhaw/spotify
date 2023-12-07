import millisToMinutesAndSeconds from "@/lib/millisToMinutesAndSeconds";

import ArtistLink from "@/components/ArtistLink";
import Cover from "@/components/Cover";

import TrackListHeaderSkeleton from "./TrackListHeaderSkeleton";
import useDominantColor from "@/hooks/useDominantColor";

interface TrackListHeaderProps {
  album: SpotifyApi.AlbumObjectFull;
}

const TrackListHeader: React.FC<TrackListHeaderProps> = ({ album }) => {
  const [r, g, b] = useDominantColor(album);

  console.log("dominantColors", useDominantColor(album));

  if (!album) return <TrackListHeaderSkeleton />;

  const duration = album.tracks.items.reduce(
    (acc, curr) => acc + curr.duration_ms,
    0
  );
  const albumDuration = millisToMinutesAndSeconds(duration);
  const albumReleaseDate = new Date(album.release_date).getFullYear();

  return (
    <div
      className="flex flex-col md:flex-row items-center gap-5 p-10 rounded-t-md bg-gradient-secondary"
      style={{ backgroundColor: `rgb(${r},${g},${b})` }}
    >
      <Cover alt={`${album.name} cover`} src={album.images[0].url} />
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
