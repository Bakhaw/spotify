"use client";

import { useCallback, useState } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import {
  Active,
  defaultDropAnimation,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
  DropAnimation,
  useDndMonitor,
} from "@dnd-kit/core";
import { snapCenterToCursor } from "@dnd-kit/modifiers";

import useSpotify from "@/hooks/useSpotify";
import useTrack from "@/hooks/useTrack";

import Cover from "@/components/Cover";

import { ToastAction } from "@/components/ui/toast";
import { useToast } from "@/components/ui/use-toast";

function DragOverlayWrapper() {
  const spotifyApi = useSpotify();
  const { toast } = useToast();

  const [draggedItem, setDraggedItem] = useState<Active | null>(null);

  function getIdFromDraggable(id: string) {
    if (!id) return;

    // id from <Draggable /> looks like this --> closed_player:<track_id>
    return id.split(":")[1];
  }

  const track = useTrack(getIdFromDraggable(draggedItem?.data?.current?.id));

  const addTracksToPlaylist = useCallback(
    (overId: string, id: string) =>
      spotifyApi.addTracksToPlaylist(overId, [
        `spotify:track:${getIdFromDraggable(id)}`,
      ]),
    [spotifyApi]
  );

  function handleDragStart(event: DragStartEvent) {
    setDraggedItem(event?.active);
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
          <Link href={`/playlist/${overId}`} className="text-xs">
            See changes
          </Link>
        </ToastAction>
      ),
      title: "Added to your playlist !",
      duration: 2200,
    });
  }

  useDndMonitor({
    onDragStart: (event) => {
      handleDragStart(event);
    },
    onDragCancel: (event) => {},
    onDragEnd: (event) => {
      handleDragEnd(event);
    },
  });

  const dropAnimation: DropAnimation = {
    ...defaultDropAnimation,
  };

  if (!draggedItem || !track) return null;

  return createPortal(
    <DragOverlay dropAnimation={dropAnimation} modifiers={[snapCenterToCursor]}>
      <div className="flex gap-2 items-center text-sm rounded-md ring-2 ring-green-primary bg-black/80 p-2 w-max cursor-grabbing">
        <Cover
          alt="cover"
          additionalCss="h-[36px] w-[36px]"
          src={track.album.images[0].url}
        />

        <div className="space-x-1">
          <span>{track.artists[0].name}</span>
          <span>-</span>
          <span>{track.name}</span>
        </div>
      </div>
    </DragOverlay>,
    document.body
  );
}

export default DragOverlayWrapper;
