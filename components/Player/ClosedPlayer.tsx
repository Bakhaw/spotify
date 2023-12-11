import { useRecoilValue } from "recoil";
import { ChevronUpIcon } from "lucide-react";

import { currentTrackIdState } from "@/atoms/trackAtom";
import useTrack from "@/hooks/useTrack";

import Controls from "./Controls";
import CurrentTrack from "./CurrentTrack";
import Timer from "./Timer";
import Volume from "./Volume";

interface ClosedPlayerProps {
  onOpen: () => void;
}

const ClosedPlayer: React.FC<ClosedPlayerProps> = ({ onOpen }) => {
  const currentTrackId = useRecoilValue(currentTrackIdState);
  const track = useTrack(currentTrackId);

  return (
    <div className="flex justify-between items-center w-full">
      <div className="w-full">
        <CurrentTrack track={track} />
      </div>

      <div className="block md:hidden">
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

      <div className="hidden md:block w-full">
        <Volume />
      </div>
    </div>
  );
};

export default ClosedPlayer;
