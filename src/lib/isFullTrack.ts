function isFullTrack(
  track: SpotifyApi.TrackObjectFull | SpotifyApi.TrackObjectSimplified
): track is SpotifyApi.TrackObjectFull {
  return Boolean((track as SpotifyApi.TrackObjectFull).album);
}

export default isFullTrack;
