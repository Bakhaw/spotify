import { useRecoilValue } from "recoil";
import {
  ChevronDownIcon,
  PauseIcon,
  PlayIcon,
  SkipBackIcon,
  SkipForwardIcon,
} from "lucide-react";

import { currentTrackIdState, isPlayingState } from "@/atoms/trackAtom";
import useTrack from "@/hooks/useTrack";

import ArtistLink from "@/components/ArtistLink";
import Cover from "@/components/Cover";
import LikeButton from "@/components/LikeButton";
import TrackLink from "@/components/TrackLink";

import { PlayerProps } from ".";
import Timer from "./Timer";

interface OpenedPlayer extends PlayerProps {
  onClose?: () => void;
}

const OpenedPlayer: React.FC<OpenedPlayer> = ({
  onBackwardButtonClick,
  onClose,
  onForwardButtonClick,
  onTogglePlay,
}) => {
  const currentTrackId = useRecoilValue(currentTrackIdState);
  const track = useTrack(currentTrackId);
  const isPlaying = useRecoilValue(isPlayingState);

  if (!track) return null;

  return (
    <div
      className="overflow-hidden flex flex-col justify-between items-center w-full py-8"
      style={{ height: "100dvh" }}
    >
      <ChevronDownIcon
        className="h-6 w-6 self-end"
        role="button"
        onClick={onClose}
      />

      <div className="flex flex-col justify-between items-center gap-12">
        <div className="drop-shadow-md">
          <Cover
            alt={`${track.name} cover`}
            size="large"
            src={track.album.images[0].url}
          />
        </div>

        <div className="flex flex-col gap-4 w-full">
          <div className="flex justify-between items-center w-full">
            <div>
              <TrackLink track={track} />
              <ArtistLink artists={track.artists} />
            </div>

            <LikeButton track={track} />
          </div>

          <div className="flex flex-col">
            <Timer />
          </div>

          <div className="flex justify-center items-center gap-6 w-full">
            <SkipBackIcon
              className="h-6 w-6"
              role="button"
              onClick={onBackwardButtonClick}
            />
            {isPlaying ? (
              <PauseIcon
                className="h-8 w-8"
                role="button"
                onClick={onTogglePlay}
              />
            ) : (
              <PlayIcon
                className="h-8 w-8"
                role="button"
                onClick={onTogglePlay}
              />
            )}
            <SkipForwardIcon
              className="h-6 w-6"
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
