import { FullTrack } from "@/types";

import usePlaylists from "@/hooks/usePlaylists";

import ContextMenu from "@/components/ContextMenu";
import Draggable from "@/components/Draggable";
import Track from "@/components/Track";

import TrackListSkeleton from "./TrackListSkeleton";

type TrackListOptions = {
  showAlbumName?: boolean; // default true
  showCover?: boolean; // default false
  showCoverWithPlayButton?: boolean; // default false
  showOrder?: boolean; // default false
  showPlaybackControls?: boolean; // default false,
  showRank?: boolean; // default false
  showVisualizer?: boolean; // default false
};

interface TrackListProps {
  options: TrackListOptions;
  contextUri?: string;
  title?: string;
  tracks: FullTrack[] | undefined;
}

interface TrackListComposition {
  Skeleton: typeof TrackListSkeleton;
}

const TrackList: React.FC<TrackListProps> & TrackListComposition = ({
  contextUri,
  options,
  title,
  tracks,
}) => {
  const { error, isPending, playlists } = usePlaylists();

  const {
    showAlbumName = true,
    showCover,
    showCoverWithPlayButton,
    showOrder,
    showPlaybackControls,
    showRank,
    showVisualizer,
  } = options;

  const trackNumber = showRank || showOrder;

  return (
    <div>
      {title && <h1 className="text-3xl font-bold lowercase mb-2">{title}</h1>}

      <ul className="flex flex-col gap-3 w-full">
        {tracks ? (
          tracks.map((track, index) => (
            <li
              key={`${track?.id}-${index}`}
              className="flex items-center gap-1"
            >
              {trackNumber && (
                <span className="group-hover:opacity-0 w-6">{index + 1}</span>
              )}

              <div className="w-full">
                <Draggable id={`track_list:${track?.id}`}>
                  <ContextMenu playlists={playlists} track={track}>
                    <Track contextUri={contextUri} track={track}>
                      {showPlaybackControls && (
                        <Track.PlaybackControls trackNumber={index + 1} />
                      )}

                      <div className="flex items-center gap-2 flex-1">
                        {showCoverWithPlayButton && (
                          <Track.CoverWithPlayButton />
                        )}

                        {showCover && <Track.Cover />}

                        <Track.Details showVisualizer={showVisualizer} />
                      </div>

                      {showAlbumName && (
                        <div className="hidden lg:block text-left flex-1">
                          <Track.AlbumName />
                        </div>
                      )}

                      <div className="flex items-center gap-2 flex-1 justify-end">
                        <Track.Actions />

                        <div className="hidden sm:block">
                          <Track.Duration />
                        </div>
                      </div>
                    </Track>
                  </ContextMenu>
                </Draggable>
              </div>
            </li>
          ))
        ) : (
          <TrackListSkeleton />
        )}
      </ul>
    </div>
  );
};

TrackList.Skeleton = TrackListSkeleton;

export default TrackList;
