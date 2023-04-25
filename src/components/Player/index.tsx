import { useCallback, useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useRecoilState } from "recoil";
import { debounce } from "lodash";
import classNames from "classnames";

import useSpotify from "@/hooks/useSpotify";
import useTrack from "@/hooks/useTrack";
import { currentTrackIdState, isPlayingState } from "@/atoms/trackAtom";

import ClosedPlayer from "./ClosedPlayer";
import OpenedPlayer from "./OpenedPlayer";

export interface PlayerProps {
  onBackwardButtonClick: () => void;
  onForwardButtonClick: () => void;
  onTogglePlay: () => void;
  track: SpotifyApi.TrackObjectFull;
}

function Player() {
  const router = useRouter();
  const { data: session } = useSession();
  const spotifyApi = useSpotify();

  const [currentTrackId, setCurrentTrackId] =
    useRecoilState(currentTrackIdState);
  const [_isPlaying, setIsPlaying] = useRecoilState(isPlayingState);

  const track = useTrack(currentTrackId);

  const [volume, setVolume] = useState(50);
  const [showFullPlayer, setShowFullPlayer] = useState(false);

  // TODO
  function onPreviousTrackClick() {
    // spotifyApi.skipToPrevious();
  }

  // TODO
  function onNextTrackClick() {
    // spotifyApi.skipToNext();
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

  // volume handling
  function onVolumeChange(e: React.ChangeEvent<HTMLInputElement>) {
    setVolume(parseInt(e.target.value));
  }

  // volume handling
  useEffect(() => {
    if (spotifyApi.getAccessToken() && !currentTrackId) {
      const getCurrentTrack = async () => {
        if (!track) {
          const { body: currentPlaybackState } =
            await spotifyApi.getMyCurrentPlaybackState();

          if (!currentPlaybackState) return;

          setIsPlaying(currentPlaybackState.is_playing);
          setCurrentTrackId(String(currentPlaybackState.item?.id));
          setVolume(Number(currentPlaybackState.device.volume_percent));
        }
      };

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
  const debounceAdjustVolume = useCallback(
    debounce((volume) => {
      spotifyApi.setVolume(volume);
    }, 300),
    []
  );

  // volume handling
  useEffect(() => {
    if (spotifyApi.getAccessToken()) {
      if (volume > 0 && volume < 100) {
        debounceAdjustVolume(volume);
      }
    }
  }, [spotifyApi, volume]);

  // player opened or closed state
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
        transition: "0.2s",
      }}
    >
      <div className="flex justify-center items-center h-full">
        {showFullPlayer ? (
          <OpenedPlayer
            onClose={() => setShowFullPlayer(false)}
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
}

export default Player;
