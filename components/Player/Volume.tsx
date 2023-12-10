import { debounce } from "lodash";
import { Volume1Icon, Volume2Icon } from "lucide-react";

import { usePlayerContext } from "@/context/PlayerContext";

import useSpotify from "@/hooks/useSpotify";

function Volume() {
  const spotifyApi = useSpotify();
  const { currentPlaybackState, setCurrentPlaybackState } = usePlayerContext();

  function onVolumeChange(e: React.ChangeEvent<HTMLInputElement>) {
    const newVolume = parseInt(e.target.value);

    setCurrentPlaybackState((state) => {
      if (!state) return null;

      return {
        ...state,
        device: {
          ...state.device,
          volume_percent: newVolume,
        },
      };
    });

    if (newVolume > 0 && newVolume < 100) {
      if (spotifyApi.getAccessToken()) {
        debounceAdjustVolume(newVolume);
      }
    }
  }

  const debounceAdjustVolume = debounce((volume: number) => {
    spotifyApi.setVolume(volume);
  }, 300);

  if (!currentPlaybackState?.device) return null;

  return (
    <div className="flex justify-end items-center gap-3 h-full">
      <Volume1Icon
        className="h-6 w-6 transition-all	hover:scale-110"
        role="button"
      />
      <input
        aria-label="Adjust the volume"
        min={0}
        max={100}
        value={currentPlaybackState.device.volume_percent ?? 0}
        type="range"
        onChange={onVolumeChange}
      />
      <Volume2Icon
        className="h-6 w-6 transition-all	hover:scale-110"
        role="button"
      />
    </div>
  );
}

export default Volume;
