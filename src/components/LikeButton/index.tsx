import { useEffect, useState } from "react";

import { HeartIcon as HeartIconOutline } from "@heroicons/react/24/outline";
import { HeartIcon as HeartIconSolid } from "@heroicons/react/24/solid";

import useSpotify from "@/hooks/useSpotify";

interface LikeButtonProps {
  track: SpotifyApi.TrackObjectSimplified;
}

const LikeButton: React.FC<LikeButtonProps> = ({ track }) => {
  const spotifyApi = useSpotify();
  const [isTrackSaved, setIsTrackSaved] = useState(false);

  async function onFavoriteButtonClick() {
    if (!track) return;

    if (isTrackSaved) {
      await spotifyApi.removeFromMySavedTracks([track.id]);
      setIsTrackSaved(false);
    } else {
      await spotifyApi.addToMySavedTracks([track.id]);
      setIsTrackSaved(true);
    }
  }

  useEffect(() => {
    if (spotifyApi.getAccessToken() && track) {
      const checkIfTrackIsSaved = async () => {
        const { body } = await spotifyApi.containsMySavedTracks([track.id]);

        if (body.length > 0) {
          setIsTrackSaved(body[0]);
        }
      };

      checkIfTrackIsSaved();
    }
  }, [spotifyApi, track]);

  return (
    <div
      aria-label="favorite"
      role="button"
      className="h-7 w-7"
      onClick={onFavoriteButtonClick}
    >
      {isTrackSaved ? <HeartIconSolid color="#1ED760" /> : <HeartIconOutline />}
    </div>
  );
};

export default LikeButton;
