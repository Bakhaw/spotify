import SpotifyWebApi from "spotify-web-api-node";

import config from "./config";

const scopes = [
  "playlist-read-private",
  "user-modify-playback-state",
  "user-library-modify",
  "user-library-read",
  "user-read-recently-played",
  "user-read-currently-playing",
  "user-read-playback-state",
  "user-top-read",
  "user-follow-read",
  "streaming",
].join(",");

const params = {
  scopes,
};

const queryParamString = new URLSearchParams(params).toString();

export const LOGIN_URL = `https://accounts.spotify.com/authorize?${queryParamString}`;

const spotifyApi = new SpotifyWebApi({
  clientId: config.clientId,
  clientSecret: config.clientSecret,
  redirectUri: config.redirectUri,
});

export default spotifyApi;
