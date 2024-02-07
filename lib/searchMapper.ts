import { FullTrack, TrackOrigin, YTMusicSearchResponse } from "@/types";

function searchMapper(searchYoutubeResponse: YTMusicSearchResponse) {
  const formattedSearchResponse: FullTrack[] = searchYoutubeResponse.map(
    (item, index: number) => ({
      origin: TrackOrigin.YOUTUBE,
      disc_number: 0,
      duration_ms: item.duration ? item.duration * 1000 : 0,
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
      id: item.videoId,
      name: item.name,
      album: {
        artists: [
          {
            id: item.artist.artistId ?? "",
            name: item.artist.name,
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
        id: "album" in item && item.album?.albumId,
        name: "album" in item && item.album?.name,
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
            url: item.thumbnails[0].url,
            height: item.thumbnails[0].height,
            width: item.thumbnails[0].width,
          },
        ],
      },
      artists: [
        {
          id: item.artist.artistId ?? "",
          name: item.artist.name,
          external_urls: {
            spotify: "",
          },
          href: "",
          type: "artist",
          uri: "",
        },
      ],
    })
  );

  return formattedSearchResponse;
}

export default searchMapper;
