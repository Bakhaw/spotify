"use client";

import { Dispatch, SetStateAction, useState } from "react";
import Link from "next/link";

import { Track } from "@/types";

import useSpotify from "@/hooks/useSpotify";

import AlbumLink from "@/components/AlbumLink";
import Dialog from "@/components/Dialog";
import addToPlaylistToast from "@/components/shared/toasts/addToPlaylist";

import {
  ContextMenu as ContextMenuWrapper,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";

import { useToast } from "@/components/ui/use-toast";

interface ContextMenuProps {
  children: React.ReactNode;
  playlists: SpotifyApi.ListOfUsersPlaylistsResponse | undefined;
  track: Track | null;
}

type DialogOptions = {
  onSubmit: () => void;
  setOpen: Dispatch<SetStateAction<boolean>>;
  description: string;
  submitButtonText: string;
  title: string;
};

// TODO skeleton
const ContextMenu: React.FC<ContextMenuProps> = ({
  children,
  playlists,
  track,
}) => {
  const spotifyApi = useSpotify();
  const { toast } = useToast();

  const [open, setOpen] = useState(false);
  const [dialogOptions, setDialogOptions] = useState<DialogOptions | null>(
    null
  );

  async function handlePlaylistItemClick(
    playlist: SpotifyApi.PlaylistObjectSimplified
  ) {
    if (!track) return;

    spotifyApi.getPlaylistTracks(playlist.id).then(({ body }) => {
      const tracksIds = body.items.map((item) => item.track?.id);

      // means the song is already in the playlist
      if (tracksIds.includes(track.id)) {
        setOpen(true);

        setDialogOptions({
          onSubmit: () => onDialogSubmit(playlist.id, track.id),
          setOpen: setOpen,
          description: `Your playlist « ${playlist.name} » already contain this track`,
          submitButtonText: "Add anyway",
          title: "Already added",
        });
      } else {
        onDialogSubmit(playlist.id, track.id);
      }
    });
  }

  async function addTracksToPlaylist(playlistId: string, trackId: string) {
    spotifyApi.getAccessToken();
    await spotifyApi.addTracksToPlaylist(playlistId, [
      `spotify:track:${trackId}`,
    ]);
  }

  function onDialogSubmit(playlistId: string, trackId: string) {
    addTracksToPlaylist(playlistId, trackId);

    setOpen(false);

    toast(addToPlaylistToast(playlistId));
  }

  if (!track) return null;

  return (
    <>
      <ContextMenuWrapper>
        <ContextMenuTrigger className="flex w-full items-center justify-center rounded-md text-sm data-[state=open]:bg-[#66677070]">
          {children}
        </ContextMenuTrigger>
        <ContextMenuContent
          className="w-64"
          onKeyDown={(e) => {
            e.preventDefault();

            if (e.code === "KeyS") {
              console.log("Add to saved tracks");
            }
          }}
        >
          <ContextMenuSub>
            <ContextMenuSubTrigger inset>
              Add to a playlist
            </ContextMenuSubTrigger>
            <ContextMenuSubContent className="w-48">
              {playlists?.items.map((playlist) => (
                <ContextMenuItem
                  key={playlist.id}
                  className="px-4"
                  onClick={() => handlePlaylistItemClick(playlist)}
                >
                  {playlist.name}
                </ContextMenuItem>
              ))}
            </ContextMenuSubContent>
          </ContextMenuSub>

          <ContextMenuItem inset disabled>
            Add to saved tracks
            <ContextMenuShortcut>⌘S</ContextMenuShortcut>
          </ContextMenuItem>

          <ContextMenuSeparator />

          {"album" in track && (
            <ContextMenuSub>
              <ContextMenuSubTrigger inset>Go to Album</ContextMenuSubTrigger>
              <ContextMenuSubContent className="w-48">
                <AlbumLink
                  albumId={track.album.id}
                  className="hover:no-underline"
                >
                  <ContextMenuItem className="px-4">
                    {track.album.name}
                  </ContextMenuItem>
                </AlbumLink>
              </ContextMenuSubContent>
            </ContextMenuSub>
          )}

          {"artists" in track && (
            <ContextMenuSub>
              <ContextMenuSubTrigger inset>Go to Artist</ContextMenuSubTrigger>
              <ContextMenuSubContent className="w-48">
                {track.artists.map((artist, index) => (
                  <Link
                    key={`${artist.id}_${index}`}
                    href={`/artist/${artist.id}`}
                    className="block"
                  >
                    <ContextMenuItem className="px-4">
                      {artist.name}
                    </ContextMenuItem>
                  </Link>
                ))}
              </ContextMenuSubContent>
            </ContextMenuSub>
          )}
        </ContextMenuContent>
      </ContextMenuWrapper>

      {dialogOptions && <Dialog open={open} {...dialogOptions} />}
    </>
  );
};

export default ContextMenu;
