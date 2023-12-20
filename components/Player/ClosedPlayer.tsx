import { ChevronUpIcon } from "lucide-react";

import { usePlayerContext } from "@/context/PlayerContext";

import useTrack from "@/hooks/useTrack";

import Controls from "./Controls";
import CurrentTrack from "./CurrentTrack";
import DeviceSelector from "./DeviceSelector";
import Timer from "./Timer";
import Volume from "./Volume";

interface ClosedPlayerProps {
  onOpen: () => void;
}

const ClosedPlayer: React.FC<ClosedPlayerProps> = ({ onOpen }) => {
  const { currentPlaybackState } = usePlayerContext();
  const track = useTrack(currentPlaybackState?.item?.id);

  return (
    <div className="w-full">
      <div className="flex items-center justify-between w-full p-2">
        <div className="w-full">
          <CurrentTrack track={track} />
        </div>

        <div className="block md:hidden pr-3">
          <ChevronUpIcon
            className="h-6 w-6 transition-all	hover:scale-125"
            role="button"
            onClick={onOpen}
          />
        </div>

        <div className="hidden md:flex w-full flex-grow flex-col justify-center items-center">
          <Controls />

          <Timer />
        </div>

        <div className="hidden md:flex justify-end items-center gap-2 w-full">
          <DeviceSelector />
          <Volume />
        </div>
      </div>
    </div>
  );
};

export default ClosedPlayer;
