"use client";

import React, { useEffect, useRef } from "react";
import { useSearchParams } from "next/navigation";

import { SearchProvider } from "@/types";

import { usePlayerStore } from "@/store/usePlayerStore";

import { Button } from "../ui/button";

declare global {
  interface Window {
    onYouTubeIframeAPIReady?: () => void;
    YT: {
      Player: new (
        container: string | HTMLDivElement,
        options: {
          height: string;
          width: string;
          videoId: string;
          events: {
            onReady: (event: YT.PlayerEvent) => void;
            onStateChange: (event: { data: number }) => void;
          };
        }
      ) => YT.Player;
      PlayerState: {
        PLAYING: number;
      };
    };
  }
}

const YouTubePlayer: React.FC = () => {
  const { currentPlaybackState, setCurrentPlaybackState } = usePlayerStore();
  const searchParams = useSearchParams();
  const provider = searchParams.get("provider") as SearchProvider;

  const playerRef = useRef<YT.Player | null>(null);

  const initializeYouTubePlayer = () => {
    const videoId = currentPlaybackState?.item.id;

    if (provider !== "youtube" || !videoId) return;

    playerRef.current = new window.YT.Player("player", {
      height: "360",
      width: "640",
      videoId,
      events: {
        onReady: onPlayerReady,
        onStateChange: onPlayerStateChange,
      },
    });
  };

  const onPlayerReady: (event: YT.PlayerEvent) => void = (event) => {
    // Callback when the video player is ready
    if (playerRef.current) {
      event.target.playVideo();
    }
  };

  const onPlayerStateChange: (event: { data: number }) => void = (event) => {
    // Callback when the player's state changes
    console.log("onPlayerStateChange");
  };

  useEffect(() => {
    const loadYouTubeScript = () => {
      const tag = document.createElement("script");
      tag.src = "https://www.youtube.com/iframe_api";
      const firstScriptTag = document.getElementsByTagName("script")[0];
      firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag);
    };

    window.onYouTubeIframeAPIReady = initializeYouTubePlayer;
    loadYouTubeScript();

    // Clean up function to remove global event listener when component unmounts
    return () => {
      window.onYouTubeIframeAPIReady = undefined;
    };
  }, []);

  useEffect(() => {
    if (!currentPlaybackState) return;

    initializeYouTubePlayer();
  }, [currentPlaybackState?.item.id]);

  const playVideo = () => {
    if (!currentPlaybackState || !playerRef.current) return;

    setCurrentPlaybackState({
      ...currentPlaybackState,
      is_playing: true,
    });

    playerRef.current.playVideo();
  };

  const pauseVideo = () => {
    if (!currentPlaybackState || !playerRef.current) return;

    setCurrentPlaybackState({
      ...currentPlaybackState,
      is_playing: false,
    });

    playerRef.current.pauseVideo();
  };

  const stopVideo = () => {
    if (!currentPlaybackState || !playerRef.current) return;

    setCurrentPlaybackState({
      ...currentPlaybackState,
      is_playing: false,
    });

    playerRef.current.stopVideo();
  };

  if (!currentPlaybackState) return null;

  return (
    <div>
      <iframe
        id="player"
        width="640"
        height="360"
        src={`http://www.youtube.com/embed/${currentPlaybackState.item.id}?enablejsapi=1`}
      />

      <div>{currentPlaybackState.item.id}</div>
      <div>{currentPlaybackState.item.name}</div>

      <Button onClick={pauseVideo}>PAUSE</Button>
      <Button onClick={playVideo}>PLAY</Button>
      <Button onClick={stopVideo}>STOP</Button>
    </div>
  );
};

export default YouTubePlayer;
