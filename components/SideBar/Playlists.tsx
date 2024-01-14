import Link from "next/link";
import { useQuery } from "@tanstack/react-query";

import { useLayoutStore } from "@/store/useLayoutStore";

import useSpotify from "@/hooks/useSpotify";

import Cover from "@/components/Cover";
import Droppable from "@/components/Droppable";

import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import PlaylistsSkeleton from "./PlaylistsSkeleton";

function Playlists() {
  const spotifyApi = useSpotify();
  const isSideBarCollapsed = useLayoutStore((s) => s.isSideBarCollapsed);

  const getUserPlaylists = async () =>
    (await spotifyApi.getUserPlaylists()).body;

  const {
    error,
    isPending,
    data: playlists,
  } = useQuery({
    queryKey: ["getUserPlaylists"],
    queryFn: getUserPlaylists,
  });

  if (error) return "Error....";

  if (isPending) return <PlaylistsSkeleton />;

  return (
    <div className="flex flex-col gap-2">
      {playlists.items.map((playlist) => (
        <Droppable key={playlist.id} id={playlist.id} name={playlist.name}>
          {isSideBarCollapsed ? (
            <TooltipProvider delayDuration={150} skipDelayDuration={75}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    className="w-full h-full p-0 bg-transparent"
                    size="sm"
                  >
                    <Link
                      className="flex justify-start p-1 items-center gap-4 h-full w-full hover:bg-[#666770] hover:text-white"
                      href={`/playlist/${playlist.id}`}
                    >
                      <Cover
                        alt={`${playlist.name} cover`}
                        size="full"
                        src={playlist.images?.[0]?.url}
                      />
                    </Link>
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="right">
                  <div>{playlist.name}</div>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          ) : (
            <Button
              className="flex w-full h-full justify-start gap-0 p-0 sm:p-0 bg-transparent"
              size="sm"
            >
              <Link
                className="flex justify-start p-1 items-center gap-4 h-full w-full hover:bg-[#666770] hover:text-white"
                href={`/playlist/${playlist.id}`}
              >
                <Cover
                  alt={`${playlist.name} cover`}
                  additionalCss="h-[40px] w-[40px]"
                  src={playlist.images?.[0]?.url}
                />
                <span>{playlist.name}</span>
              </Link>
            </Button>
          )}
        </Droppable>
      ))}
    </div>
  );
}

export default Playlists;
