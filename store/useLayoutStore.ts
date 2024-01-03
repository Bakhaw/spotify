import { create } from "zustand";

interface LayoutStore {
  isSideBarCollapsed: boolean; // default false
  collapseSidebar: (collapse: boolean) => void;
}

export const useLayoutStore = create<LayoutStore>()((set) => ({
  isSideBarCollapsed: false,
  collapseSidebar: (collapse: boolean) => set({ isSideBarCollapsed: collapse }),
}));
