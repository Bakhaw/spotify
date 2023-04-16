import SpotifyWebApi from "spotify-web-api-node";

export interface Playlist
  extends Omit<SpotifyApi.PlaylistObjectFull, "tracks"> {
  tracks: SpotifyApi.PagingObject<SpotifyApi.TrackObjectFull | null>;
}

export async function fetchPlaylist(
  spotifyApi: SpotifyWebApi,
  playlistId: string
): Promise<Playlist> {
  const { body: playlist } = await spotifyApi.getPlaylist(playlistId);

  const formattedPlaylist = {
    ...playlist,
    tracks: {
      ...playlist.tracks,
      items: playlist.tracks.items.map((item) => item.track),
    },
  };

  return formattedPlaylist;
}
