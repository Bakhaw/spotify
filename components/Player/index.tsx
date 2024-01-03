"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";

import { usePlayerStore } from "@/store/usePlayerStore";

import useDominantColor from "@/hooks/useDominantColor";
import useSpotify from "@/hooks/useSpotify";
import useTrack from "@/hooks/useTrack";

import { cn } from "@/lib/utils";
import generateRGBString from "@/lib/generateRGBString";
import isWhite from "@/lib/isWhite";

import ClosedPlayer from "./ClosedPlayer";
import OpenedPlayer from "./OpenedPlayer";

const Player: React.FC = () => {
  const spotifyApi = useSpotify();
  const { data: session } = useSession();
  const pathname = usePathname();

  const { currentPlaybackState, fetchPlaybackState } = usePlayerStore();

  const [showFullPlayer, setShowFullPlayer] = useState(false);

  const track = useTrack(currentPlaybackState?.item?.id);

  function openPlayer() {
    setShowFullPlayer(true);
  }

  function closePlayer() {
    setShowFullPlayer(false);
  }

  // initalize player
  useEffect(() => {
    if (!spotifyApi.getAccessToken()) return;

    fetchPlaybackState();
  }, [spotifyApi, session, fetchPlaybackState]);

  // close the OpenedPlayer on route change
  useEffect(() => {
    closePlayer();
  }, [pathname]);

  const color = useDominantColor(track?.album.images[0].url);

  if (pathname === "/login" || pathname === "/studio" || !track) return null;

  return (
    <div
      className={cn(
        "fixed w-full px-2 pb-2 pt-0 z-10 bg-transparent backdrop-blur-sm",
        showFullPlayer ? "bottom-0" : "bottom-[60px] sm:bottom-0",
        isWhite(color) ? "text-black" : "text-white"
      )}
    >
      <div
        className="flex justify-center items-center h-full w-full bg-gradient-secondary rounded"
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
