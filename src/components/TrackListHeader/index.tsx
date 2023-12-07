import useDominantColor from "@/hooks/useDominantColor";
import generateRGBString from "@/lib/generateRGBString";
import millisToMinutesAndSecondsFormatted from "@/lib/millisToMinutesAndSecondsFormatted";

import ArtistLink from "@/components/ArtistLink";
import Cover from "@/components/Cover";

import TrackListHeaderSkeleton from "./TrackListHeaderSkeleton";

interface TrackListHeaderProps {
  album: SpotifyApi.AlbumObjectFull;
}

const TrackListHeader: React.FC<TrackListHeaderProps> = ({ album }) => {
  const color = useDominantColor(album?.images[0].url);

  if (!album) return <TrackListHeaderSkeleton />;

  const duration = album.tracks.items.reduce(
    (acc, curr) => acc + curr.duration_ms,
    0
  );

  const albumDuration = millisToMinutesAndSecondsFormatted(duration);
  const albumReleaseDate = new Date(album.release_date).getFullYear();

  return (
    <div
      className="flex flex-col md:flex-row items-center gap-5 pt-20 px-3 pb-3 rounded-t-md bg-gradient-secondary sm:p-10"
      style={{ backgroundColor: generateRGBString(color) }}
    >
      <Cover alt={`${album.name} cover`} src={album.images[0].url} />
      <div className="flex flex-col justify-between w-full gap-2 pl-4">
        <div>
          <h1 className="hidden capitalize sm:block">{album.album_type}</h1>
          <h1 className="w-full text-3xl font-bold sm:mb-10 sm:text-6xl">
            {album.name}
          </h1>
        </div>

        <div className="flex-col gap-2">
          <ArtistLink artists={album.artists} />
          <div className="flex gap-1 text-white text-opacity-70 text-sm">
            <span>{albumReleaseDate}</span>
            <span>•</span>
            <span>
              {album.total_tracks} {album.total_tracks > 1 ? "tracks" : "track"}
              ,
            </span>
            <span>{albumDuration}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrackListHeader;
