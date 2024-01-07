import { usePlayerStore } from "@/store/usePlayerStore";

import useTrack from "@/hooks/useTrack";

import ArtistLink from "@/components/ArtistLink";
import Cover from "@/components/Cover";
import LikeButton from "@/components/LikeButton";
import TrackLink from "@/components/TrackLink";

import { DrawerClose } from "@/components/ui/drawer";

import Controls from "./Controls";
import Timer from "./Timer";

function OpenedPlayer() {
  const currentPlaybackState = usePlayerStore((s) => s.currentPlaybackState);

  const track = useTrack(currentPlaybackState?.item?.id);

  if (!track) return null;

  return (
    <div className="flex flex-col justify-center items-center h-full w-full p-4">
      <div className="flex flex-col justify-between items-center gap-2 w-full">
        <div className="drop-shadow-md">
          <Cover
            alt={`${track.name} cover`}
            additionalCss="h-auto w-screen"
            src={track.album.images[0].url}
          />
        </div>

        <div className="flex flex-col gap-4 w-full">
          <div className="flex justify-between items-center w-full">
            <div>
              <DrawerClose asChild>
                <TrackLink className="text-3xl" track={track} />
              </DrawerClose>

              <DrawerClose asChild>
                <ArtistLink className="text-2xl" artists={track.artists} />
              </DrawerClose>
            </div>

            <LikeButton track={track} />
          </div>

          <Timer className="w-full text-xl" />

          <Controls />
        </div>
      </div>
    </div>
  );
}

export default OpenedPlayer;
