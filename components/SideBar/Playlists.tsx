import Link from "next/link";

import usePlaylists from "@/hooks/usePlaylists";

import Cover from "@/components/Cover";
import Droppable from "@/components/Droppable";
import { Button } from "@/components/ui/button";

import PlaylistsSkeleton from "./PlaylistsSkeleton";

function Playlists() {
  const playlists = usePlaylists();

  if (!playlists) return <PlaylistsSkeleton />;

  return (
    <div className="flex flex-col gap-3">
      {playlists.items.map((playlist) => (
        <Droppable key={playlist.id} id={playlist.id}>
          <Button
            className="flex justify-center gap-0 h-full p-0 bg-transparent hover:bg-[#666770] hover:text-white"
            size="sm"
          >
            <Link
              className="flex justify-center items-center gap-4 h-full w-full md:justify-start md:w-[36px]"
              href={`/playlist/${playlist.id}`}
            >
              <Cover
                alt={`${playlist.name} cover`}
                size="full"
                src={playlist.images?.[0]?.url}
              />
              <span className="hidden md:block">{playlist.name}</span>
            </Link>
          </Button>
        </Droppable>
      ))}
    </div>
  );
}

export default Playlists;
