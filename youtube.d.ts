// youtube.d.ts

declare namespace YT {
  interface Player {
    playVideo(): void;
    stopVideo(): void;
    pauseVideo(): void;
    seekTo(timestamp: number): void; // timestamp is in seconds
    setVolume(volume: number): void;

    playerInfo: {
      currentTime: number;
      volume: number;
    };
  }

  interface PlayerEvent {
    target: Player;
  }

  enum PlayerState {
    PLAYING = 1,
  }
}
