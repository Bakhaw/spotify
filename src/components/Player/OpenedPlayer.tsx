import { ChangeEvent } from "react";
import { useRecoilValue } from "recoil";

import {
  BackwardIcon,
  ForwardIcon,
  ChevronDownIcon,
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
  onProgressChange: (e: ChangeEvent<HTMLInputElement>) => void;
  progressMs: number;
}

const OpenedPlayer: React.FC<OpenedPlayer> = ({
  onBackwardButtonClick,
  onClose,
  onForwardButtonClick,
  onProgressChange,
  onTogglePlay,
  progressMs,
  track,
}) => {
  const isPlaying = useRecoilValue(isPlayingState);

  const currentMinutes = Math.floor((progressMs / 1000 / 60) << 0);
  const currentSeconds = Math.floor((progressMs / 1000) % 60);
  const maxMinutes = Math.floor((track.duration_ms / 1000 / 60) << 0);
  const maxSeconds = Math.floor((track.duration_ms / 1000) % 60);

  return (
    <div className="flex flex-col justify-between items-center h-full w-[300px] py-8">
      <ChevronDownIcon
        className="h-6 w-6 self-end"
        role="button"
        onClick={onClose}
      />

      <div className="flex flex-col justify-between items-center gap-12">
        <Cover size="large" src={track.album.images[0].url} />

        <div className="flex flex-col gap-4 w-full">
          <div className="flex justify-between items-center w-full">
            <div>
              <TrackLink track={track} />
              <ArtistLink artists={track.artists} />
            </div>

            <LikeButton track={track} />
          </div>

          <div className="flex flex-col">
            <input
              min={0}
              max={track.duration_ms}
              onChange={onProgressChange}
              type="range"
              value={progressMs}
            />

            <div className="flex justify-between items-center">
              <span>
                {currentMinutes}:{currentSeconds.toString().padStart(2, "0")}
              </span>
              <span>
                {maxMinutes}:{maxSeconds.toString().padStart(2, "0")}
              </span>
            </div>
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

      <div></div>
    </div>
  );
};

export default OpenedPlayer;
