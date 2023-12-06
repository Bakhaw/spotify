import Link from "next/link";
import { ListMusicIcon } from "lucide-react";

import usePlaylists from "@/hooks/usePlaylists";

import Cover from "@/components/Cover";
import Droppable from "@/components/Droppable";
import { Button } from "@/components/ui/button";

import PlaylistsSkeleton from "./PlaylistsSkeleton";

function Playlists() {
  const playlists = usePlaylists();

  if (!playlists) return <PlaylistsSkeleton />;

  return (
    <ul className="flex flex-col gap-3">
      {playlists.items.map((playlist) => (
        <Droppable key={playlist.id} id={playlist.id}>
          <Link className="flex" href={`/playlist/${playlist.id}`}>
            <Button
              // variant={pathname === route.href ? "secondary" : "ghost"}
              size="lg"
              className="flex justify-start gap-2 h-full w-full ml-2 p-0 bg-transparent hover:bg-[#666770]"
            >
              <Cover
                alt={`${playlist.name} cover`}
                size="xs"
                src={playlist.images?.[0]?.url}
              />
              <span>{playlist.name}</span>
            </Button>
          </Link>
        </Droppable>
      ))}
    </ul>
  );
}

export default Playlists;
