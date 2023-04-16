import { useCallback, useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { useSession } from "next-auth/react";
import { debounce } from "lodash";

import {
  BackwardIcon,
  ForwardIcon,
  PauseCircleIcon,
  PlayCircleIcon,
  SpeakerXMarkIcon,
  SpeakerWaveIcon,
} from "@heroicons/react/24/solid";

import isFullTrack from "@/lib/isFullTrack";
import useSpotify from "@/hooks/useSpotify";
import useTrack from "@/hooks/useTrack";
import { currentTrackIdState, isPlayingState } from "@/atoms/trackAtom";
import Cover from "../Cover";

function Player() {
  const { data: session } = useSession();
  const spotifyApi = useSpotify();
  const token = spotifyApi.getAccessToken();
  const track = useTrack();

  const [currentTrackId, setCurrentTrackId] =
    useRecoilState(currentTrackIdState);
  const [isPlaying, setIsPlaying] = useRecoilState(isPlayingState);
  const [volume, setVolume] = useState(50);

  async function getCurrentTrack() {
    if (!track) {
      const { body: currentPlayingTrack } =
        await spotifyApi.getMyCurrentPlayingTrack();

      if (currentPlayingTrack.item) {
        setCurrentTrackId(currentPlayingTrack.item.id);
      }

      const { body: currentPlaybackState } =
        await spotifyApi.getMyCurrentPlaybackState();
      setIsPlaying(currentPlaybackState.is_playing);
    }
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
    if (token && !currentTrackId) {
      getCurrentTrack();
    }
  }, [currentTrackIdState, spotifyApi, session]);

  const debounceAdjustVolume = useCallback(
    debounce((volume) => {
      spotifyApi.setVolume(volume);
    }, 300),
    []
  );

  useEffect(() => {
    if (token) {
      if (volume > 0 && volume < 100) {
        console.log("vbolmue changeed");
        debounceAdjustVolume(volume);
      }
    }
  }, [volume]);

  if (!track) return null;

  return (
    <div className="absolute bottom-0 z-50 w-full px-6 py-2 h-20 overflow-hidden bg-[#060606] flex justify-between items-center">
      <div className="flex justify-between items-center w-full">
        <div className="flex flex-1 justify-start items-center gap-3 h-full">
          <Cover size="small" square src={track.album.images[0].url} />

          <div>
            <h1>{track.name}</h1>
            <h1>{isFullTrack(track) ? track.artists[0].name : null}</h1>
          </div>
        </div>

        <div className="flex flex-1 justify-center items-center gap-3 h-full">
          <BackwardIcon
            className="h-6 w-6"
            role="button"
            onClick={onPreviousTrackClick}
          />
          {isPlaying ? (
            <PauseCircleIcon
              className="h-10 w-10"
              role="button"
              onClick={togglePlay}
            />
          ) : (
            <PlayCircleIcon
              className="h-10 w-10"
              role="button"
              onClick={togglePlay}
            />
          )}
          <ForwardIcon
            className="h-6 w-6"
            role="button"
            onClick={onNextTrackClick}
          />
        </div>

        <div className="flex flex-1 justify-end items-center gap-3 h-full">
          <SpeakerXMarkIcon className="h-6 w-6" role="button" />
          <input min={0} max={100} type="range" onChange={onVolumeChange} />
          <SpeakerWaveIcon className="h-6 w-6" role="button" />
        </div>
      </div>
    </div>
  );
}

export default Player;