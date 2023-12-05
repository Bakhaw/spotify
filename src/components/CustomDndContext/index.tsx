import { useCallback } from "react";
import {
  DndContext,
  DragEndEvent,
  DragStartEvent,
  useSensor,
  useSensors,
  PointerSensor,
} from "@dnd-kit/core";

import useSpotify from "@/hooks/useSpotify";

interface CustomDndContextProps {
  children: React.ReactNode;
}

const CustomDndContext: React.FC<CustomDndContextProps> = ({ children }) => {
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  );

  const spotifyApi = useSpotify();

  const addTracksToPlaylist = useCallback(
    (overId: string, activeId: string) =>
      spotifyApi.addTracksToPlaylist(overId, [
        `spotify:track:${getActiveIdFromDraggable(activeId)}`,
      ]),
    [spotifyApi]
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

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;

    if (!over) return;

    const activeId = active.data.current?.id; // id from <Draggable />
    const overId = over.data.current?.id; // id from <Droppable />

    addTracksToPlaylist(overId, activeId);
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
