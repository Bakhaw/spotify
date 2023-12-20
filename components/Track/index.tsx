"use client";

import { useState } from "react";
import Link from "next/link";

import { usePlayerContext } from "@/context/PlayerContext";
import { useTimerContext } from "@/context/TimerContext";

import useSpotify from "@/hooks/useSpotify";
import useTrack from "@/hooks/useTrack";

import { Button } from "@/components/ui/button";

import CoverWithPlayButton from "./CoverWithPlayButton";
import PlaybackControls from "./PlaybackControls";
import TrackActions from "./TrackActions";
import TrackDetails from "./TrackDetails";

export interface TrackProps {
  order?: number | null;
  track: SpotifyApi.TrackObjectFull | SpotifyApi.TrackObjectSimplified;
}

const Track: React.FC<TrackProps> = ({ order, track }) => {
  const spotifyApi = useSpotify();
  const [showPlayIcon, setShowIcon] = useState<boolean>(false);
  const currentTrack = useTrack(track.id);

  const {
    currentPlaybackState,
    hydratePlaybackState,
    setCurrentPlaybackState,
  } = usePlayerContext();

  const { setProgressMs } = useTimerContext();

  const currentTrackId = currentPlaybackState?.item?.id;

  async function playSong() {
    if (!currentTrack) return;

    if (currentTrack.id === currentTrackId) {
      spotifyApi.play();

      setCurrentPlaybackState((state) => {
        if (!state) return null;

        return {
          ...state,
          is_playing: true,
        };
      });
    } else {
      const { body: devices } = await spotifyApi.getMyDevices();

      spotifyApi.play({
        context_uri: currentTrack.album.uri,
        offset: { uri: currentTrack.uri },
        device_id:
          currentPlaybackState?.device.id ?? String(devices.devices[0].id),
      });

      setTimeout(async () => {
        await hydratePlaybackState();
        setProgressMs(0);
      }, 1000);
    }
  }

  if (!currentTrack) return null;

  return (
    <Button
      className="transition-all duration-500 flex justify-between items-center p-0 min-h-[56px] h-full w-full overflow-hidden cursor-default bg-transparent hover:bg-[#66677070] hover:text-white"
      onMouseEnter={() => setShowIcon(true)}
      onMouseLeave={() => setShowIcon(false)}
      onDoubleClick={playSong}
    >
      <div className="flex justify-between items-center w-full">
        <div className="flex justify-start items-center w-full">
          <PlaybackControls
            order={order}
            track={track}
            showPlayIcon={showPlayIcon}
          />

          <CoverWithPlayButton
            order={order}
            track={track}
            showPlayIcon={showPlayIcon}
          />

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
