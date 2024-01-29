import { create } from "zustand";

export type SearchProvider = "spotify" | "youtube";

interface SearchProviderStore {
  searchProvider: SearchProvider;
  setSearchProvider: (searchProvider: SearchProvider) => void;
}

const defaultSearchProvider: SearchProvider = "spotify";

export const useSearchProviderStore = create<SearchProviderStore>()((set) => ({
  searchProvider: defaultSearchProvider,
  setSearchProvider: (searchProvider: SearchProvider) =>
    set({ searchProvider }),
}));
