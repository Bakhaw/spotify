"use client";

import { useState } from "react";
import Link from "next/link";

import usePlaybackControls from "@/hooks/usePlaybackControls";
import useTrack from "@/hooks/useTrack";

import { Button } from "@/components/ui/button";

import CoverWithPlayButton from "./CoverWithPlayButton";
import PlaybackControls from "./PlaybackControls";
import TrackActions from "./TrackActions";
import TrackDetails from "./TrackDetails";

export interface TrackProps {
  order?: number | null;
  showCover?: boolean;
  track: SpotifyApi.TrackObjectFull | SpotifyApi.TrackObjectSimplified;
}

const Track: React.FC<TrackProps> = ({ order, showCover, track }) => {
  const [showPlayIcon, setShowIcon] = useState<boolean>(false);
  const currentTrack = useTrack(track.id);
  const { playSong } = usePlaybackControls();

  if (!currentTrack) return null;

  return (
    <Button
      className="transition-all duration-500 flex justify-between items-center p-0 min-h-[56px] h-full w-full overflow-hidden cursor-default bg-transparent hover:bg-[#66677070] hover:text-white"
      onMouseEnter={() => setShowIcon(true)}
      onMouseLeave={() => setShowIcon(false)}
      onDoubleClick={() => playSong(currentTrack)}
    >
      <div className="flex justify-between items-center w-full">
        <div className="flex justify-start items-center w-full">
          <PlaybackControls
            order={order}
            track={track}
            showPlayIcon={showPlayIcon}
          />

          {showCover && (
            <CoverWithPlayButton
              order={order}
              track={track}
              showPlayIcon={showPlayIcon}
            />
          )}

          <TrackDetails track={currentTrack} />
        </div>

        <span className="hidden lg:block text-left w-full hover:underline">
          <Link href={`/album/${currentTrack.album.id}`}>
            {currentTrack.album.name}
          </Link>
        </span>
        <TrackActions track={currentTrack} />
      </div>
    </Button>
  );
};

export default Track;
