import { create } from "zustand";

interface TimerStore {
  progressMs: number;
  setProgressMs: (progressMs: number) => void;
}

export const useTimerStore = create<TimerStore>()((set) => ({
  progressMs: 0,
  setProgressMs: (progressMs) => set({ progressMs }),
}));
