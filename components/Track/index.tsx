import { Track as TrackType } from "@/types";

import usePlaybackControls from "@/hooks/usePlaybackControls";

import { Button } from "@/components/ui/button";

import TrackActions from "./TrackActions";
import TrackAlbumName from "./TrackAlbumName";
import TrackCover from "./TrackCover";
import TrackCoverWithPlayButton from "./TrackCoverWithPlayButton";
import TrackDetails from "./TrackDetails";
import TrackDuration from "./TrackDuration";
import TrackPlaybackControls from "./TrackPlaybackControls";

import { TrackContext } from "./context";

export interface TrackProps {
  children: React.ReactNode;
  contextUri?: string;
  track: TrackType | null;
}

export interface TrackComposition {
  Actions: typeof TrackActions;
  AlbumName: typeof TrackAlbumName;
  Cover: typeof TrackCover;
  CoverWithPlayButton: typeof TrackCoverWithPlayButton;
  Details: typeof TrackDetails;
  Duration: typeof TrackDuration;
  PlaybackControls: typeof TrackPlaybackControls;
}

// TODO handle local track
const Track: React.FC<TrackProps> & TrackComposition = ({
  children,
  contextUri,
  track,
}) => {
  const { playSong } = usePlaybackControls();

  if (!track) return null;

  function handleDoubleClick() {
    if (!track) return null;

    let fallbackContextUri = track?.uri;

    if (contextUri) {
      fallbackContextUri = contextUri;
    }

    if ("album" in track) {
      fallbackContextUri = track.album.uri;
    }

    playSong(track, fallbackContextUri);
  }

  return (
    <TrackContext.Provider
      value={{
        track,
        contextUri: contextUri
          ? contextUri
          : "album" in track
          ? track.album.uri
          : track.uri,
      }}
    >
      <Button
        className="group shadow-none transition-all duration-300 flex items-center justify-between p-0 pr-2 sm:pr-4 min-h-[56px] h-full w-full cursor-default bg-transparent hover:bg-[#66677070] hover:text-white"
        onDoubleClick={handleDoubleClick}
      >
        {children}
      </Button>
    </TrackContext.Provider>
  );
};

Track.Actions = TrackActions;
Track.AlbumName = TrackAlbumName;
Track.Cover = TrackCover;
Track.CoverWithPlayButton = TrackCoverWithPlayButton;
Track.Details = TrackDetails;
Track.Duration = TrackDuration;
Track.PlaybackControls = TrackPlaybackControls;

export default Track;
