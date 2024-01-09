import { createContext, useContext } from "react";

import { Track } from "@/types";

interface TrackContextProps {
  track: Track;
}

export const TrackContext = createContext<TrackContextProps | null>(null);

export function useTrackContext() {
  const context = useContext(TrackContext);

  if (!context) {
    throw new Error("TrackContext must be used within a TrackContextProvider");
  }

  return context;
}
