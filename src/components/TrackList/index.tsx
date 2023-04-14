import Track from "../Track";

interface TrackListProps {
  showCover?: boolean; // default false
  showOrder?: boolean; // default false
  title?: string;
  tracks: SpotifyApi.TrackObjectFull[];
}

const TrackList: React.FC<TrackListProps> = ({
  showCover,
  showOrder,
  title,
  tracks,
}) => {
  return (
    <div>
      <h1 className="mb-4 text-3xl font-bold lowercase">{title}</h1>

      <ul className="flex flex-col gap-6">
        {tracks.map((track, index) => (
          <li key={track.id}>
            <Track
              order={showOrder ? index + 1 : null}
              showCover={showCover}
              track={track}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TrackList;
