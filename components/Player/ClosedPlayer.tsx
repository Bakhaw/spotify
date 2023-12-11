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
      <div>
        <CurrentTrack track={track} />
      </div>

      <ChevronUpIcon
        className="h-6 w-6 md:hidden transition-all	hover:scale-125"
        role="button"
        onClick={onOpen}
      />

      <div className="flex flex-col justify-center items-center">
        <div className="hidden md:block">
          <Controls />
        </div>

        <div className="hidden md:block">
          <Timer />
        </div>
      </div>

      <div className="hidden md:block">
        <Volume />
      </div>
    </div>
  );
};

export default ClosedPlayer;
