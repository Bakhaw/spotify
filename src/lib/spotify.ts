import SpotifyWebApi from "spotify-web-api-node";

import config from "./config";
import generateRandomString from "./generateRandomString";

const scopes = [
  // playlist
  "playlist-read-private",
  "playlist-modify-public",
  "playlist-modify-private",

  // user
  "user-modify-playback-state",
  "user-library-modify",
  "user-library-read",
  "user-read-recently-played",
  "user-read-currently-playing",
  "user-read-playback-state",
  "user-top-read",
  "user-follow-read",

  // other
  "streaming",
];

export const params = {
  scopes,
  state: generateRandomString(100),
};

const spotifyApi = new SpotifyWebApi({
  clientId: config.clientId,
  clientSecret: config.clientSecret,
});

export default spotifyApi;
