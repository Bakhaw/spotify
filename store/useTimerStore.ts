import { create } from "zustand";

interface TimerStore {
  progressMs: number | null;
  setProgressMs: (progressMs: number | null) => void;
  refetch: boolean; // used to know if the current playing track is approaching the end, so we need to update the currentPlaybackState with the next track
  setRefetch: (refetch: boolean) => void;
}

export const useTimerStore = create<TimerStore>()((set) => ({
  progressMs: 0,
  setProgressMs: (progressMs) => set({ progressMs }),
  refetch: false,
  setRefetch: (refetch) => set({ refetch }),
}));
