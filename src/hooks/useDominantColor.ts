"use client";

import { useState, useEffect } from "react";
import ColorThief from "colorthief";

function useDominantColor(
  album?: SpotifyApi.AlbumObjectFull | SpotifyApi.AlbumObjectSimplified
) {
  const [dominantColors, setDominantColors] = useState<string[]>([]);
  useEffect(() => {
    if (!album) return;
    const image = new Image();
    image.crossOrigin = "Anonymous";
    image.src = album.images[0].url;

    image.onload = () => {
      const colorThief = new ColorThief();
      const colorPalette = colorThief.getColor(image);

      // Mettez à jour l'état avec la palette de couleurs
      setDominantColors(colorPalette);
    };
  }, [album]);
  return dominantColors;
}

export default useDominantColor;
