import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { useRecoilValue } from "recoil";

import { currentTrackIdState } from "@/atoms/trackAtom";

import useDominantColor from "@/hooks/useDominantColor";
import useTrack from "@/hooks/useTrack";
import generateRGBString from "@/lib/generateRGBString";
import isWhite from "@/lib/isWhite";

import ClosedPlayer from "./ClosedPlayer";
import OpenedPlayer from "./OpenedPlayer";

const Player: React.FC = () => {
  const pathname = usePathname();
  const currentTrackId = useRecoilValue(currentTrackIdState);
  const track = useTrack(currentTrackId);

  const [showFullPlayer, setShowFullPlayer] = useState(false);

  function openPlayer() {
    setShowFullPlayer(true);
  }

  function closePlayer() {
    setShowFullPlayer(false);
  }

  // player opened/closed handling
  useEffect(() => {
    closePlayer();
  }, [pathname]);

  const color = useDominantColor(track?.album.images[0].url);

  if (pathname === "/login" || pathname === "/studio") return null;

  return (
    <div
      className="fixed bottom-0 p-2 z-10 bg-transparent"
      style={{
        color: isWhite(color) ? "text-black" : "#fff",
        height: showFullPlayer ? "100vh" : "auto",
        transition: "0.3s",
        width: showFullPlayer ? "100%" : "calc(100% - 7px)",
        padding: showFullPlayer ? "0" : "0.5rem",
      }}
    >
      <div
        className="flex justify-center items-center h-full w-full  bg-gradient-secondary p-4 rounded"
        style={{
          backgroundColor: generateRGBString(color),
        }}
      >
        {showFullPlayer ? (
          <OpenedPlayer onClose={closePlayer} />
        ) : (
          <ClosedPlayer onOpen={openPlayer} />
        )}
      </div>
    </div>
  );
};

export default Player;
