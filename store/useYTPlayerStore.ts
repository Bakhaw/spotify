import { create } from "zustand";

interface YTPlayerStore {
  player: YT.Player | null;
  setPlayer: (player: YT.Player) => void;
}

export const useYTPlayerStore = create<YTPlayerStore>()((set) => ({
  player: null,
  setPlayer: (player: YT.Player) => set({ player }),
}));
