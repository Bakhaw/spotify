import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import {
  HeartIcon as HeartIconOutline,
  PauseIcon,
} from "@heroicons/react/24/outline";
import {
  HeartIcon as HeartIconSolid,
  PlayIcon,
} from "@heroicons/react/24/solid";

import { currentTrackIdState, isPlayingState } from "@/atoms/trackAtom";
import millisToMinutesAndSeconds from "@/lib/millisToMinutesAndSeconds";
import useSpotify from "@/hooks/useSpotify";
import useTrack from "@/hooks/useTrack";
import ArtistLink from "../ArtistLink";
import Cover from "../Cover";
import TrackLink from "../TrackLink";

interface TrackProps {
  coverSrc?: string;
  order?: number | null;
  showCover?: boolean; // default false;
  track: SpotifyApi.TrackObjectFull | SpotifyApi.TrackObjectSimplified;
}

const Track: React.FC<TrackProps> = ({ order, showCover = false, track }) => {
  const spotifyApi = useSpotify();
  const currentTrack = useTrack(track.id);
  const [trackSaved, setTrackSaved] = useState<boolean>(false);
  const [showPlayIcon, setShowIcon] = useState<boolean>(false);
  const [currentTrackId, setCurrentTrackId] =
    useRecoilState(currentTrackIdState);
  const [isPlaying, setIsPlaying] = useRecoilState(isPlayingState);

  async function checkIfTrackIsSaved() {
    if (!currentTrack) return;

    const { body } = await spotifyApi.containsMySavedTracks([currentTrack.id]);
    setTrackSaved(body[0]);
  }

  async function onFavoriteButtonClick() {
    if (!currentTrack) return;

    if (trackSaved) {
      await spotifyApi.removeFromMySavedTracks([currentTrack.id]);
      setTrackSaved(false);
    } else {
      await spotifyApi.addToMySavedTracks([currentTrack.id]);
      setTrackSaved(true);
    }
  }

  function pauseSong() {
    spotifyApi.pause();
    setIsPlaying(false);
  }

  function playSong() {
    if (!currentTrack) return;

    if (currentTrack.id === currentTrackId) {
      spotifyApi.play();
    } else {
      spotifyApi.play({
        context_uri: currentTrack.album.uri,
        offset: { uri: currentTrack.uri },
      });
    }

    setCurrentTrackId(currentTrack.id);
    setIsPlaying(true);
  }

  useEffect(() => {
    checkIfTrackIsSaved();
  }, []);

  if (!currentTrack) return null;

  return (
    <div
      className="flex justify-between items-center rounded-xl h-14 w-full bg-[#2d2e37] text-gray-300 overflow-hidden transition-colors hover:bg-[#666770] hover:text-white"
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
            ) : (
              <span>{order}</span>
            )}
          </div>
        )}

        {showCover && (
          <div className="h-[60px] w-[60px] mr-3 relative">
            <Cover size="small" square src={currentTrack.album.images[0].url} />
            {showPlayIcon && (
              <div className="h-full w-full flex justify-center items-center top-0 absolute bg-black/90">
                <PlayIcon
                  className="h-5 w-5 cursor-pointer"
                  onClick={playSong}
                />
              </div>
            )}
          </div>
        )}

        <div className="flex flex-col max-w-[45vw] md:max-w-80">
          <TrackLink track={currentTrack} />
          <ArtistLink artists={currentTrack.artists} />
        </div>
      </div>

      <div className="flex justify-between items-center gap-3 pr-4">
        <div
          aria-label="favorite"
          role="button"
          className="h-7 w-7"
          onClick={onFavoriteButtonClick}
        >
          {trackSaved ? <HeartIconSolid /> : <HeartIconOutline />}
        </div>

        <div className="hidden md:block">
          {millisToMinutesAndSeconds(currentTrack.duration_ms)}
        </div>
      </div>
    </div>
  );
};

export default Track;
