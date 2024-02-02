"use client";

import { usePlayerStore } from "@/store/usePlayerStore";
import React, { useEffect, useRef } from "react";

declare global {
  interface Window {
    onYouTubeIframeAPIReady?: (videoId: string) => void;
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
  const playerRef = useRef<YT.Player | null>(null);
  const currentPlaybackState = usePlayerStore((s) => s.currentPlaybackState);

  const initializeYouTubePlayer = () => {
    const videoId = currentPlaybackState?.item.id;

    console.log("here", videoId);

    if (!videoId) return;

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

  let done = false;

  const onPlayerStateChange: (event: { data: number }) => void = (event) => {
    // Callback when the player's state changes
    if (
      playerRef.current &&
      event.data === window.YT.PlayerState.PLAYING &&
      !done
    ) {
      setTimeout(stopVideo, 6000);
      done = true;
    }
  };

  useEffect(() => {
    const loadYouTubeScript = () => {
      const tag = document.createElement("script");
      tag.src = "https://www.youtube.com/iframe_api";
      const firstScriptTag = document.getElementsByTagName("script")[0];
      firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag);
    };

    if (!window.YT || !window.YT.Player) {
      // If the YouTube API is not available, load the script and wait for it to be ready
      window.onYouTubeIframeAPIReady = initializeYouTubePlayer;
      loadYouTubeScript();
    } else {
      initializeYouTubePlayer();
    }

    // Clean up function to remove global event listener when component unmounts
    return () => {
      window.onYouTubeIframeAPIReady = undefined;
    };
  }, [currentPlaybackState?.item.id]);

  const playVideo = () => {
    playerRef.current?.playVideo();
  };

  const stopVideo = () => {
    playerRef.current?.stopVideo();
  };

  return (
    <div>
      {/* The <iframe> (and video player) will replace this <div> tag. */}
      <div id="player"></div>
      <button onClick={stopVideo}>PAUSE</button>
      <br />
      <button onClick={playVideo}>PLAY</button>
    </div>
  );
};

export default YouTubePlayer;
