import { atom } from "recoil";

export const playlistState = atom<SpotifyApi.PlaylistBaseObject[]>({
  key: "playlistState",
  default: [],
});

export const playlistIdState = atom({
  key: "playlistIdState",
  default: null,
});
