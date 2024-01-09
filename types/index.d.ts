export type TimeRange = "short_term" | "medium_term" | "long_term";

export type Queue = {
  currentlyPlaying: SpotifyApi.TrackObjectFull;
  queue: SpotifyApi.TrackObjectFull[];
};

export type Track = SpotifyApi.TrackObjectFull;
