import { SearchYoutubeResponseObject } from "@/types";

function searchMapper(
  searchYoutubeResponse: SearchYoutubeResponseObject[]
): SpotifyApi.TrackObjectFull[] {
  const formattedSearchResponse: SpotifyApi.TrackObjectFull[] =
    searchYoutubeResponse.map((item, index: number) => ({
      disc_number: 0,
      duration_ms: 0,
      explicit: false,
      external_ids: {},
      external_urls: {
        spotify: "",
      },
      href: "",
      popularity: 0,
      preview_url: null,
      track_number: 0,
      type: "track",
      uri: "",
      id: item.id.videoId,
      name: item.snippet.title,
      album: {
        artists: [
          {
            id: index.toString(),
            name: item.snippet.channelTitle,
            external_urls: {
              spotify: "",
            },
            href: "",
            type: "artist",
            uri: "",
          },
        ],
        album_type: "album",
        href: "",
        id: "",
        name: "",
        release_date: "",
        release_date_precision: "day",
        total_tracks: 1,
        type: "album",
        uri: "",
        external_urls: {
          spotify: "",
        },
        images: [
          {
            // url: "http://localhost:3000/_next/image?url=https%3A%2F%2Fi.scdn.co%2Fimage%2Fab6761610000e5ebd72e35d806567888976a24db&w=1920&q=75",
            url: item.snippet.thumbnails.high.url,
            height: item.snippet.thumbnails.high.height,
            width: item.snippet.thumbnails.high.width,
          },
        ],
      },
      artists: [
        {
          id: index.toString(),
          name: item.snippet.channelTitle,
          external_urls: {
            spotify: "",
          },
          href: "",
          type: "artist",
          uri: "",
        },
      ],
    }));

  return formattedSearchResponse;
}

export default searchMapper;
