import { createContext, useContext } from "react";

import { Track } from "@/types";

interface TrackContextProps {
  contextUri?: string; // used to retrieve the play context, when we dont have access to "album.uri" property inside a track
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
