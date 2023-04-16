import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import Link from "next/link";
import { HeartIcon as HeartIconOutline } from "@heroicons/react/24/outline";
import {
  HeartIcon as HeartIconSolid,
  PlayIcon,
} from "@heroicons/react/24/solid";

import isFullTrack from "@/lib/isFullTrack";
import millisToMinutesAndSeconds from "@/lib/millisToMinutesAndSeconds";
import useSpotify from "@/hooks/useSpotify";
import Cover from "../Cover";
import { currentTrackIdState, isPlayingState } from "@/atoms/trackAtom";

interface TrackProps {
  coverSrc?: string;
  order?: number | null;
  showCover?: boolean; // default false;
  track: SpotifyApi.TrackObjectFull | SpotifyApi.TrackObjectSimplified;
}

const Track: React.FC<TrackProps> = ({ order, showCover = false, track }) => {
  const spotifyApi = useSpotify();
  const [trackSaved, setTrackSaved] = useState<boolean>(false);
  const [showPlayIcon, setShowIcon] = useState<boolean>(false);
  const [currentTrackId, setCurrentTrackId] =
    useRecoilState(currentTrackIdState);
  const [isPlaying, setIsPlaying] = useRecoilState(isPlayingState);

  async function checkIfTrackIsSaved() {
    if (!track) return;

    const { body } = await spotifyApi.containsMySavedTracks([track.id]);
    setTrackSaved(body[0]);
  }

  async function onFavoriteButtonClick() {
    if (!track) return;

    if (trackSaved) {
      await spotifyApi.removeFromMySavedTracks([track.id]);
      setTrackSaved(false);
    } else {
      await spotifyApi.addToMySavedTracks([track.id]);
      setTrackSaved(true);
    }
  }

  function playSong() {
    setCurrentTrackId(track.id);
    setIsPlaying(true);

    spotifyApi.play({
      ...(isFullTrack(track)
        ? {
            context_uri: track.album.uri,
            offset: { uri: track.uri },
          }
        : {
            uris: [track.uri],
          }),
    });
  }

  useEffect(() => {
    checkIfTrackIsSaved();
  }, []);

  if (!track) return null;

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
              <PlayIcon className="h-5 w-5 cursor-pointer" onClick={playSong} />
            ) : (
              <span>{order}</span>
            )}
          </div>
        )}

        {showCover && (
          <div className="h-[60px] w-[60px] mr-3 relative">
            <Cover
              size="small"
              square
              src={isFullTrack(track) ? track.album.images[0].url : null}
            />
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

        <div className="flex flex-col w-80">
          <div className="text-white overflow-hidden whitespace-nowrap text-ellipsis">
            {track.name}
          </div>
          <Link
            className="w-max hover:underline"
            href={`/artist/${track.artists[0].id}`}
          >
            {track.artists[0].name}
          </Link>
        </div>
      </div>

      <div className="flex justify-between items-center gap-3 pr-8">
        <div
          aria-label="favorite"
          role="button"
          className="h-7 w-7"
          onClick={onFavoriteButtonClick}
        >
          {trackSaved ? <HeartIconSolid /> : <HeartIconOutline />}
        </div>

        <div>{millisToMinutesAndSeconds(track.duration_ms)}</div>

        {/* <IconButton>
          <MoreHorizIcon />
        </IconButton> */}
      </div>
    </div>
  );
};

export default Track;
