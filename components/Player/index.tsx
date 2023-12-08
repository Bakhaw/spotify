import { ChangeEvent, useCallback, useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import { useRecoilState } from "recoil";
import { debounce } from "lodash";

import { currentTrackIdState, isPlayingState } from "@/atoms/trackAtom";

import useSpotify from "@/hooks/useSpotify";
import useDominantColor from "@/hooks/useDominantColor";
import useTrack from "@/hooks/useTrack";
import generateRGBString from "@/lib/generateRGBString";
import isWhite from "@/lib/isWhite";

import ClosedPlayer from "./ClosedPlayer";
import OpenedPlayer from "./OpenedPlayer";

export interface PlayerProps {
  onBackwardButtonClick: () => void;
  onForwardButtonClick: () => void;
  onTogglePlay: () => void;
  track: SpotifyApi.TrackObjectFull;
}

const Player: React.FC = () => {
  const router = useRouter();
  const pathname = usePathname();
  const { data: session } = useSession();
  const spotifyApi = useSpotify();

  const [currentTrackId, setCurrentTrackId] =
    useRecoilState(currentTrackIdState);
  const [_isPlaying, setIsPlaying] = useRecoilState(isPlayingState);
  const track = useTrack(currentTrackId);

  const [volume, setVolume] = useState(20);
  const [progressMs, setProgressMs] = useState(0);
  const [showFullPlayer, setShowFullPlayer] = useState(false);

  const getCurrentTrack = async () => {
    const { body: currentPlaybackState } =
      await spotifyApi.getMyCurrentPlaybackState();

    if (!currentPlaybackState) return;

    setCurrentTrackId(String(currentPlaybackState?.item?.id));
    setProgressMs(Number(currentPlaybackState?.progress_ms));
    setVolume(Number(currentPlaybackState?.device.volume_percent));
    setIsPlaying(currentPlaybackState?.is_playing);

    return currentPlaybackState;
  };

  async function onPreviousTrackClick() {
    await spotifyApi.skipToPrevious();
    await getCurrentTrack();
  }

  async function onNextTrackClick() {
    await spotifyApi.skipToNext();
    await getCurrentTrack();
  }

  async function togglePlay() {
    const { body: currentPlaybackState } =
      await spotifyApi.getMyCurrentPlaybackState();

    if (currentPlaybackState?.is_playing) {
      spotifyApi.pause();
      setIsPlaying(false);
    } else {
      spotifyApi.play();
      setIsPlaying(true);
    }
  }

  useEffect(() => {
    if (spotifyApi.getAccessToken() && !currentTrackId) {
      getCurrentTrack();
    }
  }, [
    spotifyApi,
    session,
    currentTrackId,
    setCurrentTrackId,
    setIsPlaying,
    track,
  ]);

  // volume handling
  function onVolumeChange(e: React.ChangeEvent<HTMLInputElement>) {
    setVolume(parseInt(e.target.value));
  }

  const debounceAdjustVolume = useCallback(
    debounce((volume) => {
      spotifyApi.setVolume(volume);
    }, 300),
    []
  );

  useEffect(() => {
    if (spotifyApi.getAccessToken()) {
      if (volume > 0 && volume < 100) {
        debounceAdjustVolume(volume);
      }
    }
  }, [spotifyApi, volume]);

  // progressMs handling
  function onProgressChange(e: ChangeEvent<HTMLInputElement>) {
    const newProgressMs = Number(e.target.value);
    setProgressMs(newProgressMs);
    spotifyApi.seek(newProgressMs);
  }

  // useEffect(() => {
  //   if (!track) return;

  //   const intervalId = setInterval(() => {
  //     setProgressMs((state) => {
  //       if (state > track.duration_ms - 1000) {
  //         getCurrentTrack();
  //         return 0;
  //       } else {
  //         return state + 1000;
  //       }
  //     });
  //   }, 1000);

  //   return () => clearInterval(intervalId);
  // }, [track]);

  // player opened/closed handling
  useEffect(() => {
    if (showFullPlayer) {
      setShowFullPlayer(false);
    }
  }, [router]);

  const color = useDominantColor(track?.album.images[0].url);

  if (pathname === "/studio" || !track) return null;

  const playerProps: PlayerProps = {
    onBackwardButtonClick: onPreviousTrackClick,
    onForwardButtonClick: onNextTrackClick,
    onTogglePlay: togglePlay,
    track,
  };

  return (
    <div
      className="fixed bottom-0 p-2 z-10 bg-transparent"
      style={{
        color: isWhite(color) ? "text-black" : "#fff",
        height: showFullPlayer ? "100vh" : "80px",
        transition: "0.3s",
        width: showFullPlayer ? "100%" : "calc(100% - 7px)",
        padding: showFullPlayer ? "0" : "0.5rem",
      }}
    >
      <div
        className="flex justify-center items-center h-full w-full  bg-gradient-secondary p-4 rounded"
        style={{
          backgroundColor: generateRGBString(color),
        }}
      >
        {showFullPlayer ? (
          <OpenedPlayer
            onClose={() => setShowFullPlayer(false)}
            onProgressChange={onProgressChange}
            progressMs={progressMs}
            {...playerProps}
          />
        ) : (
          <ClosedPlayer
            onOpen={() => setShowFullPlayer(true)}
            {...playerProps}
          />
        )}
      </div>
    </div>
  );
};

export default Player;
