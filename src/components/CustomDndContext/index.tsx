import { useCallback, useState } from "react";
import { DndContext, DragEndEvent, DragStartEvent } from "@dnd-kit/core";

import useSpotify from "@/hooks/useSpotify";

interface CustomDndContextProps {
  children: React.ReactNode;
}

const CustomDndContext: React.FC<CustomDndContextProps> = ({ children }) => {
  const spotifyApi = useSpotify();
  const [isDropped, setIsDropped] = useState(false);

  const addTracksToPlaylist = useCallback(
    (overId: string, activeId: string) =>
      spotifyApi.addTracksToPlaylist(overId, [`spotify:track:${activeId}`]),
    [spotifyApi]
  );

  function handleDragStart(event: DragStartEvent) {
    const activeId = event.active.data.current?.id; // id from <Draggable />
    console.log("activeId", activeId);
  }

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;

    if (!over) return;

    const activeId = active.data.current?.id; // id from <Draggable />
    const overId = over.data.current?.id; // id from <Droppable />

    console.log({ activeId, overId });

    addTracksToPlaylist(overId, activeId);
  }

  return (
    <DndContext onDragEnd={handleDragEnd} onDragStart={handleDragStart}>
      {children}
    </DndContext>
  );
};

export default CustomDndContext;
