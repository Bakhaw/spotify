export type TimeRange = "short_term" | "medium_term" | "long_term";

export type Queue = {
  currentlyPlaying: SpotifyApi.TrackObjectFull;
  queue: SpotifyApi.TrackObjectFull[];
};

export type Track =
  | SpotifyApi.TrackObjectFull
  | SpotifyApi.TrackObjectSimplified
  | SpotifyApi.EpisodeObject;

export type SearchProvider = "spotify" | "youtube";

export type SearchYoutubeResponseObject = {
  etag: string;
  id: {
    kind: string;
    videoId: string;
  };
  kind: string;
  snippet: {
    channelId: string;
    channelTitle: string;
    description: string;
    liveBroadcastContent: string;
    publishTime: string;
    publishedAt: string;
    thumbnails: {
      default: {
        height: number;
        url: string;
        width: number;
      };
      medium: {
        height: number;
        url: string;
        width: number;
      };
      high: {
        height: number;
        url: string;
        width: number;
      };
    };
    title: string;
  };
};

export type SearchYoutubeResponse = {
  etag: string;
  items: SearchYoutubeResponseObject[];
  kind: string;
  nextPageToken: string;
  pageInfo: {
    totalResults: number;
    resultsPerPage: number;
  };
  regionCode: string;
};
