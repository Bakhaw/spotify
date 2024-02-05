"use client";

import { useState } from "react";
import { NextPage } from "next";
import { LightbulbIcon, LightbulbOffIcon } from "lucide-react";
import { SlSizeFullscreen } from "react-icons/sl";
import { MdCloseFullscreen } from "react-icons/md";

import { usePlayerStore } from "@/store/usePlayerStore";

import useDominantColor from "@/hooks/useDominantColor";
import useTrack from "@/hooks/useTrack";
import generateRGBString from "@/lib/generateRGBString";

import Vinyl from "@/components/Vinyl";
import { Button } from "@/components/ui/button";

const Studio: NextPage = () => {
  const currentPlaybackState = usePlayerStore((s) => s.currentPlaybackState);
  const [useAlbumColor, setUseAlbumColor] = useState(true);
  const [isFullScreen, setIsFullScreen] = useState<boolean>(false);

  const track = useTrack(currentPlaybackState?.item?.id);
  const dominantColor = useDominantColor(track?.album.images[0].url);
  const backgroundColor = useAlbumColor
    ? generateRGBString(dominantColor)
    : "#000";

  const handleFullscreenToggle = () => {
    const element = document.documentElement;

    const requestFullscreenMethod = element.requestFullscreen;

    if (document.fullscreenElement) {
      document.exitFullscreen();
      setIsFullScreen(false);
    } else if (requestFullscreenMethod) {
      requestFullscreenMethod.call(element);
      setIsFullScreen(true);
    }
  };

  return (
    <div
      className="flex flex-col justify-center items-center h-screen bg-gradient-secondary overflow-hidden"
      style={{
        backgroundColor,
      }}
    >
      <Button
        className="z-50 border absolute top-4 right-8 transition-all hover:scale-110"
        onClick={() => setUseAlbumColor((useAlbumColor) => !useAlbumColor)}
        size="icon"
        variant="ghost"
      >
        {useAlbumColor ? <LightbulbIcon /> : <LightbulbOffIcon />}
      </Button>
      {/* // FULL SCREEN */}
      <Button
        className="z-50 border absolute top-4 right-20 transition-all hover:scale-110"
        onClick={handleFullscreenToggle}
        size="icon"
        variant="ghost"
      >
        {isFullScreen ? <MdCloseFullscreen /> : <SlSizeFullscreen />}
      </Button>

      <Vinyl />
    </div>
  );
};

export default Studio;
