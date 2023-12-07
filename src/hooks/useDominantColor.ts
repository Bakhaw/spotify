"use client";

import { useState, useEffect } from "react";
import ColorThief, { Color } from "colorthief";

function useDominantColor(
  album?: SpotifyApi.AlbumObjectFull | SpotifyApi.AlbumObjectSimplified
) {
  const [dominantColors, setDominantColors] = useState<Color>([0, 0, 0]);

  useEffect(() => {
    if (!album) return;
    const image = new Image();
    image.crossOrigin = "Anonymous";
    image.src = album.images[0].url;

    image.onload = () => {
      const colorThief = new ColorThief();
      const colorPalette = colorThief.getColor(image);

      setDominantColors(colorPalette);
    };
  }, [album]);

  return dominantColors;
}

export default useDominantColor;
