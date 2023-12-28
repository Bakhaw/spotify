"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";

import { usePlayerStore } from "@/store/usePlayerStore";

import useDominantColor from "@/hooks/useDominantColor";
import useSpotify from "@/hooks/useSpotify";
import useTrack from "@/hooks/useTrack";

import generateRGBString from "@/lib/generateRGBString";
import isWhite from "@/lib/isWhite";

import ClosedPlayer from "./ClosedPlayer";
import OpenedPlayer from "./OpenedPlayer";

const Player: React.FC = () => {
  const spotifyApi = useSpotify();
  const { data: session } = useSession();
  const pathname = usePathname();
  const { currentPlaybackState, fetchPlaybackState } = usePlayerStore();
  const track = useTrack(currentPlaybackState?.item?.id);

  const [showFullPlayer, setShowFullPlayer] = useState(false);

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
      className="fixed bottom-0 px-2 pb-2 pt-0 z-10 bg-transparent backdrop-blur-sm"
      style={{
        color: isWhite(color) ? "text-black" : "#fff",
        height: showFullPlayer ? "100vh" : "auto",
        transition: "0.3s",
        width: showFullPlayer ? "100%" : "calc(100% - 7px)",
        padding: showFullPlayer ? "0" : "0 0.5rem 0.5rem 0.5rem",
      }}
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
