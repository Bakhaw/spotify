import { ChevronDownIcon } from "lucide-react";

import { usePlayerStore } from "@/store/usePlayerStore";

import useTrack from "@/hooks/useTrack";

import ArtistLink from "@/components/ArtistLink";
import Cover from "@/components/Cover";
import LikeButton from "@/components/LikeButton";
import TrackLink from "@/components/TrackLink";

import Controls from "./Controls";
import Timer from "./Timer";

interface OpenedPlayer {
  onClose?: () => void;
}

const OpenedPlayer: React.FC<OpenedPlayer> = ({ onClose }) => {
  const currentPlaybackState = usePlayerStore((s) => s.currentPlaybackState);
  const track = useTrack(currentPlaybackState?.item?.id);

  if (!track) return null;

  return (
    <div
      className="overflow-hidden flex flex-col justify-between items-center w-full p-5"
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

          <Controls />
        </div>
      </div>

      <div></div>
    </div>
  );
};

export default OpenedPlayer;
