"use client";

import { useState } from "react";
import { NextPage } from "next";
import { LightbulbIcon, LightbulbOffIcon } from "lucide-react";

import { usePlayerStore } from "@/store/usePlayerStore";

import useDominantColor from "@/hooks/useDominantColor";
import useTrack from "@/hooks/useTrack";
import generateRGBString from "@/lib/generateRGBString";

import Vinyl from "@/components/Vinyl";
import { Button } from "@/components/ui/button";

const Studio: NextPage = () => {
  const currentPlaybackState = usePlayerStore((s) => s.currentPlaybackState);
  const [useAlbumColor, setUseAlbumColor] = useState(true);

  const track = useTrack(currentPlaybackState?.item?.id);
  const color = useDominantColor(track?.album.images[0].url);

  return (
    <div
      className="flex flex-col justify-center items-center h-screen bg-gradient-secondary overflow-hidden"
      style={{
        backgroundColor: useAlbumColor ? generateRGBString(color) : "#000",
      }}
    >
      <Button
        className="border absolute top-4 right-8"
        onClick={() => setUseAlbumColor((useAlbumColor) => !useAlbumColor)}
        size="icon"
        variant="ghost"
      >
        {useAlbumColor ? <LightbulbIcon /> : <LightbulbOffIcon />}
      </Button>

      <Vinyl />
    </div>
  );
};

export default Studio;
