import { create } from "zustand";

import spotifyApi from "@/lib/spotify";

interface PlayerStore {
  currentPlaybackState: SpotifyApi.CurrentPlaybackResponse | null;
  fetchPlaybackState: () => Promise<void>;
  setCurrentPlaybackState: (
    currentPlaybackState: SpotifyApi.CurrentPlaybackResponse
  ) => void;
}

export const usePlayerStore = create<PlayerStore>()((set) => ({
  currentPlaybackState: null,
  fetchPlaybackState: async () => {
    console.log("fetch playback state");
    const { body } = await spotifyApi.getMyCurrentPlaybackState();

    if (!body || !body.item) return;

    set({ currentPlaybackState: body });
  },
  setCurrentPlaybackState: (
    currentPlaybackState: SpotifyApi.CurrentPlaybackResponse
  ) => set({ currentPlaybackState }),
}));
