"use client";

import { useContext, useState } from "react";
import { PauseIcon, PlayIcon } from "lucide-react";

import { PlayerContext } from "@/context/PlayerContext";
import { TimerContext } from "@/context/TimerContext";

import formatMs from "@/lib/formatMs";
import useSpotify from "@/hooks/useSpotify";
import useTrack from "@/hooks/useTrack";

import ArtistLink from "@/components/ArtistLink";
import Cover from "@/components/Cover";
import LikeButton from "@/components/LikeButton";
import TrackLink from "@/components/TrackLink";
import Visualizer from "@/components/Visualizer";
import { Button } from "@/components/ui/button";

interface TrackProps {
  order?: number | null;
  showCover?: boolean; // default false;
  track: SpotifyApi.TrackObjectFull | SpotifyApi.TrackObjectSimplified;
}

const Track: React.FC<TrackProps> = ({ order, showCover = false, track }) => {
  const spotifyApi = useSpotify();
  const [showPlayIcon, setShowIcon] = useState<boolean>(false);
  const currentTrack = useTrack(track.id);

  const playerContext = useContext(PlayerContext);
  const timerContext = useContext(TimerContext);

  const currentTrackId = playerContext?.currentPlaybackState?.item?.id;
  const isPlaying = playerContext?.currentPlaybackState?.is_playing;

  function pauseSong() {
    playerContext?.setCurrentPlaybackState((state) => {
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

      playerContext?.setCurrentPlaybackState((state) => {
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
          playerContext?.currentPlaybackState?.device.id ??
          String(devices.devices[0].id),
      });

      timerContext.setProgressMs(0);

      setTimeout(async () => {
        await playerContext?.hydratePlaybackState();
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

        <div className="flex flex-col max-w-[45vw] md:max-w-80">
          <TrackLink
            isActive={currentTrack.id === currentTrackId}
            track={currentTrack}
          />

          <span className="font-light">
            <ArtistLink artists={currentTrack.artists} />
          </span>
        </div>
      </div>

      <div className="flex justify-center items-center pr-5">
        <LikeButton track={track} />

        <div className="hidden md:block">
          {formatMs(currentTrack.duration_ms, "clock")}
        </div>
      </div>
    </Button>
  );
};

export default Track;
