import { useCallback } from "react";
import { useSearchParams } from "next/navigation";
import { LuMonitorSpeaker } from "react-icons/lu";

import { SearchProvider } from "@/types";

import { usePlayerStore } from "@/store/usePlayerStore";

import useFetch from "@/hooks/useFetch";
import useSpotify from "@/hooks/useSpotify";

import Visualizer from "@/components/Visualizer";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

function DeviceSelector() {
  const spotifyApi = useSpotify();
  const searchParams = useSearchParams();
  const provider = searchParams.get("provider") as SearchProvider;

  const { currentPlaybackState, fetchPlaybackState } = usePlayerStore();

  const getDevices = useCallback(() => spotifyApi.getMyDevices(), [spotifyApi]);

  const devices = useFetch<SpotifyApi.UserDevicesResponse>(getDevices);

  async function onDeviceClick(device: SpotifyApi.UserDevice | null) {
    if (
      !device ||
      typeof device.id !== "string" ||
      currentPlaybackState?.device?.id === device.id
    )
      return;

    await spotifyApi.transferMyPlayback([device.id]);

    setTimeout(async () => {
      await fetchPlaybackState();
    }, 500);
  }

  if (!devices || !devices.devices) return null;

  const sortedDevices = devices.devices.filter(
    (device) => currentPlaybackState?.device?.id !== device.id
  );

  if (!currentPlaybackState?.device || provider === "youtube") return null;

  return (
    <>
      <Popover>
        <PopoverTrigger>
          <LuMonitorSpeaker
            className="h-6 w-6 transition-all	hover:scale-110"
            role="button"
          />
        </PopoverTrigger>
        <PopoverContent className="flex flex-col justify-between gap-4 text-sm">
          <div className="space-y-2">
            <div className="flex justify-start items-center gap-2">
              <span className="h-2 w-2 bg-green-600 rounded-full animate-pulse" />
              <span>Current device</span>
            </div>

            <div
              className="flex justify-start items-center gap-2 cursor-pointer bg-green-primary/10 rounded-md px-2 py-1 text-sm text-green-primary"
              onClick={() => onDeviceClick(currentPlaybackState.device)}
            >
              {currentPlaybackState?.is_playing && <Visualizer />}
              <span>{currentPlaybackState.device.name}</span>
            </div>
          </div>

          {sortedDevices.length > 0 && (
            <div className="space-y-2">
              <span>Select another device</span>
              {sortedDevices.map((device) => (
                <div
                  key={device.id}
                  className="flex justify-start items-center gap-2 cursor-pointer rounded-md px-2 py-1 text-sm hover:bg-green-primary/10 hover:text-green-primary transition-all"
                  onClick={() => onDeviceClick(device)}
                >
                  <span>{device.name}</span>
                </div>
              ))}
            </div>
          )}
        </PopoverContent>
      </Popover>
      {/* 
      <div className="absolute bottom-0 left-[8px] right-[8px] rounded-md text-right bg-green-500 px-4 py-1 text-xs text-black">
        Currently listening on {currentPlaybackState?.device.name}
      </div> */}
    </>
  );
}

export default DeviceSelector;
