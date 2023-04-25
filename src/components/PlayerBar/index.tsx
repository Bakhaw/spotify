import { useCallback, useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useRecoilState } from "recoil";
import { debounce } from "lodash";

import {
  BackwardIcon,
  ForwardIcon,
  PauseCircleIcon,
  PlayCircleIcon,
  SpeakerXMarkIcon,
  SpeakerWaveIcon,
  ChevronUpIcon,
} from "@heroicons/react/24/solid";

import useSpotify from "@/hooks/useSpotify";
import useTrack from "@/hooks/useTrack";
import { currentTrackIdState, isPlayingState } from "@/atoms/trackAtom";
import Cover from "../Cover";
import ArtistLink from "../ArtistLink";
import TrackLink from "../TrackLink";
import Link from "next/link";
import classNames from "classnames";
import ClosedPlayerBar from "./ClosedPlayerBar";

function PlayerBar() {
  const router = useRouter();
  const { data: session } = useSession();
  const spotifyApi = useSpotify();

  const [currentTrackId, setCurrentTrackId] =
    useRecoilState(currentTrackIdState);
  const [isPlaying, setIsPlaying] = useRecoilState(isPlayingState);

  const track = useTrack(currentTrackId);
  const [volume, setVolume] = useState(50);
  const [showFullPlayer, setShowFullPlayer] = useState(false);

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

  // TODO
  function onPreviousTrackClick() {
    // spotifyApi.skipToPrevious();
  }

  // TODO
  function onNextTrackClick() {
    // spotifyApi.skipToNext();
  }

  function onVolumeChange(e: React.ChangeEvent<HTMLInputElement>) {
    setVolume(parseInt(e.target.value));
  }

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

  if (router.asPath === "/studio") return null;

  if (!track) return null;

  return (
    <div
      className={classNames(
        "cursor-pointer absolute bottom-16 w-full px-8 py-2 bg-[#060606]"
        // showFullPlayer ? "h-[calc(100vh - 64px)]" : "h-20"
      )}
      style={{
        height: showFullPlayer ? "calc(100vh - 64px)" : 80,
        transition: "0.3s",
      }}
      onClick={() => setShowFullPlayer(true)}
    >
      {showFullPlayer ? <div>full player</div> : <ClosedPlayerBar />}
    </div>
  );
}

export default PlayerBar;
