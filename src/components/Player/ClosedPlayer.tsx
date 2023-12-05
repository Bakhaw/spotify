import { useRecoilValue } from "recoil";
import {
  ChevronUpIcon,
  PauseIcon,
  PlayIcon,
  SkipBackIcon,
  SkipForwardIcon,
  Volume1Icon,
  Volume2Icon,
} from "lucide-react";

import { isPlayingState } from "@/atoms/trackAtom";

import ArtistLink from "@/components/ArtistLink";
import Cover from "@/components/Cover";
import Draggable from "@/components/Draggable";
import TrackLink from "@/components/TrackLink";

import { PlayerProps } from ".";

interface ClosedPlayerProps extends PlayerProps {
  onOpen: () => void;
}

const ClosedPlayer: React.FC<ClosedPlayerProps> = ({
  onBackwardButtonClick,
  onForwardButtonClick,
  onOpen,
  onTogglePlay,
  track,
}) => {
  const isPlaying = useRecoilValue(isPlayingState);

  return (
    <div className="flex justify-between items-center w-full">
      <div className="flex-1">
        <Draggable id={`closed_player:${track.id}`}>
          <div className="flex flex-1 justify-start items-center gap-3 h-full">
            <Cover
              alt={track.name}
              size="small"
              square
              src={track.album.images[0].url}
            />

            <div className="max-w-[50vw] md:max-w-[30vw]">
              <TrackLink track={track} />
              <ArtistLink artists={track.artists} />
            </div>
          </div>
        </Draggable>
      </div>

      <ChevronUpIcon
        className="h-6 w-6 md:hidden"
        role="button"
        onClick={onOpen}
      />

      <div className="hidden md:flex flex-1 justify-center items-center gap-3 h-full">
        <SkipBackIcon
          className="h-6 w-6"
          role="button"
          onClick={onBackwardButtonClick}
        />
        {isPlaying ? (
          <PauseIcon className="h-8 w-8" role="button" onClick={onTogglePlay} />
        ) : (
          <PlayIcon className="h-8 w-8" role="button" onClick={onTogglePlay} />
        )}
        <SkipForwardIcon
          className="h-6 w-6"
          role="button"
          onClick={onForwardButtonClick}
        />
      </div>

      <div className="hidden md:flex flex-1 justify-end items-center gap-3 h-full">
        <Volume1Icon className="h-6 w-6" role="button" />
        <input
          min={0}
          max={100}
          // value={volume}
          type="range"
          // onChange={onVolumeChange}
        />
        <Volume2Icon className="h-6 w-6" role="button" />
      </div>
    </div>
  );
};

export default ClosedPlayer;
