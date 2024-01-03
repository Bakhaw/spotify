import { ChevronDownIcon } from "lucide-react";

import { usePlayerStore } from "@/store/usePlayerStore";

import useTrack from "@/hooks/useTrack";

import ArtistLink from "@/components/ArtistLink";
import Cover from "@/components/Cover";
// import LikeButton from "@/components/LikeButton";
import TrackLink from "@/components/TrackLink";

import { DrawerClose } from "@/components/ui/drawer";

import Controls from "./Controls";
import Timer from "./Timer";

function OpenedPlayer() {
  const currentPlaybackState = usePlayerStore((s) => s.currentPlaybackState);

  const track = useTrack(currentPlaybackState?.item?.id);

  if (!track) return null;

  return (
    <div className="flex flex-col justify-start items-center h-full w-full p-4 gap-12">
      <DrawerClose className="self-end">
        <ChevronDownIcon className="h-6 w-6" role="button" />
      </DrawerClose>

      <div className="flex flex-col justify-between items-center gap-12">
        <div className="drop-shadow-md">
          <Cover
            alt={`${track.name} cover`}
            size="large"
            src={track.album.images[0].url}
          />
        </div>

        <div className="flex flex-col gap-4 w-full">
          <div className="flex justify-between items-center w-full">
            <div>
              <DrawerClose asChild>
                <TrackLink track={track} />
              </DrawerClose>

              <DrawerClose asChild>
                <ArtistLink artists={track.artists} />
              </DrawerClose>
            </div>

            {/* <LikeButton track={track} /> */}
          </div>

          <div className="flex flex-col">
            <Timer />
          </div>

          <Controls />
        </div>
      </div>

      <div></div>
    </div>
  );
}

export default OpenedPlayer;
