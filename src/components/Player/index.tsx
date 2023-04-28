import { ChangeEvent, useCallback, useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useRecoilState } from "recoil";
import { debounce } from "lodash";
import classNames from "classnames";

import { currentTrackIdState, isPlayingState } from "@/atoms/trackAtom";

import useSpotify from "@/hooks/useSpotify";
import useTrack from "@/hooks/useTrack";

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
  const { data: session } = useSession();
  const spotifyApi = useSpotify();

  const [currentTrackId, setCurrentTrackId] =
    useRecoilState(currentTrackIdState);
  const [_isPlaying, setIsPlaying] = useRecoilState(isPlayingState);
  const track = useTrack(currentTrackId);

  const [volume, setVolume] = useState(50);
  const [progressMs, setProgressMs] = useState(0);
  const [showFullPlayer, setShowFullPlayer] = useState(false);

  // TODO: update currentTrackIdState
  async function onPreviousTrackClick() {
    await spotifyApi.skipToPrevious();
    await getCurrentTrack();
  }

  // TODO: update currentTrackIdState
  async function onNextTrackClick() {
    await spotifyApi.skipToNext();
    await getCurrentTrack();
  }

  async function togglePlay() {
    const { body: currentPlaybackState } =
      await spotifyApi.getMyCurrentPlaybackState();

    if (currentPlaybackState.is_playing) {
      spotifyApi.pause();
      setIsPlaying(false);
    } else {
      spotifyApi.play();
      setIsPlaying(true);
    }
  }

  const getCurrentTrack = async () => {
    const { body: currentPlaybackState } =
      await spotifyApi.getMyCurrentPlaybackState();

    if (!currentPlaybackState) return;

    setCurrentTrackId(String(currentPlaybackState.item?.id));
    setProgressMs(Number(currentPlaybackState.progress_ms));
    setVolume(Number(currentPlaybackState.device.volume_percent));
    setIsPlaying(currentPlaybackState.is_playing);

    return currentPlaybackState;
  };

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

  useEffect(() => {
    if (!track) return;

    const intervalId = setInterval(() => {
      setProgressMs((state) => {
        if (state > track.duration_ms - 1000) {
          getCurrentTrack();
          return 0;
        } else {
          return state + 1000;
        }
      });
    }, 1000);

    return () => clearInterval(intervalId);
  }, [track]);

  // player opened/closed handling
  useEffect(() => {
    if (showFullPlayer) {
      setShowFullPlayer(false);
    }
  }, [router]);

  if (router.asPath === "/studio") return null;

  if (!track) return null;

  const playerProps: PlayerProps = {
    onBackwardButtonClick: onPreviousTrackClick,
    onForwardButtonClick: onNextTrackClick,
    onTogglePlay: togglePlay,
    track,
  };

  return (
    <div
      className={classNames(
        "absolute bottom-16 w-full px-8 py-2 bg-[#060606] z-10"
      )}
      style={{
        height: showFullPlayer ? "calc(100vh - 64px)" : "80px",
        transition: "0.3s",
      }}
    >
      <div className="flex justify-center items-center h-full">
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
