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
  track: SpotifyApi.TrackObjectFull | null;
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
  track,
}) => {
  const { playSong } = usePlaybackControls();

  if (!track) return null;

  return (
    <TrackContext.Provider
      value={{
        track,
      }}
    >
      <Button
        className="group shadow-none transition-all duration-300 flex items-center justify-between p-0 pr-2 sm:pr-4 min-h-[56px] h-full w-full cursor-default bg-transparent hover:bg-[#66677070] hover:text-white"
        onDoubleClick={() => playSong(track)}
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
