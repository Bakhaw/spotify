import { useRecoilValue } from "recoil";
import { ChevronUpIcon, Volume1Icon, Volume2Icon } from "lucide-react";
import { FaCirclePlay, FaCirclePause } from "react-icons/fa6";
import { IoPlaySkipBack, IoPlaySkipForward } from "react-icons/io5";

import { currentTrackIdState, isPlayingState } from "@/atoms/trackAtom";
import useTrack from "@/hooks/useTrack";

import ArtistLink from "@/components/ArtistLink";
import Cover from "@/components/Cover";
import Draggable from "@/components/Draggable";
import TrackLink from "@/components/TrackLink";

import { PlayerProps } from ".";
import Timer from "./Timer";

interface ClosedPlayerProps extends PlayerProps {
  onOpen: () => void;
}

const ClosedPlayer: React.FC<ClosedPlayerProps> = ({
  onBackwardButtonClick,
  onForwardButtonClick,
  onOpen,
  onTogglePlay,
}) => {
  const currentTrackId = useRecoilValue(currentTrackIdState);
  const isPlaying = useRecoilValue(isPlayingState);
  const track = useTrack(currentTrackId);

  // if (!track) return null;

  return (
    <div className="flex justify-between items-center w-full">
      <div className="flex-1">
        {track && (
          <Draggable id={`closed_player:${track.id}`}>
            <div className="flex flex-1 justify-start items-center gap-3 h-full">
              <div className="w-[48px]">
                <Cover
                  alt={`${track.name} cover`}
                  size="full"
                  src={track.album.images[0].url}
                />
              </div>

              <div className="display-arrowicon max-w-[50vw] md:max-w-[30vw]">
                <div className="font-bold flex gap-3 transition-all hover:scale-110 sm:font-normal">
                  <TrackLink track={track} />
                </div>
                <div className="transition-all hover:scale-110 text-span text-xs">
                  <ArtistLink artists={track.artists} />
                </div>
              </div>
            </div>
          </Draggable>
        )}
      </div>

      <ChevronUpIcon
        className="h-6 w-6 md:hidden transition-all	hover:scale-125"
        role="button"
        onClick={onOpen}
      />

      <div className="w-full flex flex-col items-center">
        <div className="hidden md:flex flex-1 justify-center items-center gap-4 h-full">
          <IoPlaySkipBack
            className="h-6 w-6 transition-all	hover:scale-110"
            role="button"
            onClick={onBackwardButtonClick}
          />
          {isPlaying ? (
            <FaCirclePause
              className="h-9 w-9 transition-all	hover:scale-110"
              onClick={onTogglePlay}
              role="button"
            />
          ) : (
            <FaCirclePlay
              className="h-9 w-9 transition-all	hover:scale-110"
              onClick={onTogglePlay}
              role="button"
            />
          )}
          <IoPlaySkipForward
            className="h-6 w-6 transition-all	hover:scale-110"
            role="button"
            onClick={onForwardButtonClick}
          />
        </div>

        <div className="hidden md:block">
          <Timer />
        </div>
      </div>

      <div className="hidden md:flex flex-1 justify-end items-center gap-3 h-full">
        <Volume1Icon
          className="h-6 w-6 transition-all	hover:scale-110"
          role="button"
        />
        <input
          aria-label="Adjust the volume"
          disabled
          min={0}
          max={100}
          // value={volume}
          type="range"
          // onChange={onVolumeChange}
        />
        <Volume2Icon
          className="h-6 w-6 transition-all	hover:scale-110"
          role="button"
        />
      </div>
    </div>
  );
};

export default ClosedPlayer;
