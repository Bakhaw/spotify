"use client";

import React, { useEffect, useRef } from "react";
import { useSearchParams } from "next/navigation";

import { SearchProvider } from "@/types";

import { usePlayerStore } from "@/store/usePlayerStore";

import Timer from "@/components/Player/Timer";

import { Button } from "../ui/button";
import { useTimerStore } from "@/store/useTimerStore";

declare global {
  interface Window {
    onYouTubeIframeAPIReady?: () => void;
    YT: {
      Player: new (
        container: string | HTMLDivElement,
        options: {
          events: {
            onReady: (event: YT.PlayerEvent) => void;
            onStateChange: (event: {
              data: number;
              target: YT.PlayerEvent["target"];
            }) => void;
          };
          height: string;
          videoId: string;
          width: string;
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
  const setProgressMs = useTimerStore((s) => s.setProgressMs);
  const searchParams = useSearchParams();
  const provider = searchParams.get("provider") as SearchProvider;

  const playerRef = useRef<YT.Player | null>(null);
  const videoId = currentPlaybackState?.item.id;

  const onPlayerReady: (event: YT.PlayerEvent) => void = (event) => {
    playerRef.current = event.target;
    setProgressMs(0);
  };

  const initializeYouTubePlayer = () => {
    if (provider !== "youtube" || !videoId) return;

    new window.YT.Player("player", {
      height: "360",
      width: "640",
      videoId,
      events: {
        onReady: onPlayerReady,
        onStateChange: onPlayerStateChange,
      },
    });
  };

  const onPlayerStateChange = (event: { data: number; target: YT.Player }) => {
    if (!currentPlaybackState) return;

    setProgressMs(event.target.playerInfo.currentTime * 1000);
    setCurrentPlaybackState({
      ...currentPlaybackState,
      is_playing: event.data === YT.PlayerState.PLAYING, // if 1 (means "play" action) then it's true, otheriwse it's false
    });
  };

  useEffect(() => {
    const loadYouTubeScript = () => {
      const tag = document.createElement("script");
      tag.src = "https://www.youtube.com/iframe_api";
      const firstScriptTag = document.getElementsByTagName("script")[0];
      firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag);
    };

    loadYouTubeScript();
    window.onYouTubeIframeAPIReady = initializeYouTubePlayer;

    // Clean up function to remove global event listener when component unmounts
    return () => {
      window.onYouTubeIframeAPIReady = undefined;
    };
  }, []);

  useEffect(() => {
    if (!currentPlaybackState || !videoId) return;

    initializeYouTubePlayer();
  }, [currentPlaybackState, videoId, provider]);

  if (!currentPlaybackState) return null;

  const playVideo = () => {
    if (!playerRef.current) return;

    setCurrentPlaybackState({
      ...currentPlaybackState,
      is_playing: true,
    });

    playerRef.current.playVideo();
  };

  const pauseVideo = () => {
    if (!playerRef.current) return;

    setCurrentPlaybackState({
      ...currentPlaybackState,
      is_playing: false,
    });

    playerRef.current.pauseVideo();
  };

  const stopVideo = () => {
    if (!playerRef.current) return;

    setProgressMs(0);

    setCurrentPlaybackState({
      ...currentPlaybackState,
      is_playing: false,
      progress_ms: 0,
    });

    playerRef.current.stopVideo();
  };

  const onProgressChange = (newPos: number) => {
    // we divide by 1000 because the seekTo function parameter needs to be in seconds
    // BUT we receive the newPos in milliseconds
    playerRef.current?.seekTo(newPos / 1000);
  };

  const iframeParams = "?enablejsapi=1&autoplay=1&controls=2&disablekb=1&rel=1";
  const iframeSrc = `https://www.youtube.com/embed/${currentPlaybackState.item.id}${iframeParams}`;

  return (
    <div>
      <iframe
        id="player"
        allow="autoplay"
        allowFullScreen
        src={iframeSrc}
        height="360"
        width="640"
      />

      <Button onClick={pauseVideo}>PAUSE</Button>
      <Button onClick={playVideo}>PLAY</Button>
      <Button onClick={stopVideo}>STOP</Button>
      <Timer onProgressChange={onProgressChange} />

      <p>Volume: {playerRef.current?.playerInfo.volume}</p>
    </div>
  );
};

export default YouTubePlayer;
