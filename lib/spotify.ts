"use client";

import SpotifyWebApi from "spotify-web-api-node";

import config from "./config";

const spotifyApi = new SpotifyWebApi({
  clientId: config.clientId,
  clientSecret: config.clientSecret,
});

export default spotifyApi;
