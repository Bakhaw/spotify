import { create } from "zustand";

import { Queue, Track } from "@/types";

import spotifyApi from "@/lib/spotify";

type CurrentPlaybackState = {
  device: SpotifyApi.UserDevice | null;
  is_playing: boolean;
  item: Track;
  progress_ms: number | null;
};

interface PlayerStore {
  currentPlaybackState: CurrentPlaybackState | null;
  fetchPlaybackState: () => Promise<void>;
  fetchQueue: () => Promise<Queue | undefined>;
  setCurrentPlaybackState: (currentPlaybackState: CurrentPlaybackState) => void;
}

export const usePlayerStore = create<PlayerStore>()((set) => ({
  currentPlaybackState: null,
  fetchPlaybackState: async () => {
    const { body } = await spotifyApi.getMyCurrentPlaybackState();

    if (!body || !body.item) return;

    set({
      currentPlaybackState: {
        device: body.device,
        is_playing: body.is_playing,
        item: body.item,
        progress_ms: body.progress_ms,
      },
    });
  },
  fetchQueue: async () => {
    const res = await fetch(`/api/getQueue`);
    const queue = (await res.json()) as Queue | undefined;

    return queue;
  },
  setCurrentPlaybackState: (currentPlaybackState: CurrentPlaybackState) =>
    set({ currentPlaybackState }),
}));
