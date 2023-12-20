import Draggable from "@/components/Draggable";
import Track from "@/components/Track";

import TrackListSkeleton from "./TrackListSkeleton";

interface TrackListProps {
  showAlbumName?: boolean; // default true
  showCover?: boolean; // default false
  showOrder?: boolean; // default false
  title?: string;
  tracks:
    | (SpotifyApi.TrackObjectFull | null)[]
    | (SpotifyApi.TrackObjectSimplified | null)[];
}

const TrackList: React.FC<TrackListProps> = ({
  showAlbumName = true,
  showCover = false,
  showOrder = false,
  title,
  tracks,
}) => {
  return (
    <div>
      <h1 className="mb-4 text-3xl font-bold lowercase">{title}</h1>

      <ul className="flex flex-col gap-3">
        {tracks ? (
          tracks.map(
            (track, index) =>
              track && (
                <li key={track.id}>
                  <Draggable id={`track_list:${track.id}`}>
                    <Track
                      order={showOrder ? index + 1 : null}
                      showAlbumName={showAlbumName}
                      showCover={showCover}
                      track={track}
                    />
                  </Draggable>
                </li>
              )
          )
        ) : (
          <TrackListSkeleton />
        )}
      </ul>
    </div>
  );
};

export default TrackList;
