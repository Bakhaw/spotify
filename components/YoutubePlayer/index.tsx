"use client";

import React, { useEffect } from "react";
import { useSearchParams } from "next/navigation";

import { SearchProvider } from "@/types";

import { usePlayerStore } from "@/store/usePlayerStore";
import { useTimerStore } from "@/store/useTimerStore";
import { useYTPlayerStore } from "@/store/useYTPlayerStore";

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
  const setPlayer = useYTPlayerStore((s) => s.setPlayer);
  const setProgressMs = useTimerStore((s) => s.setProgressMs);

  const videoId = currentPlaybackState?.item.id;

  const initializeYouTubePlayer = () => {
    if (provider !== "youtube" || !videoId) return;

    if (window.YT) {
      new window.YT.Player("player", {
        height: "48",
        width: "48",
        videoId,
        events: {
          onReady: onPlayerReady,
          onStateChange: onPlayerStateChange,
        },
      });
    }
  };

  const onPlayerReady: (event: YT.PlayerEvent) => void = (event) => {
    setPlayer(event.target);
  };

  const onPlayerStateChange = (event: { data: number; target: YT.Player }) => {
    if (!currentPlaybackState) return;

    const playerVolume = event.target.playerInfo.volume;

    setCurrentPlaybackState({
      ...currentPlaybackState,
      ...(playerVolume && {
        device: {
          id: "",
          is_active: true,
          is_private_session: false,
          is_restricted: false,
          name: "",
          type: "",
          volume_percent: playerVolume,
        },
      }),
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

  const iframeParams = "?enablejsapi=1&autoplay=1&controls=2&disablekb=1&rel=1";
  const iframeSrc = `https://www.youtube.com/embed/${currentPlaybackState.item.id}${iframeParams}`;

  return (
    <iframe
      id="player"
      className="hidden"
      allow="autoplay"
      allowFullScreen
      src={iframeSrc}
      height="48"
      width="48"
    />
  );
};

export default YouTubePlayer;
