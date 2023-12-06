import { useCallback } from "react";
import Link from "next/link";
import {
  DndContext,
  DragEndEvent,
  DragStartEvent,
  useSensor,
  useSensors,
  PointerSensor,
} from "@dnd-kit/core";

import useSpotify from "@/hooks/useSpotify";

import { ToastAction } from "@/components/ui/toast";
import { useToast } from "@/components/ui/use-toast";

interface CustomDndContextProps {
  children: React.ReactNode;
}

const CustomDndContext: React.FC<CustomDndContextProps> = ({ children }) => {
  const spotifyApi = useSpotify();
  const { toast } = useToast();
  const addTracksToPlaylist = useCallback(
    (overId: string, activeId: string) =>
      spotifyApi.addTracksToPlaylist(overId, [
        `spotify:track:${getActiveIdFromDraggable(activeId)}`,
      ]),
    [spotifyApi]
  );

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  );

  function getActiveIdFromDraggable(activeId: string) {
    // activeId from <Draggable /> looks like this --> closed_player:<track_id>
    const id = activeId.split(":")[1];
    return id;
  }

  function handleDragStart(event: DragStartEvent) {
    const activeId = event.active.data.current?.id; // id from <Draggable />
    console.log("handleDragStart", event);
  }

  async function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;

    if (!over) return;

    const activeId = active.data.current?.id; // id from <Draggable />
    const overId = over.data.current?.id; // id from <Droppable />

    await addTracksToPlaylist(overId, activeId);
    toast({
      action: (
        <ToastAction altText="See changes">
          <Link href={`/playlist/${overId}`}>See changes</Link>
        </ToastAction>
      ),
      title: "Added to your playlist !",
      duration: 2200,
    });
  }

  return (
    <DndContext
      onDragEnd={handleDragEnd}
      onDragStart={handleDragStart}
      sensors={sensors}
    >
      {children}
    </DndContext>
  );
};

export default CustomDndContext;
