import SpotifyWebApi from "spotify-web-api-node";

import config from "./config";
import generateRandomString from "./generateRandomString";

const spotifyApi = new SpotifyWebApi({
  clientId: config.clientId,
  clientSecret: config.clientSecret,
});

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
];

export const params = {
  scopes,
  state: generateRandomString(100),
};

export default spotifyApi;
