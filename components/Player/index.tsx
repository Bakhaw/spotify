"use client";

import { useEffect } from "react";
import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";

import { usePlayerStore } from "@/store/usePlayerStore";

import useDominantColor from "@/hooks/useDominantColor";
import useSpotify from "@/hooks/useSpotify";
import useTrack from "@/hooks/useTrack";

import generateRGBString from "@/lib/generateRGBString";
import isWhite from "@/lib/isWhite";
import { cn } from "@/lib/utils";

import ClosedPlayer from "./ClosedPlayer";

const Player: React.FC = () => {
  const spotifyApi = useSpotify();
  const { data: session } = useSession();
  const pathname = usePathname();

  const { currentPlaybackState, fetchPlaybackState } = usePlayerStore();

  const track = useTrack(currentPlaybackState?.item?.id);

  // initalize player
  useEffect(() => {
    if (!spotifyApi.getAccessToken()) return;

    fetchPlaybackState();
  }, [spotifyApi, session, fetchPlaybackState]);

  const dominantColor = useDominantColor(track?.album.images[0].url);
  const backgroundColor = generateRGBString(dominantColor);
  const isWhiteBg = isWhite(dominantColor);

  if (pathname === "/login" || pathname === "/studio" || !currentPlaybackState)
    return null;

  return (
    <div
      className={cn(
        "fixed w-full px-2 pb-2 pt-0 z-10 bg-transparent text-white",
        currentPlaybackState ? "bottom-20 sm:bottom-0" : "bottom-0"
      )}
    >
      <div
        className="flex justify-center items-center h-full w-full bg-gradient-secondary rounded p-1"
        style={{
          backgroundColor,
        }}
      >
        <ClosedPlayer />
      </div>
    </div>
  );
};

export default Player;
