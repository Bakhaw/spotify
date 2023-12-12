import { useCallback, useContext } from "react";

import { PlayerContext } from "@/context/PlayerContext";

import useFetch from "@/hooks/useFetch";
import useSpotify from "@/hooks/useSpotify";

function DeviceSelector() {
  const playerContext = useContext(PlayerContext);
  const spotifyApi = useSpotify();

  const getDevices = useCallback(() => spotifyApi.getMyDevices(), [spotifyApi]);

  const devices = useFetch<SpotifyApi.UserDevicesResponse>(getDevices);

  return (
    <div className="text-right bg-green-500 w-full px-4 py-1 text-sm text-black">
      Currently listening on {playerContext?.currentPlaybackState?.device.name}
    </div>
  );
}

export default DeviceSelector;
