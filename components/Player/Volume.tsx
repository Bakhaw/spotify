import { useSearchParams } from "next/navigation";
import { debounce } from "lodash";
import { TbVolume, TbVolumeOff } from "react-icons/tb";

import { SearchProvider } from "@/types";

import { usePlayerStore } from "@/store/usePlayerStore";
import { useYTPlayerStore } from "@/store/useYTPlayerStore";

import useSpotify from "@/hooks/useSpotify";

import { Slider } from "@/components/ui/slider";

function Volume() {
  const spotifyApi = useSpotify();
  const searchParams = useSearchParams();
  const provider = searchParams.get("provider") as SearchProvider;

  const { currentPlaybackState, setCurrentPlaybackState } = usePlayerStore();
  const YTPlayer = useYTPlayerStore((s) => s.player);

  function onVolumeChange(value: number[]) {
    if (!currentPlaybackState?.device) return;

    const newVolume = value[0];

    setCurrentPlaybackState({
      ...currentPlaybackState,
      device: {
        ...currentPlaybackState.device,
        volume_percent: newVolume,
      },
    });

    if (newVolume > 0 && newVolume < 100) {
      if (provider === "youtube") {
        YTPlayer?.setVolume(newVolume);
      } else {
        if (spotifyApi.getAccessToken()) {
          debounceAdjustVolume(newVolume);
        }
      }
    }
  }

  const debounceAdjustVolume = debounce((volume: number) => {
    spotifyApi.setVolume(volume);
  }, 300);

  const isVolumeMuted = currentPlaybackState?.device?.volume_percent === 0;

  function toggleMuteVolume() {
    if (!currentPlaybackState?.device) return;

    const defaultVolume = 30;
    const newVolume = isVolumeMuted ? defaultVolume : 0;

    setCurrentPlaybackState({
      ...currentPlaybackState,
      device: {
        ...currentPlaybackState.device,
        volume_percent: newVolume,
      },
    });

    if (provider === "youtube") {
      YTPlayer?.setVolume(newVolume);
    } else {
      spotifyApi.setVolume(newVolume);
    }
  }

  if (!currentPlaybackState?.device) return null;

  return (
    <div className="flex justify-end items-center gap-2 w-[160px] h-full">
      {isVolumeMuted ? (
        <TbVolumeOff
          onClick={toggleMuteVolume}
          className="h-6 w-6 transition-all hover:scale-110"
          role="button"
        />
      ) : (
        <TbVolume
          onClick={toggleMuteVolume}
          className="h-6 w-6 transition-all hover:scale-110"
          role="button"
        />
      )}

      <Slider
        min={0}
        max={100}
        onValueChange={onVolumeChange}
        value={[currentPlaybackState.device.volume_percent ?? 0]}
      />
    </div>
  );
}

export default Volume;
