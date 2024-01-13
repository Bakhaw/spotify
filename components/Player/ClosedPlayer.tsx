import { ChevronUpIcon } from "lucide-react";
import { AiOutlineArrowsAlt } from "react-icons/ai";

import { usePlayerStore } from "@/store/usePlayerStore";

import useTrack from "@/hooks/useTrack";
import useDominantColor from "@/hooks/useDominantColor";

import generateRGBString from "@/lib/generateRGBString";

import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";

import Link from "next/link";

import Controls from "./Controls";
import CurrentTrack from "./CurrentTrack";
import DeviceSelector from "./DeviceSelector";
import OpenedPlayer from "./OpenedPlayer";
import Timer from "./Timer";
import Volume from "./Volume";

function ClosedPlayer() {
  const currentPlaybackState = usePlayerStore((s) => s.currentPlaybackState);

  const track = useTrack(currentPlaybackState?.item?.id);
  const dominantColor = useDominantColor(track?.album.images[0].url);
  const backgroundColor = generateRGBString(dominantColor);

  return (
    <div className="flex items-center justify-between h-16 w-full px-2">
      <div className="w-full">
        <CurrentTrack asLink />
      </div>

      <div className="block md:hidden">
        <Drawer>
          <DrawerTrigger>
            <ChevronUpIcon
              className="h-6 w-6 transition-all	hover:scale-125"
              role="button"
            />
          </DrawerTrigger>
          <DrawerContent
            className="h-screen"
            style={{
              backgroundColor,
            }}
          >
            <OpenedPlayer />
          </DrawerContent>
        </Drawer>
      </div>

      <div className="hidden md:flex w-full flex-grow flex-col justify-center items-center">
        <Controls />

        <Timer />
      </div>

      <div className="hidden md:flex justify-end items-center gap-3 w-full">
        <DeviceSelector />
        <Volume />
        <Link href="/studio">
          <AiOutlineArrowsAlt
            className="h-6 w-6 transition-all hover:scale-110"
            role="button"
          />
        </Link>
      </div>
    </div>
  );
}

export default ClosedPlayer;
