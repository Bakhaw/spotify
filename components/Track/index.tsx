"use client";

import { useState } from "react";
import Link from "next/link";

import usePlaybackControls, { PlayOptions } from "@/hooks/usePlaybackControls";
import useTrack from "@/hooks/useTrack";

import { Button } from "@/components/ui/button";

import CoverWithPlayButton from "./CoverWithPlayButton";
import PlaybackControls from "./PlaybackControls";
import TrackActions from "./TrackActions";
import TrackDetails from "./TrackDetails";

export interface TrackProps {
  order?: number | null;
  showAlbumName?: boolean; // default true
  showCover?: boolean; // default false
  showVisualizer?: boolean; // default false
  track: SpotifyApi.TrackObjectFull | SpotifyApi.TrackObjectSimplified;
}

const Track: React.FC<TrackProps> = ({
  order,
  showAlbumName = true,
  showCover = false,
  showVisualizer = false,
  track,
}) => {
  const { playSong } = usePlaybackControls();
  const currentTrack = useTrack(track.id);

  const [showPlayIcon, setShowIcon] = useState<boolean>(false);

  if (!currentTrack) return null;

  const playOptions: PlayOptions = {
    context_uri: currentTrack.album.uri,
    offset: { uri: currentTrack.uri },
  };

  // TODO move showPlayIcon state -> causing whole component re-render
  return (
    <Button
      className="transition-all duration-500 flex justify-between items-center p-0 min-h-[56px] h-full w-full cursor-default bg-transparent hover:bg-[#66677070] hover:text-white"
      onMouseEnter={() => setShowIcon(true)}
      onMouseLeave={() => setShowIcon(false)}
      onDoubleClick={() => playSong(currentTrack.id, playOptions)}
    >
      <div className="flex justify-between items-center w-full">
        <div className="flex justify-start items-center w-full">
          <PlaybackControls
            order={order}
            showPlayIcon={showPlayIcon}
            track={currentTrack}
          />

          {showCover && (
            <CoverWithPlayButton
              order={order}
              showPlayIcon={showPlayIcon}
              track={currentTrack}
            />
          )}

          <TrackDetails showVisualizer={showVisualizer} track={currentTrack} />
        </div>

        {showAlbumName && (
          <span className="hidden lg:block text-left w-full hover:underline">
            <Link href={`/album/${currentTrack.album.id}`}>
              {currentTrack.album.name}
            </Link>
          </span>
        )}

        <TrackActions track={currentTrack} />
      </div>
    </Button>
  );
};

export default Track;
