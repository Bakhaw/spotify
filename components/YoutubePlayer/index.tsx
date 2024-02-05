"use client";

import React, { useEffect, useRef } from "react";
import { useSearchParams } from "next/navigation";

import { SearchProvider } from "@/types";

import { usePlayerStore } from "@/store/usePlayerStore";
import { useTimerStore } from "@/store/useTimerStore";
import { useYTPlayerStore } from "@/store/useYTPlayerStore";

import Timer from "@/components/Player/Timer";

import { Button } from "../ui/button";

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
  const searchParams = useSearchParams();
  const provider = searchParams.get("provider") as SearchProvider;

  const { currentPlaybackState, setCurrentPlaybackState } = usePlayerStore();
  const { player, setPlayer } = useYTPlayerStore();
  const setProgressMs = useTimerStore((s) => s.setProgressMs);

  const videoId = currentPlaybackState?.item.id;

  const onPlayerReady: (event: YT.PlayerEvent) => void = (event) => {
    setPlayer(event.target);
  };

  const initializeYouTubePlayer = () => {
    if (provider !== "youtube" || !videoId) return;

    if (window.YT) {
      new window.YT.Player("player", {
        height: "360",
        width: "640",
        videoId,
        events: {
          onReady: onPlayerReady,
          onStateChange: onPlayerStateChange,
        },
      });
    }
  };

  const onPlayerStateChange = (event: { data: number; target: YT.Player }) => {
    if (!currentPlaybackState) return;

    setCurrentPlaybackState({
      ...currentPlaybackState,
      is_playing: event.data === YT.PlayerState.PLAYING, // if 1 (means "play" action) then it's true, otheriwse it's false
    });

    setProgressMs(event.target.playerInfo.currentTime * 1000);
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
    if (!player) return;

    setCurrentPlaybackState({
      ...currentPlaybackState,
      is_playing: true,
    });

    player.playVideo();
  };

  const pauseVideo = () => {
    if (!player) return;

    setCurrentPlaybackState({
      ...currentPlaybackState,
      is_playing: false,
    });

    player.pauseVideo();
  };

  const stopVideo = () => {
    if (!player) return;

    setProgressMs(0);

    setCurrentPlaybackState({
      ...currentPlaybackState,
      is_playing: false,
      progress_ms: 0,
    });

    player.stopVideo();
  };

  const onProgressChange = (newPos: number) => {
    // we divide by 1000 because the seekTo function parameter needs to be in seconds
    // BUT we receive the newPos in milliseconds
    player?.seekTo(newPos / 1000);
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

      <p>Volume: {player?.playerInfo.volume}</p>
    </div>
  );
};

export default YouTubePlayer;
