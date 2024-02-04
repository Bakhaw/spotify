declare namespace YT {
  interface Player {
    playVideo(): void;
    stopVideo(): void;
    pauseVideo(): void;
    seekTo(ms: number): void;

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
    PAUSE = 2,
    STOP = 3,
  }
}
