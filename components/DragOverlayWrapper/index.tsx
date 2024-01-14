"use client";

import { useState } from "react";
import { createPortal } from "react-dom";
import {
  Active,
  defaultDropAnimation,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
  DropAnimation,
  Over,
  useDndMonitor,
} from "@dnd-kit/core";
import { snapCenterToCursor } from "@dnd-kit/modifiers";

import useSpotify from "@/hooks/useSpotify";
import useTrack from "@/hooks/useTrack";

import Cover from "@/components/Cover";
import Dialog from "@/components/Dialog";
import addToPlaylistToast from "@/components/shared/toasts/addToPlaylist";

import { useToast } from "@/components/ui/use-toast";

function DragOverlayWrapper() {
  const spotifyApi = useSpotify();
  const { toast } = useToast();

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [draggedItem, setDraggedItem] = useState<Active | null>(null);
  const [overItem, setOverItem] = useState<Over | null>(null);

  function getIdFromDraggable(draggableId: string) {
    // draggableId from <Draggable /> looks like this --> "closed_player:<track_id>"
    return draggableId?.split(":")[1];
  }

  const track = useTrack(getIdFromDraggable(draggedItem?.data?.current?.id));

  function handleDragStart(event: DragStartEvent) {
    setDraggedItem(event?.active);
  }

  async function addTracksToPlaylist(playlistId: string, trackId: string) {
    spotifyApi.getAccessToken();
    await spotifyApi.addTracksToPlaylist(playlistId, [
      `spotify:track:${trackId}`,
    ]);
  }

  async function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;

    if (!over) return;

    setOverItem(over);

    const trackId = getIdFromDraggable(active.data.current?.id); // id from <Draggable />
    const playlistId = over.data.current?.id; // id from <Droppable />

    if (!trackId || !playlistId) return;

    spotifyApi.getPlaylistTracks(playlistId).then(({ body }) => {
      const tracksIds = body.items.map((item) => item.track?.id);

      // means the song is already in the playlist
      if (tracksIds.includes(trackId)) {
        setIsDialogOpen(true);
      } else {
        addTracksToPlaylist(playlistId, trackId);

        toast(addToPlaylistToast(playlistId));
      }
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

  function onDialogSubmit() {
    if (!track || !overItem?.data.current) return;

    const playlistId = overItem.data.current.id;
    addTracksToPlaylist(playlistId, track.id);

    setIsDialogOpen(false);

    toast(addToPlaylistToast(playlistId));
  }

  if (!track) return null;

  return (
    <>
      {createPortal(
        <DragOverlay
          dropAnimation={dropAnimation}
          modifiers={[snapCenterToCursor]}
        >
          <div className="flex gap-2 items-center text-sm rounded-md ring-2 ring-green-primary bg-black/80 p-2 w-max cursor-grabbing">
            <Cover
              alt={`${track.album.name} cover`}
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
      )}

      {overItem && (
        <Dialog
          onSubmit={onDialogSubmit}
          open={isDialogOpen}
          setOpen={setIsDialogOpen}
          description={`Your playlist « ${overItem.data.current?.name} » already contain this track`}
          submitButtonText="Add anyway"
          title="Already added"
        />
      )}
    </>
  );
}

export default DragOverlayWrapper;
