import Link from "next/link";

import { Track } from "@/types";

import AlbumLink from "@/components/AlbumLink";
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

interface ContextMenuProps {
  children: React.ReactNode;
  playlists: SpotifyApi.ListOfUsersPlaylistsResponse | undefined;
  track: Track | null;
}

// TODO skeleton
const ContextMenu: React.FC<ContextMenuProps> = ({
  children,
  playlists,
  track,
}) => {
  if (!track) return null;
  return (
    <ContextMenuWrapper>
      <ContextMenuTrigger className="flex w-full items-center justify-center rounded-md text-sm data-[state=open]:bg-[#66677070]">
        {children}
      </ContextMenuTrigger>
      <ContextMenuContent className="w-64">
        <ContextMenuSub>
          <ContextMenuSubTrigger inset>Add to a playlist</ContextMenuSubTrigger>
          <ContextMenuSubContent className="w-48">
            {playlists?.items.map((playlist) => (
              <ContextMenuItem key={playlist.id} className="px-4">
                {playlist.name}
              </ContextMenuItem>
            ))}
          </ContextMenuSubContent>
        </ContextMenuSub>

        <ContextMenuItem inset>
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
                <ContextMenuItem className="px-4 cursor-pointer">
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
                  <ContextMenuItem className="cursor-pointer px-4">
                    {artist.name}
                  </ContextMenuItem>
                </Link>
              ))}
            </ContextMenuSubContent>
          </ContextMenuSub>
        )}
      </ContextMenuContent>
    </ContextMenuWrapper>
  );
};

export default ContextMenu;
