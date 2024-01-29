// youtube.d.ts

declare namespace YT {
  interface Player {
    playVideo(): void;
    stopVideo(): void;
    pauseVideo(): void;
  }

  interface PlayerEvent {
    target: Player;
  }

  enum PlayerState {
    PLAYING = 1,
  }
}
