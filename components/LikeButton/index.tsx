import { useState } from "react";

import { HeartIcon } from "lucide-react";

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

  // TODO this useEffect is causing 429 Too Many Requests error
  // useEffect(() => {
  //   if (spotifyApi.getAccessToken() && track) {
  //     const checkIfTrackIsSaved = async () => {
  //       const { body } = await spotifyApi.containsMySavedTracks([track.id]);

  //       if (body.length > 0) {
  //         setIsTrackSaved(body[0]);
  //       }
  //     };

  //     checkIfTrackIsSaved();
  //   }
  // }, [spotifyApi, track]);

  return (
    <div aria-label="favorite" role="button" onClick={onFavoriteButtonClick}>
      {isTrackSaved ? (
        <HeartIcon fill="#1ED760" color="#1ED760" />
      ) : (
        <HeartIcon className="h-5 w-5" />
      )}
    </div>
  );
};

export default LikeButton;
