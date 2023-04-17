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
  ChevronUpIcon,
} from "@heroicons/react/24/solid";

import useSpotify from "@/hooks/useSpotify";
import useTrack from "@/hooks/useTrack";
import { currentTrackIdState, isPlayingState } from "@/atoms/trackAtom";
import Cover from "../Cover";
import ArtistLink from "../ArtistLink";
import TrackLink from "../TrackLink";

function Player() {
  const { data: session } = useSession();
  const spotifyApi = useSpotify();

  const [currentTrackId, setCurrentTrackId] =
    useRecoilState(currentTrackIdState);
  const [isPlaying, setIsPlaying] = useRecoilState(isPlayingState);

  const track = useTrack(currentTrackId);
  const [volume, setVolume] = useState(50);

  async function getCurrentTrack() {
    if (!track) {
      const { body: currentPlaybackState } =
        await spotifyApi.getMyCurrentPlaybackState();

      if (!currentPlaybackState) return;

      setIsPlaying(currentPlaybackState.is_playing);
      setCurrentTrackId(String(currentPlaybackState.item?.id));
      setVolume(Number(currentPlaybackState.device.volume_percent));
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
    if (spotifyApi.getAccessToken() && !currentTrackId) {
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
    if (spotifyApi.getAccessToken()) {
      if (volume > 0 && volume < 100) {
        debounceAdjustVolume(volume);
      }
    }
  }, [volume]);

  if (!track) return null;

  return (
    <div className="w-full px-8 py-2 h-20 overflow-hidden bg-[#060606] flex justify-between items-center">
      <div className="flex justify-between items-center w-full">
        <div className="flex flex-1 justify-start items-center gap-3 h-full">
          <Cover size="small" square src={track.album.images[0].url} />

          <div className="max-w-[50vw] md:max-w-[30vw]">
            <TrackLink track={track} />
            <ArtistLink artists={track.artists} />
          </div>
        </div>

        <div className="md:hidden">
          <ChevronUpIcon className="h-6 w-6" role="button" />
        </div>

        <div className="hidden md:flex flex-1 justify-center items-center gap-3 h-full">
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

        <div className="hidden md:flex flex-1 justify-end items-center gap-3 h-full">
          <SpeakerXMarkIcon className="h-6 w-6" role="button" />
          <input
            min={0}
            max={100}
            value={volume}
            type="range"
            onChange={onVolumeChange}
          />
          <SpeakerWaveIcon className="h-6 w-6" role="button" />
        </div>
      </div>
    </div>
  );
}

export default Player;
