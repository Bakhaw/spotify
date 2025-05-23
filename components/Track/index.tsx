import { FullTrack } from "@/types";

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
  track: FullTrack | null;
  onPlay: () => void;
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
  onPlay,
}) => {
  const { playSong } = usePlaybackControls();

  if (!track) return null;

  async function handleDoubleClick() {
    if (!track) return null;

    let fallbackContextUri = track?.uri;

    if (contextUri) {
      fallbackContextUri = contextUri;
    }

    if ("album" in track) {
      fallbackContextUri = track.album.uri;
    }

    try {
      await playSong(track, fallbackContextUri);
      onPlay();
    } catch (error) {
      if (error === "NO_ACTIVE_DEVICE_FOUND") {
        console.log("NO_ACTIVE_DEVICE_FOUND");
        // todo show alert message to the user
      }
    }
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
        className="grow-0 max-w-[80vw] md:max-w-none group shadow-none transition-all duration-300 flex items-center justify-between gap-2 p-0 pr-2 sm:pr-4 min-h-[56px] h-full w-full cursor-default bg-transparent hover:bg-[#66677070] hover:text-white"
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
