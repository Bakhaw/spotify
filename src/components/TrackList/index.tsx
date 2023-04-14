import Track from "../Track";

interface TrackListProps {
  showCover?: boolean; // default false
  showOrder?: boolean; // default false
  title?: string;
  fullTracks?: SpotifyApi.TrackObjectFull[];
  simpleTracks?: SpotifyApi.TrackObjectSimplified[];
}

const TrackList: React.FC<TrackListProps> = ({
  showCover = false,
  showOrder = false,
  title,
  fullTracks,
  simpleTracks,
}) => {
  return (
    <div>
      <h1 className="mb-4 text-3xl font-bold lowercase">{title}</h1>

      <ul className="flex flex-col gap-6">
        {fullTracks &&
          fullTracks.map((track, index) => (
            <li key={track.id}>
              <Track
                coverSrc={track.album.images[0].url}
                order={showOrder ? index + 1 : null}
                showCover={showCover}
                track={track}
              />
            </li>
          ))}

        {simpleTracks &&
          simpleTracks.map((track, index) => (
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
