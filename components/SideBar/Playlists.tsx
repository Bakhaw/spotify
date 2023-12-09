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
            className="flex w-full h-full justify-start gap-0 p-0  sm:p-0 bg-transparen"
            size="sm"
          >
            <Link
              className="flex justify-center p-1 items-center gap-4 h-full w-full md:justify-start hover:bg-[#666770] hover:text-white"
              href={`/playlist/${playlist.id}`}
            >
              <Cover
                alt={`${playlist.name} cover`}
                additionalCss="h-[40px] w-[40px]"
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
