import Link from "next/link";
import { ListMusicIcon } from "lucide-react";

import usePlaylists from "@/hooks/usePlaylists";

import { Button } from "@/components/ui/button";
import Droppable from "../Droppable";

function Playlists() {
  const playlists = usePlaylists();

  return playlists?.items.map((playlist) => (
    <Droppable key={playlist.id} id={playlist.id}>
      <Link className="block" href={`/playlist/${playlist.id}`}>
        <Button
          // variant={pathname === route.href ? "secondary" : "ghost"}
          size="lg"
          className="w-full justify-start px-6"
        >
          <div className="mr-2">
            <ListMusicIcon className="h-6 w-6" />
          </div>
          <span>{playlist.name}</span>
        </Button>
      </Link>
    </Droppable>
  ));
}

export default Playlists;
