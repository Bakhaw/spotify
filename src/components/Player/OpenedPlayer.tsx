import { useRecoilValue } from "recoil";

import {
  BackwardIcon,
  ForwardIcon,
  PauseCircleIcon,
  PlayCircleIcon,
} from "@heroicons/react/24/solid";

import { isPlayingState } from "@/atoms/trackAtom";

import ArtistLink from "../ArtistLink";
import Cover from "../Cover";
import LikeButton from "../LikeButton";
import TrackLink from "../TrackLink";

import { PlayerProps } from ".";

interface OpenedPlayer extends PlayerProps {
  onClose?: () => void;
}

const OpenedPlayer: React.FC<OpenedPlayer> = ({
  onBackwardButtonClick,
  onForwardButtonClick,
  onTogglePlay,
  track,
}) => {
  const isPlaying = useRecoilValue(isPlayingState);

  return (
    <div className="flex flex-col justify-center items-center gap-12 h-full w-[300px]">
      <Cover size="large" src={track.album.images[0].url} />

      <div className="flex flex-col gap-4 w-full">
        <div className="flex justify-between items-center w-full">
          <div>
            <TrackLink track={track} />
            <ArtistLink artists={track.artists} />
          </div>

          <LikeButton track={track} />
        </div>

        <div className="flex justify-center items-center gap-6 w-full">
          <BackwardIcon
            className="h-8 w-8"
            role="button"
            onClick={onBackwardButtonClick}
          />
          {isPlaying ? (
            <PauseCircleIcon
              className="h-16 w-16"
              role="button"
              onClick={onTogglePlay}
            />
          ) : (
            <PlayCircleIcon
              className="h-16 w-16"
              role="button"
              onClick={onTogglePlay}
            />
          )}
          <ForwardIcon
            className="h-8 w-8"
            role="button"
            onClick={onForwardButtonClick}
          />
        </div>
      </div>
    </div>
  );
};

export default OpenedPlayer;
