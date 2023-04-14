import { useEffect, useState } from "react";
import Link from "next/link";
import { HeartIcon as HeartIconOutline } from "@heroicons/react/24/outline";
import { HeartIcon as HeartIconSolid } from "@heroicons/react/24/solid";

import useSpotify from "@/hooks/useSpotify";
import millisToMinutesAndSeconds from "@/lib/millisToMinutesAndSeconds";
import Cover from "../Cover";

interface TrackProps {
  coverSrc?: string;
  order?: number | null;
  showCover?: boolean; // default false;
  track: SpotifyApi.TrackObjectFull | SpotifyApi.TrackObjectSimplified;
}

const Track: React.FC<TrackProps> = ({
  coverSrc,
  order,
  showCover = false,
  track,
}) => {
  const spotifyApi = useSpotify();
  const [trackSaved, setTrackSaved] = useState<boolean>(false);

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

  function onTrackDoubleClick() {
    spotifyApi.play({ uris: [track.uri] });
  }

  useEffect(() => {
    checkIfTrackIsSaved();
  }, []);

  if (!track) return null;

  return (
    <div
      className="flex justify-between items-center rounded-xl h-14 w-full bg-[#2d2e37] text-gray-300 overflow-hidden transition-colors hover:bg-[#666770] hover:text-white"
      onDoubleClick={onTrackDoubleClick}
    >
      <div className="flex justify-start items-center">
        {order && <span className="px-4">{order}</span>}

        {coverSrc && showCover && <Cover size="small" square src={coverSrc} />}

        <div className="flex flex-col gap-1 w-80">
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
