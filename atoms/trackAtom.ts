import { atom } from "recoil";

export const currentTrackIdState = atom<SpotifyApi.TrackObjectSimplified["id"]>(
  {
    key: "currentTrackIdState",
    default: "",
  }
);

export const isPlayingState = atom({
  key: "isPlayingState",
  default: false,
});
