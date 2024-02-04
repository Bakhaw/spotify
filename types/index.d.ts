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

// Youtube Music API (ytmuci-api)
export type YTMusicSongDetailed = {
  type: "SONG";
  videoId: string;
  name: string;
  artist: {
    artistId: string | null;
    name: string;
  };
  album: {
    albumId: string;
    name: string;
  } | null;
  duration: number | null;
  thumbnails: {
    url: string;
    width: number;
    height: number;
  }[];
};

export type YTMusicSearchResult =
  | {
      type: "SONG";
      videoId: string;
      name: string;
      artist: {
        artistId: string | null;
        name: string;
      };
      album: {
        albumId: string;
        name: string;
      } | null;
      duration: number | null;
      thumbnails: {
        url: string;
        width: number;
        height: number;
      }[];
    }
  | {
      type: "VIDEO";
      videoId: string;
      name: string;
      artist: {
        artistId: string | null;
        name: string;
      };
      duration: number | null;
      thumbnails: {
        url: string;
        width: number;
        height: number;
      }[];
    }
  | {
      artistId: string;
      name: string;
      type: "ARTIST";
      thumbnails: {
        url: string;
        width: number;
        height: number;
      }[];
    }
  | {
      type: "ALBUM";
      albumId: string;
      playlistId: string;
      name: string;
      artist: {
        artistId: string | null;
        name: string;
      };
      year: number | null;
      thumbnails: {
        url: string;
        width: number;
        height: number;
      }[];
    }
  | {
      type: "PLAYLIST";
      playlistId: string;
      name: string;
      artist: {
        artistId: string | null;
        name: string;
      };
      thumbnails: {
        url: string;
        width: number;
        height: number;
      }[];
    };
