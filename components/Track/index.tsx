"use client";

import { useState } from "react";
import { PauseIcon, PlayIcon } from "lucide-react";

import { usePlayerContext } from "@/context/PlayerContext";
import { useTimerContext } from "@/context/TimerContext";

import useSpotify from "@/hooks/useSpotify";
import useTrack from "@/hooks/useTrack";

import Cover from "@/components/Cover";
import Visualizer from "@/components/Visualizer";
import { Button } from "@/components/ui/button";

import TrackActions from "./TrackActions";
import TrackDetails from "./TrackDetails";

export interface TrackProps {
  order?: number | null;
  showCover?: boolean; // default false;
  track: SpotifyApi.TrackObjectFull | SpotifyApi.TrackObjectSimplified;
}

const Track: React.FC<TrackProps> = ({ order, showCover = false, track }) => {
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
  const isPlaying = currentPlaybackState?.is_playing;

  function pauseSong() {
    setCurrentPlaybackState((state) => {
      if (!state) return null;

      return {
        ...state,
        is_playing: false,
      };
    });

    spotifyApi.pause();
  }

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
      <div className="flex justify-start items-center">
        {order && (
          <div className="text-center w-14 px-4">
            {showPlayIcon ? (
              <>
                {currentTrack.id === currentTrackId && isPlaying ? (
                  <PauseIcon
                    className="h-5 w-5 cursor-pointer"
                    onClick={pauseSong}
                    role="button"
                  />
                ) : (
                  <PlayIcon
                    className="h-5 w-5 cursor-pointer"
                    onClick={playSong}
                    role="button"
                  />
                )}
              </>
            ) : currentTrackId === track.id && isPlaying ? (
              <Visualizer />
            ) : (
              <span>{order}</span>
            )}
          </div>
        )}

        {showCover && (
          <div className="h-[60px] w-[60px] mr-3 relative">
            <Cover
              alt={`${currentTrack.name} cover`}
              size="small"
              src={currentTrack.album.images[0].url}
            />

            <>
              {showPlayIcon && (
                <div className="h-full w-full flex justify-center items-center top-0 absolute bg-black/90 ">
                  {currentTrack.id === currentTrackId && isPlaying ? (
                    <PauseIcon
                      className="h-5 w-5 cursor-pointer"
                      onClick={pauseSong}
                    />
                  ) : (
                    <PlayIcon
                      className="h-5 w-5 cursor-pointer"
                      onClick={playSong}
                    />
                  )}
                </div>
              )}
            </>
          </div>
        )}

        <TrackDetails track={currentTrack} />
      </div>

      <TrackActions track={currentTrack} />
    </Button>
  );
};

export default Track;
