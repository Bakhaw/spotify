import { IoPlay } from "react-icons/io5";
import { IoIosPause } from "react-icons/io";

import { usePlayerStore } from "@/store/usePlayerStore";

import usePlaybackControls from "@/hooks/usePlaybackControls";

import TrackCover from "./TrackCover";

import { useTrackContext } from "./context";

const TrackCoverWithPlayButton = () => {
  const { contextUri, track } = useTrackContext();
  const currentPlaybackState = usePlayerStore((s) => s.currentPlaybackState);
  const { pauseSong, playSong } = usePlaybackControls();

  const isPlaying = currentPlaybackState?.is_playing;
  const currentTrackId = currentPlaybackState?.item?.id;

  async function handlePlayClick() {
    try {
      await playSong(track, contextUri);
    } catch (error) {
      if (error === "NO_ACTIVE_DEVICE_FOUND") {
        console.log("NO_ACTIVE_DEVICE_FOUND");
        // todo show alert message to the user
      }
    }
  }

  return (
    <div className="h-[60px] w-[60px] shrink-0 relative">
      <TrackCover />

      <div className="top-0 absolute h-full w-full hidden group-hover:flex justify-center items-center bg-black/60">
        {track.id === currentTrackId && isPlaying ? (
          <IoIosPause className="h-5 w-5 cursor-pointer" onClick={pauseSong} />
        ) : (
          <IoPlay
            className="h-5 w-5 cursor-pointer"
            onClick={handlePlayClick}
          />
        )}
      </div>
    </div>
  );
};

export default TrackCoverWithPlayButton;
