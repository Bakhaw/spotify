import { DotsHorizontalIcon } from "@radix-ui/react-icons";

import LikeButton from "@/components/LikeButton";

import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";

import TrackActionsDrawerContent from "./TrackActionsDrawerContent";
import { useTrackContext } from "./context";

const TrackActions = () => {
  const { track } = useTrackContext();

  return (
    <>
      <div className="sm:hidden">
        <Drawer>
          <DrawerTrigger asChild>
            <DotsHorizontalIcon className="h-5 w-5" />
          </DrawerTrigger>

          <DrawerContent className="bg-transparent/60 h-screen">
            <TrackActionsDrawerContent />
          </DrawerContent>
        </Drawer>
      </div>

      <div className="hidden">
        <LikeButton trackId={track.id} />
      </div>
    </>
  );
};

export default TrackActions;
