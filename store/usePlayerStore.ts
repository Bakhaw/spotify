import { create } from "zustand";

import { Queue } from "@/types";

import spotifyApi from "@/lib/spotify";

type CurrentPlaybackState = {
  device: SpotifyApi.UserDevice;
  is_playing: boolean;
  item: SpotifyApi.TrackObjectFull | SpotifyApi.EpisodeObject;
  progress_ms: number | null;
};

interface PlayerStore {
  currentPlaybackState: CurrentPlaybackState | null;
  fetchPlaybackState: () => Promise<void>;
  fetchNextTrack: () => void;
  setCurrentPlaybackState: (currentPlaybackState: CurrentPlaybackState) => void;
}

export const usePlayerStore = create<PlayerStore>()((set, get) => ({
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
  fetchNextTrack: async () => {
    const { currentPlaybackState } = get();

    if (!currentPlaybackState) return;

    const res = await fetch(`/api/getQueue`);
    const queue = (await res.json()) as Queue | undefined;

    if (!queue) return;

    const nextTrack = queue.queue[0];

    set({
      currentPlaybackState: {
        ...currentPlaybackState,
        item: nextTrack,
        is_playing: true,
        progress_ms: 0,
      },
    });
  },
  setCurrentPlaybackState: (currentPlaybackState: CurrentPlaybackState) =>
    set({ currentPlaybackState }),
}));
